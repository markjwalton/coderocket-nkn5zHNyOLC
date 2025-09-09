import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ChevronLeft, ChevronRight, Clock, MessageCircle } from "lucide-react"; 
import { addWeeks, subWeeks, startOfWeek, endOfWeek, format, eachDayOfInterval, getDay } from "date-fns"; 
import ProvisionalRequestForm from "./ProvisionalRequestForm";
import { Appointment, AppointmentType, AvailabilitySlot, buildAppointmentTypeQuery, buildAvailabilityQuery } from "../utils/api";

export default function BookingWidget({
  onBookingComplete,
  onError,
  className = ""
}) {
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [selectedType, setSelectedType] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
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

  // Load availability when week or type changes
  useEffect(() => {
    if (selectedType) {
      loadAvailability();
    }
  }, [currentWeek, selectedType]);

  const loadAppointmentTypes = async () => {
    try {
      setLoadingData(true);
      setApiError('');
      
      console.log('Loading appointment types from Base44...');
      
      // Query for active appointment types only
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
    if (!selectedType) return;
    
    try {
      setLoading(true);
      setApiError('');
      
      console.log('Loading availability for:', selectedType.name);
      
      // Build query for current week's availability
      const query = buildAvailabilityQuery({
        is_active: true,
        appointment_types: selectedType.id // or selectedType.name, depending on your data structure
      });
      
      const data = await AvailabilitySlot.list(query);
      console.log('Availability loaded:', data);
      
      // Filter for current week and convert to our expected format
      const weekAvailability = processAvailabilityData(data);
      setAvailabilitySlots(weekAvailability);
      
    } catch (error) {
      console.error('Error loading availability:', error);
      setApiError(`Failed to load availability: ${error.message}`);
      setAvailabilitySlots([]);
    } finally {
      setLoading(false);
    }
  };

  // Process Base44 availability data into our expected format
  const processAvailabilityData = (slots) => {
    const weekDays = eachDayOfInterval({
      start: currentWeek,
      end: endOfWeek(currentWeek, { weekStartsOn: 1 })
    });

    return slots
      .filter(slot => {
        // Filter slots for current week
        const slotDayOfWeek = slot.day_of_week; // 0 = Sunday, 1 = Monday, etc.
        return weekDays.some(day => getDay(day) === slotDayOfWeek);
      })
      .map(slot => {
        // Find the actual date for this day of week in current week
        const targetDate = weekDays.find(day => getDay(day) === slot.day_of_week);
        
        return {
          id: slot.id,
          date: format(targetDate, 'yyyy-MM-dd'),
          time: slot.start_time,
          end_time: slot.end_time,
          specialist_email: slot.specialist_email,
          is_available: slot.is_active,
          original_slot: slot
        };
      })
      .filter(slot => slot.is_available);
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
          time_slots: slots.map(slot => slot.time).sort(),
          slots: slots // Keep original slot data for booking
        };
      })
      .filter(day => day.time_slots.length > 0);
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

  // Create provisional booking
  const createProvisionalBooking = async (bookingData) => {
    try {
      setLoading(true);
      
      // Find the selected availability slot
      const selectedSlot = availabilitySlots.find(
        slot => slot.date === selectedDate && slot.time === selectedTime
      );
      
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
        appointment_type: selectedType?.id || selectedType?.name,
        appointment_date: selectedDate,
        appointment_time: selectedTime,
        duration_minutes: selectedType?.duration_minutes || 30,
        
        // Status and verification
        status: 'provisional',
        is_verified: false,
        verification_code: selectedType?.requires_verification ? generateVerificationCode() : '',
        
        // Specialist assignment
        assigned_specialist: selectedSlot?.specialist_email || '',
        
        // Notes
        notes: '', // Internal notes - can be filled by staff
        customer_notes: bookingData.notes || '',
        
        // Additional data
        additional_requested_dates: additionalDates,
        
        // Integration fields (optional)
        google_event_id: '', // Will be populated when calendar event is created
        cancellation_reason: '' // Empty for new bookings
      };
      
      console.log('Creating provisional booking with correct field mapping:', appointmentData);
      
      const result = await Appointment.create(appointmentData);
      console.log('Booking created:', result);
      
      // Optionally update the availability slot to mark it as booked
      if (selectedSlot && !bookingData.is_custom_request) {
        try {
          await AvailabilitySlot.update(selectedSlot.id, { is_active: false });
          console.log('Availability slot marked as booked');
        } catch (updateError) {
          console.warn('Could not update availability slot:', updateError);
        }
      }
      
      onBookingComplete?.(result);
      setStep(3); // Show confirmation
      
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
      <Card className={`max-w-4xl mx-auto ${className}`}>
        <CardContent className="p-6">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading appointment types...</p>
            <p className="text-xs text-gray-400 mt-2">Connecting to Base44...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Step 1: Select Appointment Type
  if (step === 1) {
    return (
      <Card className={`max-w-4xl mx-auto ${className}`}>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Select Appointment Type</CardTitle>
        </CardHeader>
        <CardContent>
          {apiError && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-4">
              <p className="text-sm">{apiError}</p>
              <Button 
                onClick={loadAppointmentTypes}
                variant="outline"
                size="sm"
                className="mt-2"
              >
                Retry
              </Button>
            </div>
          )}
          
          {appointmentTypes.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No appointment types available.</p>
              <Button 
                onClick={loadAppointmentTypes}
                className="mt-4"
              >
                Refresh
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {appointmentTypes.map((type) => (
                <Card
                  key={type.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  style={type.colour ? { borderLeftColor: type.colour, borderLeftWidth: '4px' } : {}}
                  onClick={() => {
                    setSelectedType(type);
                    setStep(2);
                  }}
                >
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg">{type.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {type.duration_minutes} minutes
                      {type.price && ` • $${type.price}`}
                    </p>
                    {type.description && (
                      <p className="text-xs text-gray-500 mt-2">{type.description}</p>
                    )}
                    {type.requires_verification && (
                      <p className="text-xs text-orange-600 mt-1 font-medium">
                        ⚠️ Requires verification
                      </p>
                    )}
                    {type.advance_booking_days && (
                      <p className="text-xs text-blue-600 mt-1">
                        📅 Book {type.advance_booking_days} days in advance
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Step 2: Select Date and Time
  if (step === 2) {
    const weekDaysWithAvailability = getWeekDaysWithAvailability();

    return (
      <Card className={`max-w-6xl mx-auto ${className}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-6 w-6" />
                Appointment Calendar
              </CardTitle>
              <p className="text-gray-600 mt-1">{getWeekRange()}</p>
              <div className="flex items-center gap-4 mt-1">
                <p className="text-sm text-gray-500">Selected: {selectedType?.name}</p>
                {selectedType?.colour && (
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: selectedType.colour }}
                  />
                )}
              </div>
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
            </div>
          )}

          {/* Show advance booking notice */}
          {selectedType?.advance_booking_days && (
            <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded mb-4">
              <p className="text-sm">
                📅 This appointment type requires booking {selectedType.advance_booking_days} days in advance
              </p>
            </div>
          )}

          {/* Show verification notice */}
          {selectedType?.requires_verification && (
            <div className="bg-orange-50 border border-orange-200 text-orange-800 px-4 py-3 rounded mb-4">
              <p className="text-sm">
                ⚠️ This appointment requires verification before confirmation. You will receive a verification code.
              </p>
            </div>
          )}

          {/* Loading availability */}
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-gray-600">Loading availability...</p>
            </div>
          )}

          {/* Available Days */}
          {!loading && weekDaysWithAvailability.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No appointments available this week</p>
              <Button onClick={() => setShowCustomRequest(true)}>
                Request Custom Time
              </Button>
            </div>
          ) : !loading && (
            <>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8">
                {weekDaysWithAvailability.map((day) => (
                  <Card key={day.date} className="border border-gray-200">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-1">{day.day_name}</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {format(new Date(day.date), 'dd/MM/yyyy')}
                      </p>
                      
                      <div className="space-y-2">
                        {day.time_slots.map((time) => (
                          <Button
                            key={time}
                            variant={selectedDate === day.date && selectedTime === time ? "default" : "outline"}
                            size="sm"
                            className="w-full"
                            onClick={() => {
                              setSelectedDate(day.date);
                              setSelectedTime(time);
                            }}
                          >
                            <Clock className="h-3 w-3 mr-1" />
                            {time}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Custom Request Section */}
              <div className="border-t pt-6">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4 text-center">
                    <MessageCircle className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <p className="text-blue-800 mb-3">Cannot find a convenient appointment?</p>
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

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setStep(1)}
            >
              ← Back to Services
            </Button>
            {selectedDate && selectedTime && (
              <Button
                className="flex-1"
                onClick={() => createProvisionalBooking({
                  primary_date: selectedDate,
                  primary_time: selectedTime
                })}
                disabled={loading}
              >
                {loading ? 'Booking...' : 'Book Appointment'}
              </Button>
            )}
          </div>

          {/* Custom Request Modal */}
          {showCustomRequest && (
            <ProvisionalRequestForm
              appointmentType={selectedType}
              onSubmit={createProvisionalBooking}
              onCancel={() => setShowCustomRequest(false)}
              loading={loading}
            />
          )}
        </CardContent>
      </Card>
    );
  }

  // Step 3: Confirmation
  if (step === 3) {
    return (
      <Card className={`max-w-md mx-auto ${className}`}>
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-green-600">✓</span>
          </div>
          <CardTitle className="text-xl mb-2 text-green-600">
            {selectedType?.requires_verification ? 'Verification Required!' : 'Request Submitted!'}
          </CardTitle>
          <p className="text-gray-600 mb-6">
            {selectedType?.requires_verification 
              ? 'Your appointment request will be reviewed and you will receive a verification code before confirmation'
              : 'One of the team will be in touch to confirm the request'
            }
          </p>
          <Card className="bg-gray-50 mb-6">
            <CardContent className="p-4 text-left">
              <p className="text-sm"><strong>Service:</strong> {selectedType?.name}</p>
              <p className="text-sm"><strong>Duration:</strong> {selectedType?.duration_minutes} minutes</p>
              {selectedType?.price && (
                <p className="text-sm"><strong>Price:</strong> ${selectedType.price}</p>
              )}
              <p className="text-sm"><strong>Requested Date:</strong> {format(new Date(selectedDate), 'dd/MM/yyyy')}</p>
              <p className="text-sm"><strong>Requested Time:</strong> {selectedTime}</p>
              <p className="text-sm"><strong>Status:</strong> {selectedType?.requires_verification ? 'Pending Verification' : 'Provisional'}</p>
            </CardContent>
          </Card>
          <Button
            className="w-full"
            onClick={() => {
              setStep(1);
              setSelectedType(null);
              setSelectedDate('');
              setSelectedTime('');
              // Reload availability to reflect any changes
              if (selectedType) {
                loadAvailability();
              }
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