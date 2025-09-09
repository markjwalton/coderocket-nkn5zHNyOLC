import React, { useState } from "react";
// Import your own UI components or use standard HTML
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar, Plus, Trash2, MessageCircle } from "lucide-react";
import { format } from "date-fns";

// --- API SDK (Mock) ---
// In your real application, use the same API helper as in BookingWidget.jsx
const api = {
  create: async (entity, data) => {
    console.log(`Creating ${entity} with data:`, data);
    // Replace with your actual fetch call
    return Promise.resolve({ id: 'new_id', ...data });
  }
};
const Appointment = { create: (data) => api.create('Appointment', data) };
// --- End API SDK ---

export default function ProvisionalRequestForm({ appointmentType, onClose }) {
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

  const removeAdditionalDate = (index) => {
    setFormData(prev => ({
      ...prev,
      additional_dates: prev.additional_dates.filter((_, i) => i !== index)
    }));
  };

  const updateAdditionalDate = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      additional_dates: prev.additional_dates.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleSubmit = async (e) => {
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
      {/* Main form JSX will be added in the next chunk */}
    </Card>
  );
}