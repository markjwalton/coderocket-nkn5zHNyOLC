import React, { useState, useEffect } from 'react'

function App() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  // Data from your system
  const [services, setServices] = useState([])
  const [availableSlots, setAvailableSlots] = useState([])
  
  // Selected values
  const [selectedService, setSelectedService] = useState(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  })

  // Replace with your actual API base URL
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://your-booking-api.com/api'

  // Load services when component mounts
  useEffect(() => {
    loadServices()
  }, [])

  // Load availability when service and date are selected
  useEffect(() => {
    if (selectedService && selectedDate) {
      loadAvailability()
    }
  }, [selectedService, selectedDate])

  const loadServices = async () => {
    try {
      setLoading(true)
      setError('')
      
      const response = await fetch(`${API_BASE_URL}/services`)
      
      if (!response.ok) {
        throw new Error(`Failed to load services: ${response.status}`)
      }
      
      const data = await response.json()
      setServices(data.services || data || [])
    } catch (err) {
      console.error('Error loading services:', err)
      setError('Failed to load services. Please try again.')
      // Fallback to demo data if API fails
      setServices([
        { id: 1, name: 'Consultation', duration_minutes: 30, price: 50 },
        { id: 2, name: 'Treatment', duration_minutes: 60, price: 100 }
      ])
    } finally {
      setLoading(false)
    }
  }

  const loadAvailability = async () => {
    try {
      setLoading(true)
      setError('')
      
      const response = await fetch(
        `${API_BASE_URL}/availability?service_id=${selectedService.id}&date=${selectedDate}`
      )
      
      if (!response.ok) {
        throw new Error(`Failed to load availability: ${response.status}`)
      }
      
      const data = await response.json()
      setAvailableSlots(data.slots || data.available_times || [])
    } catch (err) {
      console.error('Error loading availability:', err)
      setError('Failed to load availability. Please try again.')
      setAvailableSlots([])
    } finally {
      setLoading(false)
    }
  }

  const createBooking = async () => {
    try {
      setLoading(true)
      setError('')
      
      const bookingData = {
        service_id: selectedService.id,
        date: selectedDate,
        time: selectedTime,
        customer: customerInfo
      }

      const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
      })

      if (!response.ok) {
        throw new Error(`Failed to create booking: ${response.status}`)
      }

      const result = await response.json()
      console.log('Booking created:', result)
      setStep(5)
    } catch (err) {
      console.error('Error creating booking:', err)
      setError('Failed to create booking. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createBooking()
  }

  const reset = () => {
    setStep(1)
    setSelectedService(null)
    setSelectedDate('')
    setSelectedTime('')
    setCustomerInfo({ name: '', email: '', phone: '' })
    setAvailableSlots([])
    setError('')
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Book Appointment</h1>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Step 1: Select Service */}
        {step === 1 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Select Service</h2>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading services...</p>
              </div>
            ) : services.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No services available</p>
            ) : (
              services.map((service) => (
                <button 
                  key={service.id}
                  className="w-full p-4 mb-3 text-left border rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-colors"
                  onClick={() => {
                    setSelectedService(service)
                    setStep(2)
                  }}
                >
                  <div className="font-medium">{service.name}</div>
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
            <h2 className="text-lg font-semibold mb-4">Select Date</h2>
            <p className="text-sm text-gray-600 mb-3">Service: {selectedService?.name}</p>
            <input 
              type="date" 
              className="w-full p-3 border rounded-lg mb-4 focus:border-blue-300 focus:outline-none"
              min={new Date().toISOString().split('T')[0]}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <div className="flex gap-3">
              <button 
                className="flex-1 p-2 border rounded-lg hover:bg-gray-50"
                onClick={() => setStep(1)}
              >
                ← Back
              </button>
              <button 
                className="flex-1 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
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
            <h2 className="text-lg font-semibold mb-4">Select Time</h2>
            <p className="text-sm text-gray-600 mb-3">Date: {selectedDate}</p>
            
            {loading ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-sm text-gray-600">Loading availability...</p>
              </div>
            ) : availableSlots.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-gray-500">No available times for this date</p>
                <p className="text-xs text-gray-400 mt-1">Try selecting a different date</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2 mb-4">
                {availableSlots.map((slot, index) => {
                  const timeValue = typeof slot === 'string' ? slot : slot.time
                  const isAvailable = typeof slot === 'string' ? true : slot.available !== false
                  
                  return (
                    <button
                      key={index}
                      className={`p-3 border rounded-lg transition-colors ${
                        !isAvailable 
                          ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                          : selectedTime === timeValue 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'border-gray-200 hover:bg-gray-50 hover:border-blue-300'
                      }`}
                      onClick={() => isAvailable && setSelectedTime(timeValue)}
                      disabled={!isAvailable}
                    >
                      {timeValue}
                    </button>
                  )
                })}
              </div>
            )}
            
            <div className="flex gap-3">
              <button 
                className="flex-1 p-2 border rounded-lg hover:bg-gray-50"
                onClick={() => setStep(2)}
              >
                ← Back
              </button>
              <button 
                className="flex-1 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
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
            <h2 className="text-lg font-semibold mb-4">Your Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name *</label>
                <input
                  type="text"
                  required
                  className="w-full p-3 border rounded-lg focus:border-blue-300 focus:outline-none"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <input
                  type="email"
                  required
                  className="w-full p-3 border rounded-lg focus:border-blue-300 focus:outline-none"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  className="w-full p-3 border rounded-lg focus:border-blue-300 focus:outline-none"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
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
                  className="flex-1 p-2 border rounded-lg hover:bg-gray-50"
                  onClick={() => setStep(3)}
                >
                  ← Back
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="flex-1 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
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
              <span className="text-2xl text-green-600">✓</span>
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
              className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={reset}
            >
              Book Another Appointment
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App