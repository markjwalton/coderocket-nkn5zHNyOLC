import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar, ChevronLeft, ChevronRight, Clock, Users, MessageCircle } from "lucide-react";
import { addDays, format, getDay, startOfWeek, endOfWeek, eachDayOfInterval, addWeeks, subWeeks, isAfter, isBefore, startOfToday } from "date-fns";
import ProvisionalRequestForm from "./ProvisionalRequestForm";

// Static mock data - no API calls
const MOCK_SERVICES = [
  { id: 1, name: 'Consultation', duration_minutes: 30, price: 50 },
  { id: 2, name: 'Treatment', duration_minutes: 60, price: 100 },
  { id: 3, name: 'Follow-up', duration_minutes: 15, price: 25 }
];

const MOCK_TIME_SLOTS = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

export default function BookingWidget() {
  const [currentStep, setCurrentStep] = useState('select-service');
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(startOfToday()));
  const [customerInfo, setCustomerInfo] = useState({
    name: '', email: '', phone: '', address: '', notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showProvisionalForm, setShowProvisionalForm] = useState(false);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setCurrentStep('select-date');
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setCurrentStep('select-time');
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setCurrentStep('customer-info');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock submission with console log only
    console.log('Booking submitted:', {
      customer_name: customerInfo.name,
      customer_email: customerInfo.email,
      customer_phone: customerInfo.phone,
      customer_address: customerInfo.address,
      customer_notes: customerInfo.notes,
      appointment_type: selectedService.name,
      appointment_date: format(selectedDate, 'yyyy-MM-dd'),
      appointment_time: selectedTime,
      duration_minutes: selectedService.duration_minutes,
      status: 'confirmed'
    });
    
    // Simulate delay
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep('confirmation');
    }, 1000);
  };

  const resetBooking = () => {
    setCurrentStep('select-service');
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setCustomerInfo({ name: '', email: '', phone: '', address: '', notes: '' });
    setShowProvisionalForm(false);
  };

  const weekDays = eachDayOfInterval({
    start: currentWeek,
    end: endOfWeek(currentWeek)
  });

  const goToPreviousWeek = () => {
    setCurrentWeek(subWeeks(currentWeek, 1));
  };

  const goToNextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1));
  };

  if (showProvisionalForm) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <ProvisionalRequestForm 
          appointmentType={selectedService || MOCK_SERVICES[0]}
          onClose={() => setShowProvisionalForm(false)}
        />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Book Your Appointment</CardTitle>
        </CardHeader>
        <CardContent>
          {currentStep === 'select-service' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Select a Service</h3>
              {MOCK_SERVICES.map(service => (
                <Button
                  key={service.id}
                  variant="outline"
                  className="w-full p-4 h-auto text-left justify-start"
                  onClick={() => handleServiceSelect(service)}
                >
                  <div>
                    <div className="font-semibold">{service.name}</div>
                    <div className="text-sm text-gray-600">
                      {service.duration_minutes} minutes • ${service.price}
                    </div>
                  </div>
                </Button>
              ))}
              <Button
                variant="outline"
                className="w-full p-4 h-auto text-left justify-start border-blue-200 bg-blue-50"
                onClick={() => setShowProvisionalForm(true)}
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-semibold text-blue-700">Request Consultation</div>
                    <div className="text-sm text-blue-600">
                      Can't find a suitable time? Request a consultation
                    </div>
                  </div>
                </div>
              </Button>
            </div>
          )}

          {currentStep === 'select-date' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Button variant="outline" size="sm" onClick={goToPreviousWeek}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <h3 className="text-lg font-semibold">
                  {format(currentWeek, 'MMMM yyyy')}
                </h3>
                <Button variant="outline" size="sm" onClick={goToNextWeek}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-7 gap-2">
                {weekDays.map(day => (
                  <Button
                    key={day.toISOString()}
                    variant={selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd') ? 'default' : 'outline'}
                    className="h-16 flex flex-col"
                    onClick={() => handleDateSelect(day)}
                    disabled={isBefore(day, startOfToday())}
                  >
                    <div className="text-xs">{format(day, 'EEE')}</div>
                    <div className="text-lg">{format(day, 'd')}</div>
                  </Button>
                ))}
              </div>
              
              <Button variant="outline" onClick={() => setCurrentStep('select-service')}>
                Back to Services
              </Button>
            </div>
          )}

          {currentStep === 'select-time' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">
                Select Time for {format(selectedDate, 'EEEE, MMMM d')}
              </h3>
              
              <div className="grid grid-cols-3 gap-2">
                {MOCK_TIME_SLOTS.map(time => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? 'default' : 'outline'}
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
              
              <Button variant="outline" onClick={() => setCurrentStep('select-date')}>
                Back to Date Selection
              </Button>
            </div>
          )}

          {currentStep === 'customer-info' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Your Information</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={customerInfo.notes}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Any specific requirements or preferences..."
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Booking Summary</h4>
                  <p><strong>Service:</strong> {selectedService.name}</p>
                  <p><strong>Date:</strong> {format(selectedDate, 'EEEE, MMMM d, yyyy')}</p>
                  <p><strong>Time:</strong> {selectedTime}</p>
                  <p><strong>Duration:</strong> {selectedService.duration_minutes} minutes</p>
                  <p><strong>Price:</strong> ${selectedService.price}</p>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep('select-time')}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? 'Booking...' : 'Confirm Booking'}
                  </Button>
                </div>
              </form>
            </div>
          )}
          
          {currentStep === 'confirmation' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-green-600">Booking Confirmed!</h3>
              <p className="text-gray-600 mb-6">
                Your appointment has been successfully booked. You will receive a confirmation email shortly.
              </p>
              <Button onClick={resetBooking}>Book Another Appointment</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}