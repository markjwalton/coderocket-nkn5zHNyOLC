import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar, Plus, Trash2, MessageCircle } from "lucide-react";
import { format } from "date-fns";

// Mock API functions
const api = {
  create: async (entity, data) => {
    console.log(`Creating ${entity} with data:`, data);
    return Promise.resolve({ id: 'new_id', ...data });
  }
};
const Appointment = { create: (data) => api.create('Appointment', data) };

interface AppointmentType {
  id: number;
  name: string;
  duration_minutes: number;
  price: number;
}

interface ProvisionalRequestFormProps {
  appointmentType: AppointmentType;
  onClose: () => void;
}

export default function ProvisionalRequestForm({ appointmentType, onClose }: ProvisionalRequestFormProps) {
  const [formData, setFormData] = useState({
    customer_name: "", customer_email: "", customer_phone: "",
    customer_address: "", customer_notes: "",
    requested_date: "", requested_time: "",
    additional_dates: [{ date: "", time: "" }]
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const addAdditionalDate = () => {
    setFormData(prev => ({
      ...prev,
      additional_dates: [...prev.additional_dates, { date: "", time: "" }]
    }));
  };

  const removeAdditionalDate = (index: number) => {
    setFormData(prev => ({
      ...prev,
      additional_dates: prev.additional_dates.filter((_, i) => i !== index)
    }));
  };

  const updateAdditionalDate = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      additional_dates: prev.additional_dates.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const validAdditionalDates = formData.additional_dates
        .filter(item => item.date && item.time)
        .map(item => `${item.date} at ${item.time}`);

      const appointmentData = {
        customer_name: formData.customer_name,
        customer_email: formData.customer_email,
        customer_phone: formData.customer_phone,
        customer_address: formData.customer_address,
        customer_notes: formData.customer_notes,
        appointment_type: appointmentType.name,
        appointment_date: formData.requested_date,
        appointment_time: formData.requested_time,
        duration_minutes: appointmentType.duration_minutes,
        status: 'provisional',
        additional_requested_dates: validAdditionalDates.length > 0 ? JSON.stringify(validAdditionalDates) : null
      };

      await Appointment.create(appointmentData);
      setSubmitted(true);
    } catch (error) {
      console.error('Error creating provisional appointment:', error);
      alert('Failed to submit request. Please try again.');
    }
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <Card className="border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <MessageCircle className="w-5 h-5" />
            Request Submitted Successfully
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-semibold mb-3">Thank you for your request!</h3>
            <p className="text-gray-600 mb-6">
              One of our team will be in touch to confirm the request within 1 business day.
            </p>
            <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 text-white">
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-blue-600" />
          Request Consultation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customer_name">Full Name *</Label>
              <Input
                id="customer_name"
                value={formData.customer_name}
                onChange={(e) => setFormData(prev => ({ ...prev, customer_name: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="customer_email">Email *</Label>
              <Input
                id="customer_email"
                type="email"
                value={formData.customer_email}
                onChange={(e) => setFormData(prev => ({ ...prev, customer_email: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customer_phone">Phone</Label>
              <Input
                id="customer_phone"
                value={formData.customer_phone}
                onChange={(e) => setFormData(prev => ({ ...prev, customer_phone: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="customer_address">Address</Label>
              <Input
                id="customer_address"
                value={formData.customer_address}
                onChange={(e) => setFormData(prev => ({ ...prev, customer_address: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="customer_notes">Additional Notes</Label>
            <Textarea
              id="customer_notes"
              value={formData.customer_notes}
              onChange={(e) => setFormData(prev => ({ ...prev, customer_notes: e.target.value }))}
              placeholder="Any specific requirements or preferences..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="requested_date">Preferred Date</Label>
              <Input
                id="requested_date"
                type="date"
                value={formData.requested_date}
                onChange={(e) => setFormData(prev => ({ ...prev, requested_date: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="requested_time">Preferred Time</Label>
              <Input
                id="requested_time"
                type="time"
                value={formData.requested_time}
                onChange={(e) => setFormData(prev => ({ ...prev, requested_time: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Alternative Dates/Times</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addAdditionalDate}
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Alternative
              </Button>
            </div>
            
            {formData.additional_dates.map((item, index) => (
              <div key={index} className="flex gap-2 items-end">
                <div className="flex-1">
                  <Input
                    type="date"
                    value={item.date}
                    onChange={(e) => updateAdditionalDate(index, 'date', e.target.value)}
                    placeholder="Alternative date"
                  />
                </div>
                <div className="flex-1">
                  <Input
                    type="time"
                    value={item.time}
                    onChange={(e) => updateAdditionalDate(index, 'time', e.target.value)}
                    placeholder="Alternative time"
                  />
                </div>
                {formData.additional_dates.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeAdditionalDate(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}