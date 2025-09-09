import React, { useState } from 'react'

function App() {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState('')
  const [selectedDate, setSelectedDate] = useState('')

  const services = [
    { name: 'Consultation', duration: '30 minutes', price: '$50' },
    { name: 'Treatment', duration: '60 minutes', price: '$100' },
    { name: 'Follow-up', duration: '15 minutes', price: '$25' }
  ]

  const selectService = (service) => {
    setSelectedService(service.name)
    setStep(2)
  }

  const selectDate = (date) => {
    setSelectedDate(date)
    setStep(3)
  }

  const reset = () => {
    setStep(1)
    setSelectedService('')
    setSelectedDate('')
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Book Appointment</h1>
        
        {step === 1 && (
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Select Service</h2>
            {services.map((service, index) => (
              <button 
                key={index}
                className="w-full p-4 mb-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-colors"
                onClick={() => selectService(service)}
              >
                <div className="font-medium text-gray-800">{service.name}</div>
                <div className="text-sm text-gray-600">{service.duration} • {service.price}</div>
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Select Date</h2>
            <p className="text-sm text-gray-600 mb-3">Service: {selectedService}</p>
            <input 
              type="date" 
              className="w-full p-3 border border-gray-200 rounded-lg mb-4 focus:border-blue-300 focus:outline-none"
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => selectDate(e.target.value)}
            />
            <button 
              className="w-full p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setStep(1)}
            >
              ← Back to Services
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold mb-2 text-green-600">Booking Confirmed!</h2>
            <div className="bg-gray-50 p-4 rounded-lg mb-4 text-left">
              <p className="text-sm"><strong>Service:</strong> {selectedService}</p>
              <p className="text-sm"><strong>Date:</strong> {selectedDate}</p>
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
    </div>
  )
}

export default App