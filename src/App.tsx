import React, { useState } from 'react'

function App() {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')

  const services = [
    { name: 'Consultation', duration: '30 min', price: '$50' },
    { name: 'Treatment', duration: '60 min', price: '$100' },
    { name: 'Follow-up', duration: '15 min', price: '$25' }
  ]

  const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']

  const reset = () => {
    setStep(1)
    setSelectedService('')
    setSelectedDate('')
    setSelectedTime('')
    setCustomerName('')
    setCustomerEmail('')
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Book Appointment</h1>
        
        {step === 1 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Select Service</h2>
            {services.map((service, index) => (
              <button 
                key={index}
                className="w-full p-4 mb-3 text-left border rounded-lg hover:bg-gray-50"
                onClick={() => {
                  setSelectedService(service.name)
                  setStep(2)
                }}
              >
                <div className="font-medium">{service.name}</div>
                <div className="text-sm text-gray-600">{service.duration} • {service.price}</div>
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Select Date</h2>
            <p className="text-sm text-gray-600 mb-3">Service: {selectedService}</p>
            <input 
              type="date" 
              className="w-full p-3 border rounded-lg mb-4"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <div className="flex gap-3">
              <button 
                className="flex-1 p-2 border rounded-lg"
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button 
                className="flex-1 p-2 bg-blue-600 text-white rounded-lg"
                onClick={() => setStep(3)}
                disabled={!selectedDate}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Select Time</h2>
            <p className="text-sm text-gray-600 mb-3">Date: {selectedDate}</p>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  className={`p-3 border rounded-lg ${
                    selectedTime === time ? 'bg-blue-600 text-white' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button 
                className="flex-1 p-2 border rounded-lg"
                onClick={() => setStep(2)}
              >
                Back
              </button>
              <button 
                className="flex-1 p-2 bg-blue-600 text-white rounded-lg"
                onClick={() => setStep(4)}
                disabled={!selectedTime}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Your Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full p-3 border rounded-lg"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                />
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Summary</h3>
                <p className="text-sm">Service: {selectedService}</p>
                <p className="text-sm">Date: {selectedDate}</p>
                <p className="text-sm">Time: {selectedTime}</p>
              </div>

              <div className="flex gap-3">
                <button 
                  className="flex-1 p-2 border rounded-lg"
                  onClick={() => setStep(3)}
                >
                  Back
                </button>
                <button 
                  className="flex-1 p-3 bg-green-600 text-white rounded-lg"
                  onClick={() => setStep(5)}
                  disabled={!customerName || !customerEmail}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✓</span>
            </div>
            <h2 className="text-lg font-semibold mb-2 text-green-600">Booking Confirmed!</h2>
            <div className="bg-gray-50 p-4 rounded-lg mb-4 text-left">
              <p className="text-sm">Service: {selectedService}</p>
              <p className="text-sm">Date: {selectedDate}</p>
              <p className="text-sm">Time: {selectedTime}</p>
              <p className="text-sm">Name: {customerName}</p>
              <p className="text-sm">Email: {customerEmail}</p>
            </div>
            <button 
              className="w-full p-3 bg-blue-600 text-white rounded-lg"
              onClick={reset}
            >
              Book Another
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App