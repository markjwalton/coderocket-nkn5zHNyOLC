import React, { useState } from 'react'

function App() {
  const [step, setStep] = useState(1)

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Book Appointment</h1>
        
        {step === 1 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Select Service</h2>
            <button 
              className="w-full p-4 mb-3 text-left border rounded-lg hover:bg-gray-50"
              onClick={() => setStep(2)}
            >
              <div className="font-medium">Consultation</div>
              <div className="text-sm text-gray-600">30 minutes • $50</div>
            </button>
            <button 
              className="w-full p-4 text-left border rounded-lg hover:bg-gray-50"
              onClick={() => setStep(2)}
            >
              <div className="font-medium">Treatment</div>
              <div className="text-sm text-gray-600">60 minutes • $100</div>
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Select Date</h2>
            <input 
              type="date" 
              className="w-full p-3 border rounded-lg mb-4"
              onChange={() => setStep(3)}
            />
            <button 
              className="w-full p-2 border rounded-lg"
              onClick={() => setStep(1)}
            >
              Back to Services
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-4 text-green-600">Booking Complete!</h2>
            <p className="text-gray-600 mb-6">Your appointment has been booked successfully.</p>
            <button 
              className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={() => setStep(1)}
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