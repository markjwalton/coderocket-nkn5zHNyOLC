import React, { useState, useEffect } from 'react'
import ProvisionalRequestForm from './ProvisionalRequestForm'

interface AppointmentType {
  id: string
  name: string
  duration_minutes: number
  price: number
  description?: string
}

interface AvailabilitySlot {
  date: string
  day_name: string
  time_slots: string[]
}

interface BookingWidgetProps {
  appointmentTypes: AppointmentType[]
  availabilitySlots: AvailabilitySlot[]
  apiBaseUrl?: string
  onBookingComplete?: (booking: any) => void
  onError?: (error: string) => void
  className?: string
}

export default function BookingWidget({
  appointmentTypes,
  availabilitySlots,
  apiBaseUrl = '/api',
  onBookingComplete,
  onError,
  className = ""
}: BookingWidgetProps) {
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date())
  const [selectedType, setSelectedType] = useState<AppointmentType | null>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [showCustomRequest, setShowCustomRequest] = useState(false)
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)

  // Get week range display
  const getWeekRange = () => {
    const start = new Date(currentWeekStart)
    const end = new Date(start)
    end.setDate(start.getDate() + 6)
    
    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
      })
    }
    
    return `${formatDate(start)} - ${formatDate(end)}`
  }

  // Navigate weeks
  const goToPreviousWeek = () => {
    const newDate = new Date(currentWeekStart)
    newDate.setDate(newDate.getDate() - 7)
    setCurrentWeekStart(newDate)
  }

  const goToNextWeek = () => {
    const newDate = new Date(currentWeekStart)
    newDate.setDate(newDate.getDate() + 7)
    setCurrentWeekStart(newDate)
  }

  const goToToday = () => {
    const today = new Date()
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - today.getDay() + 1) // Monday
    setCurrentWeekStart(startOfWeek)
  }

  // Filter slots for current week
  const getCurrentWeekSlots = () => {
    const weekStart = new Date(currentWeekStart)
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 6)

    return availabilitySlots.filter(slot => {
      const slotDate = new Date(slot.date)
      return slotDate >= weekStart && slotDate <= weekEnd && slot.time_slots.length > 0
    })
  }

  // Create provisional booking
  const createProvisionalBooking = async (bookingData: any) => {
    try {
      setLoading(true)
      
      const response = await fetch(`${apiBaseUrl}/bookings/provisional`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...bookingData,
          appointment_type_id: selectedType?.id,
          primary_date: selectedDate,
          primary_time: selectedTime,
          status: 'provisional'
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create provisional booking')
      }

      const result = await response.json()
      onBookingComplete?.(result)
      setStep(3) // Show confirmation
    } catch (error) {
      onError?.(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (step === 1) {
    return (
      <div className={`max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 ${className}`}>
        <h2 className="text-2xl font-bold mb-6 text-center">Select Appointment Type</h2>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {appointmentTypes.map((type) => (
            <button
              key={type.id}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-colors text-left"
              onClick={() => {
                setSelectedType(type)
                setStep(2)
              }}
            >
              <h3 className="font-semibold text-lg">{type.name}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {type.duration_minutes} minutes • ${type.price}
              </p>
              {type.description && (
                <p className="text-xs text-gray-500 mt-2">{type.description}</p>
              )}
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (step === 2) {
    const currentWeekSlots = getCurrentWeekSlots()

    return (
      <div className={`max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6 ${className}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Appointment Calendar</h2>
            <p className="text-gray-600">{getWeekRange()}</p>
            <p className="text-sm text-gray-500 mt-1">Selected: {selectedType?.name}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={goToPreviousWeek}
              className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              ←
            </button>
            <button
              onClick={goToToday}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Today
            </button>
            <button
              onClick={goToNextWeek}
              className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              →
            </button>
          </div>
        </div>

        {/* Available Days */}
        {currentWeekSlots.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No appointments available this week</p>
            <button
              onClick={() => setShowCustomRequest(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Request Custom Time
            </button>
          </div>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8">
              {currentWeekSlots.map((slot) => (
                <div key={slot.date} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-1">{slot.day_name}</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {new Date(slot.date).toLocaleDateString('en-GB')}
                  </p>
                  
                  <div className="space-y-2">
                    {slot.time_slots.map((time) => (
                      <button
                        key={time}
                        className={`w-full p-2 text-sm border rounded transition-colors ${
                          selectedDate === slot.date && selectedTime === time
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'border-gray-200 hover:bg-gray-50 hover:border-blue-300'
                        }`}
                        onClick={() => {
                          setSelectedDate(slot.date)
                          setSelectedTime(time)
                        }}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Request Section */}
            <div className="border-t pt-6">
              <div className="text-center">
                <p className="text-gray-600 mb-3">Cannot find a convenient appointment?</p>
                <button
                  onClick={() => setShowCustomRequest(true)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Request Custom Time
                </button>
              </div>
            </div>
          </>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setStep(1)}
            className="flex-1 p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            ← Back to Services
          </button>
          {selectedDate && selectedTime && (
            <button
              onClick={() => createProvisionalBooking({
                primary_date: selectedDate,
                primary_time: selectedTime
              })}
              disabled={loading}
              className="flex-1 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
            >
              {loading ? 'Booking...' : 'Book Appointment'}
            </button>
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
      </div>
    )
  }

  if (step === 3) {
    return (
      <div className={`max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 text-center ${className}`}>
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl text-green-600">✓</span>
        </div>
        <h2 className="text-xl font-bold mb-2 text-green-600">Request Submitted!</h2>
        <p className="text-gray-600 mb-6">
          One of the team will be in touch to confirm the request
        </p>
        <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
          <p className="text-sm"><strong>Service:</strong> {selectedType?.name}</p>
          <p className="text-sm"><strong>Requested Date:</strong> {selectedDate}</p>
          <p className="text-sm"><strong>Requested Time:</strong> {selectedTime}</p>
          <p className="text-sm"><strong>Status:</strong> Provisional</p>
        </div>
        <button
          onClick={() => {
            setStep(1)
            setSelectedType(null)
            setSelectedDate('')
            setSelectedTime('')
          }}
          className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Book Another Appointment
        </button>
      </div>
    )
  }

  return null
}