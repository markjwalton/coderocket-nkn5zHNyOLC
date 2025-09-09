import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button"; // Assumes shadcn/ui
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar, ChevronLeft, ChevronRight, Clock, Users, MessageCircle } from "lucide-react"; // Assumes lucide-react
import { addDays, format, getDay, startOfWeek, endOfWeek, eachDayOfInterval, addWeeks, subWeeks, isAfter, isBefore, startOfToday } from "date-fns"; // Assumes date-fns
import ProvisionalRequestForm from "./ProvisionalRequestForm"; // Make sure this component is in the same directory

// --- API SDK ---
// This is a mock SDK. In your external site, you would use actual API calls (e.g., with fetch)
// to your Base44 backend.
const Base44_API_ENDPOINT = 'YOUR_BASE44_API_ENDPOINT';
const API_KEY = 'YOUR_BASE44_API_KEY';

const api = {
  list: async (entity, params = '') => {
    const response = await fetch(`${Base44_API_ENDPOINT}/${entity}?${params}`, {
      headers: { 'Authorization': `Bearer ${API_KEY}` }
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  },
  create: async (entity, data) => {
    const response = await fetch(`${Base44_API_ENDPOINT}/${entity}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  }
};

const Appointment = { create: (data) => api.create('Appointment', data) };
const AppointmentType = { list: () => api.list('AppointmentType') };
const AvailabilitySlot = { list: () => api.list('AvailabilitySlot') };
// --- End API SDK ---

const DAYS_MAP = { 0: 'sunday', 1: 'monday', 2: 'tuesday', 3: 'wednesday', 4: 'thursday', 5: 'friday', 6: 'saturday' };

export default function BookingWidget() {
  const [appointmentTypes, setAppointmentTypes] = useState([]);
  const [availabilitySlots, setAvailabilitySlots] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load initial data from your Base44 backend
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [types, slots] = await Promise.all([
          AppointmentType.list(),
          AvailabilitySlot.list()
        ]);
        setAppointmentTypes(types);
        setAvailabilitySlots(slots);
      } catch (error) {
        console.error("Failed to load booking data:", error);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedType, setSelectedType] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [showProvisionalForm, setShowProvisionalForm] = useState(false);
  const [availableDays, setAvailableDays] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [hasNext, setHasNext] = useState(true);

  const [formData, setFormData] = useState({
    customer_name: "", customer_email: "", customer_phone: "",
    customer_address: "", customer_notes: ""
  });

  const activeTypes = appointmentTypes?.filter(type => type.is_active) || [];

  const checkAvailabilityForWeek = useCallback((weekDate) => {
    if (!availabilitySlots) return false;
    const weekStart = startOfWeek(weekDate, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(weekDate, { weekStartsOn: 1 });
    const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

    return weekDays.some(date => {
      const dayOfWeek = DAYS_MAP[getDay(date)];
      return availabilitySlots.some(slot => slot.day_of_week === dayOfWeek && slot.is_active);
    });
  }, [availabilitySlots]);

  useEffect(() => {
    if (!selectedType || !availabilitySlots) return;

    const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
    const weekDays = eachDayOfInterval({ start: weekStart, end: endOfWeek(currentWeek, { weekStartsOn: 1 }) });
    const daysWithSlots = [];

    weekDays.forEach(date => {
      const dayOfWeek = DAYS_MAP[getDay(date)];
      const daySlots = availabilitySlots.filter(slot => slot.day_of_week === dayOfWeek && slot.is_active);
      if (daySlots.length > 0 && !isBefore(date, startOfToday())) {
        const times = [];
        daySlots.forEach(slot => {
          const startHour = parseInt(slot.start_time.split(':')[0]);
          const endHour = parseInt(slot.end_time.split(':')[0]);
          for (let hour = startHour; hour < endHour; hour++) {
            times.push(`${hour.toString().padStart(2, '0')}:00`);
          }
        });
        if (times.length > 0) {
          daysWithSlots.push({
            date: format(date, 'yyyy-MM-dd'),
            displayDate: format(date, 'dd'),
            displayMonth: format(date, 'MMM'),
            displayDay: format(date, 'EEEE'),
            times: [...new Set(times)].sort()
          });
        }
      }
    });
    setAvailableDays(daysWithSlots);

    const previousWeek = subWeeks(currentWeek, 1);
    const today = startOfToday();
    setHasPrevious(isAfter(startOfWeek(currentWeek, { weekStartsOn: 1 }), today) && checkAvailabilityForWeek(previousWeek));
    setHasNext(checkAvailabilityForWeek(addWeeks(currentWeek, 1)));

  }, [selectedType, currentWeek, availabilitySlots, checkAvailabilityForWeek]);

  const getDisplayDateRange = () => {
    if (availableDays.length === 0) return "No appointments available this week";
    if (availableDays.length === 1) return format(new Date(availableDays[0].date), 'EEEE, do MMMM');
    
    const firstDay = new Date(availableDays[0].date);
    const lastDay = new Date(availableDays[availableDays.length - 1].date);
    return `${format(firstDay, 'do MMM')} - ${format(lastDay, 'do MMM yyyy')}`;
  };

  const handleTimeSelection = (date, time) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setShowCustomerForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (!selectedType || !selectedDate || !selectedTime) {
      alert('Please select appointment type, date and time');
      setSubmitting(false);
      return;
    }
    try {
      const appointmentData = {
        ...formData,
        appointment_type: selectedType.name,
        appointment_date: selectedDate,
        appointment_time: selectedTime,
        duration_minutes: selectedType.duration_minutes,
        status: selectedType.requires_verification ? 'pending' : 'confirmed',
        verification_code: Math.random().toString(36).substr(2, 8).toUpperCase()
      };
      await Appointment.create(appointmentData);
      alert('Booking request submitted successfully! You will receive a confirmation email shortly.');
      setFormData({ customer_name: "", customer_email: "", customer_phone: "", customer_address: "", customer_notes: "" });
      setSelectedType(null);
      setSelectedDate("");
      setSelectedTime("");
      setShowCustomerForm(false);
    } catch (error) {
      console.error('Error creating appointment:', error);
      alert('Failed to submit booking. Please try again.');
    }
    setSubmitting(false);
  };

  const navigateWeek = (direction) => {
    setCurrentWeek(prev => direction === 'next' ? addWeeks(prev, 1) : subWeeks(prev, 1));
    setSelectedDate("");
    setSelectedTime("");
    setShowCustomerForm(false);
  };

  const goToToday = () => {
    setCurrentWeek(new Date());
    setSelectedDate("");
    setSelectedTime("");
    setShowCustomerForm(false);
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading booking information...</div>;
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* JSX content will be added in the next chunk */}
    </div>
  );
}