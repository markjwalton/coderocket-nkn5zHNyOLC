import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ChevronLeft, ChevronRight, Clock, MessageCircle, Mail } from "lucide-react"; 
import { addWeeks, subWeeks, startOfWeek, endOfWeek, format, eachDayOfInterval, getDay, addDays, differenceInDays } from "date-fns"; 
import ProvisionalRequestForm from "./ProvisionalRequestForm";
import { Appointment, AppointmentType, AvailabilitySlot, buildAppointmentTypeQuery } from "../utils/api";

export default function BookingWidget({
  onBookingComplete,
  onError,
  className = ""
}) {
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showCustomRequest, setShowCustomRequest] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  
  // Data from Base44 API
  const [appointmentTypes, setAppointmentTypes] = useState([]);
  const [availabilitySlots, setAvailabilitySlots] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [apiError, setApiError] = useState('');

  // Load appointment types on mount
  useEffect(() => {
    loadAppointmentTypes();
  }, []);

  // Load availability when week changes
  useEffect(() => {
    loadAvailability();
  }, [currentWeek]);

  const loadAppointmentTypes = async () => {
    try {
      setLoadingData(true);
      setApiError('');
      
      console.log('Loading appointment types from Base44...');
      
      const query = buildAppointmentTypeQuery({ is_active: true });
      const data = await AppointmentType.list(query);
      
      console.log('Appointment types loaded:', data);
      setAppointmentTypes(data);
      
    } catch (error) {
      console.error('Error loading appointment types:', error);
      setApiError(`Failed to load appointment types: ${error.message}`);
      onError?.(error.message);
    } finally {
      setLoadingData(false);
    }
  };

  const loadAvailability = async () => {
    try {
      setLoading(true);
      setApiError('');
      
      console.log('Loading all availability slots...');
      
      // Load all active availability slots
      let data = [];
      try {
        data = await AvailabilitySlot.list('is_active=true');
        console.log('Availability loaded:', data);
      } catch (error) {
        console.log('API failed, using fallback data:', error.message);
        data = createFallbackAvailability();
      }
      
      // Process and filter the data
      const processedSlots = processAvailabilityData(data);
      setAvailabilitySlots(processedSlots);
      
    } catch (error) {
      console.error('Error loading availability:', error);
      setApiError(`Failed to load availability: ${error.message}`);
      setAvailabilitySlots(createFallbackAvailability());
    } finally {
      setLoading(false);
    }
  };

  // Create fallback availability data for testing
  const createFallbackAvailability = () => {
    const weekDays = eachDayOfInterval({
      start: currentWeek,
      end: endOfWeek(currentWeek, { weekStartsOn: 1 })
    });

    const fallbackSlots = [];
    
    weekDays.forEach((day, index) => {
      if (index < 5) { // Monday to Friday only
        const dateStr = format(day, 'yyyy-MM-dd');
        
        // Create slots with different appointment types
        const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
        
        timeSlots.forEach((time, timeIndex) => {
          const appointmentType = appointmentTypes[timeIndex % appointmentTypes.length];
          
          fallbackSlots.push({
            id: `fallback-${dateStr}-${time}`,
            date: dateStr,
            time: time,
            appointment_type: appointmentType,
            specialist_email: 'specialist@example.com',
            is_available: true,
            fallback: true
          });
        });
      }
    });
    
    return fallbackSlots;
  };

  // Process Base44 availability data
  const processAvailabilityData = (slots) => {
    const weekDays = eachDayOfInterval({
      start: currentWeek,
      end: endOfWeek(currentWeek, { weekStartsOn: 1 })
    });

    const today = new Date();
    
    return slots
      .map(slot => {
        let targetDate;
        
        // Handle day_of_week format
        if (slot.day_of_week !== undefined) {
          targetDate = weekDays.find(day => getDay(day) === slot.day_of_week);
        } else if (slot.date) {
          targetDate = new Date(slot.date);
        } else {
          return null;
        }

        if (!targetDate) return null;

        const dateStr = format(targetDate, 'yyyy-MM-dd');
        
        // Find the appointment type for this slot
        const appointmentType = appointmentTypes.find(type => 
          type.id === slot.appointment_types || 
          type.name === slot.appointment_types
        ) || appointmentTypes[0]; // fallback to first type

        // Check advance booking requirements
        if (appointmentType?.advance_booking_days) {
          const daysFromNow = differenceInDays(targetDate, today);
          if (daysFromNow < appointmentType.advance_booking_days) {
            return null; // Skip this slot - doesn't meet advance booking requirement
          }
        }

        return {
          id: slot.id || `slot-${dateStr}-${slot.start_time}`,
          date: dateStr,
          time: slot.start_time || slot.time,
          appointment_type: appointmentType,
          specialist_email: slot.specialist_email || '',
          is_available: slot.is_active !== false,
          original_slot: slot
        };
      })
      .filter(slot => slot && slot.is_available && slot.appointment_type);
  };

  // Group availability slots by date
  const getAvailabilityByDate = useCallback(() => {
    const grouped = {};
    
    availabilitySlots.forEach(slot => {
      if (!grouped[slot.date]) {
        grouped[slot.date] = [];
      }
      grouped[slot.date].push(slot);
    });
    
    // Sort slots within each date by time
    Object.keys(grouped).forEach(date => {
      grouped[date].sort((a, b) => a.time.localeCompare(b.time));
    });
    
    return grouped;
  }, [availabilitySlots]);

  // Get days with availability for current week
  const getWeekDaysWithAvailability = useCallback(() => {
    const weekDays = eachDayOfInterval({
      start: currentWeek,
      end: endOfWeek(currentWeek, { weekStartsOn: 1 })
    });
    
    const availabilityByDate = getAvailabilityByDate();
    
    return weekDays
      .map(day => {
        const dateStr = format(day, 'yyyy-MM-dd');
        const slots = availabilityByDate[dateStr] || [];
        return {
          date: dateStr,
          day_name: format(day, 'EEEE'),
          slots: slots
        };
      })
      .filter(day => day.slots.length > 0);
  }, [currentWeek, getAvailabilityByDate]);

  // Navigation functions
  const goToPreviousWeek = () => {
    setCurrentWeek(subWeeks(currentWeek, 1));
  };

  const goToNextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1));
  };

  const goToToday = () => {
    setCurrentWeek(startOfWeek(new Date(), { weekStartsOn: 1 }));
  };

  // Get week range display
  const getWeekRange = () => {
    const start = currentWeek;
    const end = endOfWeek(currentWeek, { weekStartsOn: 1 });
    return `${format(start, 'dd/MM/yyyy')} - ${format(end, 'dd/MM/yyyy')}`;
  };

  // Generate verification code
  const generateVerificationCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  // Create booking
  const createBooking = async (bookingData) => {
    try {
      setLoading(true);
      
      const appointmentType = selectedSlot.appointment_type;
      
      // Format additional requested dates for Base44
      const additionalDates = bookingData.alternative_dates?.map(alt => 
        `${alt.date} ${alt.time}`
      ).join(', ') || '';
      
      const appointmentData = {
        // Customer information
        customer_name: bookingData.customer?.name || '',
        customer_email: bookingData.customer?.email || '',
        customer_phone: bookingData.customer?.phone || '',
        customer_address: bookingData.customer?.address || '',
        
        // Appointment details
        appointment_type: appointmentType?.id || appointmentType?.name,
        appointment_date: selectedSlot.date,
        appointment_time: selectedSlot.time,
        duration_minutes: appointmentType?.duration_minutes || 30,
        
        // Status and verification
        status: appointmentType?.requires_verification ? 'pending_verification' : 'provisional',
        is_verified: false,
        verification_code: appointmentType?.requires_verification ? generateVerificationCode() : '',
        
        // Specialist assignment
        assigned_specialist: selectedSlot.specialist_email || '',
        
        // Notes
        notes: '', // Internal notes - can be filled by staff
        customer_notes: bookingData.notes || '',
        
        // Additional data
        additional_requested_dates: additionalDates,
        
        // Integration fields (optional)
        google_event_id: '',
        cancellation_reason: ''
      };
      
      console.log('Creating booking:', appointmentData);
      
      const result = await Appointment.create(appointmentData);
      console.log('Booking created:', result);
      
      // Mark availability slot as booked (only for real slots, not fallback)
      if (!selectedSlot.fallback) {
        try {
          await AvailabilitySlot.update(selectedSlot.id, { is_active: false });
          console.log('Availability slot marked as booked');
        } catch (updateError) {
          console.warn('Could not update availability slot:', updateError);
        }
      }
      
      onBookingComplete?.(result);
      setStep(2); // Show confirmation
      
    } catch (error) {
      console.error('Error creating booking:', error);
      onError?.(`Failed to create booking: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Loading state for initial data
  if (loadingData) {
    return (
      <Card className={`max-w-6xl mx-auto ${className}`}>
        <CardContent className="p-6">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading available appointments...</p>
            <p className="text-xs text-gray-400 mt-2">Connecting to Base44...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Step 1: Select Available Appointment
  if (step === 1) {
    const weekDaysWithAvailability = getWeekDaysWithAvailability();

    return (
      <Card className={`max-w-6xl mx-auto ${className}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-6 w-6" />
                Book Your Appointment
              </CardTitle>
              <p className="text-gray-600 mt-1">{getWeekRange()}</p>
              <p className="text-sm text-gray-500">Select an available appointment slot</p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={goToPreviousWeek}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={goToToday}
              >
                Today
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={goToNextWeek}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {apiError && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded mb-4">
              <p className="text-sm">{apiError}</p>
              <p className="text-xs mt-1">Using demonstration data</p>
            </div>
          )}

          {/* Loading availability */}
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-gray-600">Loading availability...</p>
            </div>
          )}

          {/* Available Appointment Slots */}
          {!loading && weekDaysWithAvailability.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No appointments available this week</p>
              <Button onClick={() => setShowCustomRequest(true)}>
                Request Custom Time
              </Button>
            </div>
          ) : !loading && (
            <>
              <div className="space-y-6">
                {weekDaysWithAvailability.map((day) => (
                  <div key={day.date}>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {day.day_name}, {format(new Date(day.date), 'dd/MM/yyyy')}
                    </h3>
                    
                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                      {day.slots.map((slot) => (
                        <Card
                          key={slot.id}
                          className={`cursor-pointer transition-all hover:shadow-md ${
                            selectedSlot?.id === slot.id 
                              ? 'ring-2 ring-blue-500 bg-blue-50' 
                              : 'hover:bg-gray-50'
                          }`}
                          style={slot.appointment_type?.colour ? { 
                            borderLeftColor: slot.appointment_type.colour, 
                            borderLeftWidth: '4px' 
                          } : {}}
                          onClick={() => setSelectedSlot(slot)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <Clock className="h-4 w-4 text-blue-600" />
                                  <span className="font-semibold text-lg">{slot.time}</span>
                                </div>
                                
                                <h4 className="font-medium text-gray-900 mb-1">
                                  {slot.appointment_type?.name}
                                </h4>
                                
                                <div className="text-sm text-gray-600 space-y-1">
                                  <p>{slot.appointment_type?.duration_minutes} minutes</p>
                                  {slot.appointment_type?.price && (
                                    <p className="font-medium">${slot.appointment_type.price}</p>
                                  )}
                                  {slot.specialist_email && (
                                    <p className="text-xs">with {slot.specialist_email}</p>
                                  )}
                                </div>
                                
                                {slot.appointment_type?.description && (
                                  <p className="text-xs text-gray-500 mt-2">
                                    {slot.appointment_type.description}
                                  </p>
                                )}
                                
                                {slot.appointment_type?.requires_verification && (
                                  <div className="flex items-center gap-1 mt-2 text-xs text-orange-600">
                                    <Mail className="h-3 w-3" />
                                    <span>Email verification required</span>
                                  </div>
                                )}
                              </div>
                              
                              {slot.appointment_type?.colour && (
                                <div 
                                  className="w-3 h-3 rounded-full mt-1"
                                  style={{ backgroundColor: slot.appointment_type.colour }}
                                />
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Custom Request Section */}
              <div className="border-t pt-6 mt-8">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4 text-center">
                    <MessageCircle className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <p className="text-blue-800 mb-3">Cannot find a suitable appointment?</p>
                    <Button 
                      variant="default"
                      onClick={() => setShowCustomRequest(true)}
                    >
                      Request Custom Time
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {/* Book Selected Appointment */}
          {selectedSlot && (
            <div className="border-t pt-6 mt-6">
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Selected Appointment</h4>
                  <div className="text-sm text-green-700 mb-4">
                    <p><strong>{selectedSlot.appointment_type?.name}</strong></p>
                    <p>{format(new Date(selectedSlot.date), 'EEEE, dd/MM/yyyy')} at {selectedSlot.time}</p>
                    <p>{selectedSlot.appointment_type?.duration_minutes} minutes</p>
                    {selectedSlot.appointment_type?.price && (
                      <p>${selectedSlot.appointment_type.price}</p>
                    )}
                  </div>
                  
                  {selectedSlot.appointment_type?.requires_verification && (
                    <div className="bg-orange-50 border border-orange-200 text-orange-800 px-3 py-2 rounded mb-4">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span className="text-sm font-medium">Email Verification Required</span>
                      </div>
                      <p className="text-xs mt-1">
                        You'll receive a verification email. The appointment won't be confirmed until you respond.
                      </p>
                    </div>
                  )}
                  
                  <Button
                    className="w-full"
                    onClick={() => createBooking({ 
                      customer: { name: '', email: '', phone: '' },
                      notes: ''
                    })}
                    disabled={loading}
                  >
                    {loading ? 'Booking...' : 'Book This Appointment'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Custom Request Modal */}
          {showCustomRequest && (
            <ProvisionalRequestForm
              appointmentType={selectedSlot?.appointment_type}
              onSubmit={createBooking}
              onCancel={() => setShowCustomRequest(false)}
              loading={loading}
            />
          )}
        </CardContent>
      </Card>
    );
  }

  // Step 2: Confirmation
  if (step === 2) {
    const requiresVerification = selectedSlot?.appointment_type?.requires_verification;
    
    return (
      <Card className={`max-w-md mx-auto ${className}`}>
        <CardContent className="p-6 text-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
            requiresVerification ? 'bg-orange-100' : 'bg-green-100'
          }`}>
            {requiresVerification ? (
              <Mail className="h-8 w-8 text-orange-600" />
            ) : (
              <span className="text-2xl text-green-600">✓</span>
            )}
          </div>
          
          <CardTitle className={`text-xl mb-2 ${
            requiresVerification ? 'text-orange-600' : 'text-green-600'
          }`}>
            {requiresVerification ? 'Verification Email Sent!' : 'Appointment Booked!'}
          </CardTitle>
          
          <p className="text-gray-600 mb-6">
            {requiresVerification 
              ? 'Check your email and click the verification link to confirm your appointment. It will not appear in the calendar until verified.'
              : 'Your appointment has been successfully booked and added to the calendar.'
            }
          </p>
          
          <Card className="bg-gray-50 mb-6">
            <CardContent className="p-4 text-left">
              <p className="text-sm"><strong>Service:</strong> {selectedSlot?.appointment_type?.name}</p>
              <p className="text-sm"><strong>Date:</strong> {format(new Date(selectedSlot?.date), 'EEEE, dd/MM/yyyy')}</p>
              <p className="text-sm"><strong>Time:</strong> {selectedSlot?.time}</p>
              <p className="text-sm"><strong>Duration:</strong> {selectedSlot?.appointment_type?.duration_minutes} minutes</p>
              {selectedSlot?.appointment_type?.price && (
                <p className="text-sm"><strong>Price:</strong> ${selectedSlot.appointment_type.price}</p>
              )}
              <p className="text-sm"><strong>Status:</strong> {requiresVerification ? 'Pending Email Verification' : 'Confirmed'}</p>
            </CardContent>
          </Card>
          
          <Button
            className="w-full"
            onClick={() => {
              setStep(1);
              setSelectedSlot(null);
              loadAvailability(); // Refresh availability
            }}
          >
            Book Another Appointment
          </Button>
        </CardContent>
      </Card>
    );
  }

  return null;
}