import React, { useState, useEffect } from 'react'
import ProvisionalRequestForm from './ProvisionalRequestForm'

interface AppointmentType {
  id: string
  name: string
  duration_minutes: number
  price: number
  description?: string
  color?: string
  is_active?: boolean
}

interface AvailabilitySlot {
  date: string
  day_name: string
  time_slots: string[]
}

interface BookingWidgetProps {
  apiBaseUrl?: string
  onBookingComplete?: (booking: any) => void
  onError?: (error: string) => void
  className?: string
}

export default function BookingWidget({
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
  
  // Dynamic data from API
  const [appointmentTypes, setAppointmentTypes] = useState<AppointmentType[]>([])
  const [availabilitySlots, setAvailabilitySlots] = useState<AvailabilitySlot[]>([])
  const [loadingData, setLoadingData] = useState(true)

  // Load appointment types and initial availability on mount
  useEffect(() => {
    loadAppointmentTypes()
  }, [])

  // Load availability when week changes or type is selected
  useEffect(() => {
    if (selectedType) {
      loadAvailability()
    }
  }, [currentWeekStart, selectedType])

  const loadAppointmentTypes = async () => {
    try {
      setLoadingData(true)
      const response = await fetch(`${apiBaseUrl}/appointment-types`)
      
      if (!response.ok) {
        throw new Error('Failed to load appointment types')
      }
      
      const data = await response.json()
      const activeTypes = data.filter((type: AppointmentType) => type.is_active !== false)
      setAppointmentTypes(activeTypes)
    } catch (error) {
      console.error('Error loading appointment types:', error)
      onError?.('Failed to load appointment types. Please refresh the page.')
    } finally {
      setLoadingData(false)
    }
  }

  const loadAvailability = async () => {
    if (!selectedType) return
    
    try {
      setLoading(true)
      const weekStart = currentWeekStart.toISOString().split('T')[0]
      const weekEnd = new Date(currentWeekStart)
      weekEnd.setDate(weekEnd.getDate() + 6)
      const weekEndStr = weekEnd.toISOString().split('T')[0]
      
      const response = await fetch(
        `${apiBaseUrl}/availability?type_id=${selectedType.id}&start_date=${weekStart}&end_date=${weekEndStr}`
      )
      
      if (!response.ok) {
        throw new Error('Failed to load availability')
      }
      
      const data = await response.json()
      setAvailabilitySlots(data.slots || [])
    } catch (error) {
      console.error('Error loading availability:', error)
      onError?.('Failed to load availability. Please try again.')
      setAvailabilitySlots([])
    } finally {
      setLoading(false)
    }
  }

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
      console.error('Error creating booking:', error)
      onError?.('Failed to create booking. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Loading state for initial data
  if (loadingData) {
    return (
      <div className={`max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 ${className}`}>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading appointment types...</p>
        </div>
      </div>
    )
  }

  if (step === 1) {
    return (
      <div className={`max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 ${className}`}>
        <h2 className="text-2xl font-bold mb-6 text-center">Select Appointment Type</h2>
        
        {appointmentTypes.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No appointment types available at the moment.</p>
            <button 
              onClick={loadAppointmentTypes}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Refresh
            </button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {appointmentTypes.map((type) => (
              <button
                key={type.id}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-colors text-left"
                style={type.color ? { borderLeftColor: type.color, borderLeftWidth: '4px' } : {}}
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
        )}
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

        {/* Loading availability */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-gray-600">Loading availability...</p>
          </div>
        )}

        {/* Available Days */}
        {!loading && currentWeekSlots.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No appointments available this week</p>
            <button
              onClick={() => setShowCustomRequest(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Request Custom Time
            </button>
          </div>
        ) : !loading && (
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
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <p className="text-blue-800 mb-3">Cannot find a convenient appointment?</p>
                <button
                  onClick={() => setShowCustomRequest(true)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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