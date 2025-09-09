import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calendar, ChevronLeft, ChevronRight, Clock, Users, MessageCircle } from "lucide-react";
import { addDays, format, getDay, startOfWeek, endOfWeek, eachDayOfInterval, addWeeks, subWeeks, isAfter, isBefore, startOfToday } from "date-fns";
import ProvisionalRequestForm from "./ProvisionalRequestForm";

const Base44_API_ENDPOINT = "YOUR_BASE44_API_ENDPOINT";

// Mock API functions
const api = {
  get: async (entity, params = {}) => {
    console.log(`Getting ${entity} with params:`, params);
    return Promise.resolve([]);
  },
  create: async (entity, data) => {
    console.log(`Creating ${entity} with data:`, data);
    return Promise.resolve({ id: 'new_id', ...data });
  }
};

const AppointmentType = { 
  getAll: () => api.get('AppointmentType'),
  getAvailableSlots: (typeId, date) => api.get('AvailableSlots', { typeId, date })
};
const Appointment = { create: (data) => api.create('Appointment', data) };

export default function BookingWidget() {
  const [currentStep, setCurrentStep] = useState('select-service');
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(startOfToday()));
  const [availableSlots, setAvailableSlots] = useState([]);
  const [services, setServices] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '', email: '', phone: '', address: '', notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showProvisionalForm, setShowProvisionalForm] = useState(false);

  // Mock services data
  useEffect(() => {
    setServices([
      { id: 1, name: 'Consultation', duration_minutes: 30, price: 50 },
      { id: 2, name: 'Treatment', duration_minutes: 60, price: 100 },
      { id: 3, name: 'Follow-up', duration_minutes: 15, price: 25 }
    ]);
  }, []);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setCurrentStep('select-date');
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    // Mock available slots
    setAvailableSlots(['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']);
    setCurrentStep('select-time');
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setCurrentStep('customer-info');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const appointmentData = {
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
      };

      await Appointment.create(appointmentData);
      setCurrentStep('confirmation');
    } catch (error) {
      console.error('Error creating appointment:', error);
      alert('Failed to book appointment. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  const resetBooking = () => {
    setCurrentStep('select-service');
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setCustomerInfo({ name: '', email: '', phone: '', address: '', notes: '' });
    setShowProvisionalForm(false);
  };

  if (showProvisionalForm) {
    return (
      <ProvisionalRequestForm 
        appointmentType={selectedService}
        onClose={() => setShowProvisionalForm(false)}
      />
    );
  }

  // Rest of the component JSX will be added in subsequent chunks
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Book Your Appointment</CardTitle>
        </CardHeader>
        <CardContent>
          {currentStep === 'select-service' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Select a Service</h3>
              {services.map(service => (
                <Button
                  key={service.id}
                  variant="outline"
                  className="w-full p-4 h-auto text-left"
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
                className="w-full p-4 h-auto text-left border-blue-200 bg-blue-50"
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
          
          {currentStep === 'confirmation' && (
            <div className="text-center py-8">
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