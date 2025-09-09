import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageCircle } from "lucide-react";

// Static mock data
const MOCK_SERVICES = [
  { id: 1, name: 'Consultation', duration_minutes: 30, price: 50 },
  { id: 2, name: 'Treatment', duration_minutes: 60, price: 100 },
  { id: 3, name: 'Follow-up', duration_minutes: 15, price: 25 }
];

const MOCK_TIME_SLOTS = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

export default function BookingWidget() {
  const [currentStep, setCurrentStep] = useState('select-service');
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    name: '', email: '', phone: '', address: '', notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    
    console.log('Booking submitted:', {
      service: selectedService.name,
      date: selectedDate,
      time: selectedTime,
      customer: customerInfo
    });
    
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep('confirmation');
    }, 1000);
  };

  const resetBooking = () => {
    setCurrentStep('select-service');
    setSelectedService(null);
    setSelectedDate('');
    setSelectedTime('');
    setCustomerInfo({ name: '', email: '', phone: '', address: '', notes: '' });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="shadow-xl">
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
            </div>
          )}

          {currentStep === 'select-date' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Select Date</h3>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => handleDateSelect(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
              <Button variant="outline" onClick={() => setCurrentStep('select-service')}>
                Back to Services
              </Button>
            </div>
          )}

          {currentStep === 'select-time' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Select Time</h3>
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
                Back to Date
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

                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={customerInfo.notes}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Any specific requirements..."
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Booking Summary</h4>
                  <p><strong>Service:</strong> {selectedService.name}</p>
                  <p><strong>Date:</strong> {selectedDate}</p>
                  <p><strong>Time:</strong> {selectedTime}</p>
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
                Your appointment has been successfully booked.
              </p>
              <Button onClick={resetBooking}>Book Another Appointment</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}