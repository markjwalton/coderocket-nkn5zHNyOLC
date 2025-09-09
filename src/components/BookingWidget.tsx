import React, { useState, useEffect } from 'react'

interface Service {
  id: string
  name: string
  duration_minutes: number
  price: number
  description?: string
}

interface TimeSlot {
  time: string
  available: boolean
}

interface BookingWidgetProps {
  apiBaseUrl: string
  onBookingComplete?: (booking: any) => void
  onError?: (error: string) => void
  className?: string
}

export default function BookingWidget({ 
  apiBaseUrl, 
  onBookingComplete, 
  onError,
  className = ""
}: BookingWidgetProps) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [services, setServices] = useState<Service[]>([])
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([])
  
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  })

  // Load services on component mount
  useEffect(() => {
    loadServices()
  }, [])

  // Load available time slots when service and date are selected
  useEffect(() => {
    if (selectedService && selectedDate) {
      loadAvailableSlots()
    }
  }, [selectedService, selectedDate])

  const loadServices = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${apiBaseUrl}/services`)
      if (!response.ok) throw new Error('Failed to load services')
      const data = await response.json()
      setServices(data)
    } catch (error) {
      onError?.(error.message)
    } finally {
      setLoading(false)
    }
  }

  const loadAvailableSlots = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        `${apiBaseUrl}/availability?service_id=${selectedService.id}&date=${selectedDate}`
      )
      if (!response.ok) throw new Error('Failed to load availability')
      const data = await response.json()
      setAvailableSlots(data.slots || [])
    } catch (error) {
      onError?.(error.message)
      setAvailableSlots([])
    } finally {
      setLoading(false)
    }
  }

  const createBooking = async () => {
    try {
      setLoading(true)
      const bookingData = {
        service_id: selectedService.id,
        date: selectedDate,
        time: selectedTime,
        customer: customerInfo
      }

      const response = await fetch(`${apiBaseUrl}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
      })

      if (!response.ok) throw new Error('Failed to create booking')
      const booking = await response.json()
      
      setStep(5)
      onBookingComplete?.(booking)
    } catch (error) {
      onError?.(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createBooking()
  }

  const reset = () => {
    setStep(1)
    setSelectedService(null)
    setSelectedDate('')
    setSelectedTime('')
    setCustomerInfo({ name: '', email: '', phone: '', notes: '' })
    setAvailableSlots([])
  }

  if (loading && step === 1) {
    return (
      <div className={`max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 ${className}`}>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading services...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Book Appointment</h1>
      
      {/* Step 1: Select Service */}
      {step === 1 && (
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Select Service</h2>
          {services.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No services available</p>
          ) : (
            services.map((service) => (
              <button 
                key={service.id}
                className="w-full p-4 mb-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-colors"
                onClick={() => {
                  setSelectedService(service)
                  setStep(2)
                }}
              >
                <div className="font-medium text-gray-800">{service.name}</div>
                <div className="text-sm text-gray-600">
                  {service.duration_minutes} minutes • ${service.price}
                </div>
                {service.description && (
                  <div className="text-xs text-gray-500 mt-1">{service.description}</div>
                )}
              </button>
            ))
          )}
        </div>
      )}

      {/* Step 2: Select Date */}
      {step === 2 && (
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Select Date</h2>
          <p className="text-sm text-gray-600 mb-3">Service: {selectedService?.name}</p>
          <input 
            type="date" 
            className="w-full p-3 border border-gray-200 rounded-lg mb-4 focus:border-blue-300 focus:outline-none"
            min={new Date().toISOString().split('T')[0]}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <div className="flex gap-3">
            <button 
              className="flex-1 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setStep(1)}
            >
              ← Back
            </button>
            <button 
              className="flex-1 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300"
              onClick={() => setStep(3)}
              disabled={!selectedDate}
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Select Time */}
      {step === 3 && (
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Select Time</h2>
          <p className="text-sm text-gray-600 mb-3">Date: {selectedDate}</p>
          
          {loading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-600">Loading availability...</p>
            </div>
          ) : availableSlots.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No available times for this date</p>
          ) : (
            <div className="grid grid-cols-3 gap-2 mb-4">
              {availableSlots.map((slot) => (
                <button
                  key={slot.time}
                  className={`p-3 border rounded-lg transition-colors ${
                    !slot.available 
                      ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                      : selectedTime === slot.time 
                        ? 'bg-blue-600 text-white border-blue-600' 
                        : 'border-gray-200 hover:bg-gray-50 hover:border-blue-300'
                  }`}
                  onClick={() => slot.available && setSelectedTime(slot.time)}
                  disabled={!slot.available}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          )}
          
          <div className="flex gap-3">
            <button 
              className="flex-1 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setStep(2)}
            >
              ← Back
            </button>
            <button 
              className="flex-1 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300"
              onClick={() => setStep(4)}
              disabled={!selectedTime}
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Customer Information */}
      {step === 4 && (
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Your Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input
                type="text"
                required
                className="w-full p-3 border border-gray-200 rounded-lg focus:border-blue-300 focus:outline-none"
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                required
                className="w-full p-3 border border-gray-200 rounded-lg focus:border-blue-300 focus:outline-none"
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                className="w-full p-3 border border-gray-200 rounded-lg focus:border-blue-300 focus:outline-none"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                className="w-full p-3 border border-gray-200 rounded-lg focus:border-blue-300 focus:outline-none"
                rows={3}
                value={customerInfo.notes}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Any special requirements..."
              />
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Booking Summary</h3>
              <p className="text-sm"><strong>Service:</strong> {selectedService?.name}</p>
              <p className="text-sm"><strong>Date:</strong> {selectedDate}</p>
              <p className="text-sm"><strong>Time:</strong> {selectedTime}</p>
              <p className="text-sm"><strong>Duration:</strong> {selectedService?.duration_minutes} minutes</p>
              <p className="text-sm"><strong>Price:</strong> ${selectedService?.price}</p>
            </div>

            <div className="flex gap-3">
              <button 
                type="button"
                className="flex-1 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => setStep(3)}
              >
                ← Back
              </button>
              <button 
                type="submit"
                disabled={loading}
                className="flex-1 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
              >
                {loading ? 'Booking...' : 'Confirm Booking'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Step 5: Confirmation */}
      {step === 5 && (
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold mb-2 text-green-600">Booking Confirmed!</h2>
          <div className="bg-gray-50 p-4 rounded-lg mb-4 text-left">
            <p className="text-sm"><strong>Service:</strong> {selectedService?.name}</p>
            <p className="text-sm"><strong>Date:</strong> {selectedDate}</p>
            <p className="text-sm"><strong>Time:</strong> {selectedTime}</p>
            <p className="text-sm"><strong>Customer:</strong> {customerInfo.name}</p>
            <p className="text-sm"><strong>Email:</strong> {customerInfo.email}</p>
          </div>
          <p className="text-gray-600 mb-6 text-sm">You will receive a confirmation email shortly.</p>
          <button 
            className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={reset}
          >
            Book Another Appointment
          </button>
        </div>
      )}
    </div>
  )
}