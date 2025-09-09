import React, { useState } from "react";

export default function BookingWidget() {
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Book Appointment</h1>
      
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Select Service</h2>
          <button 
            className="w-full p-4 text-left border rounded-lg hover:bg-gray-50"
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
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Select Date</h2>
          <input 
            type="date" 
            className="w-full p-3 border rounded-lg"
            onChange={() => setStep(3)}
          />
          <button 
            className="w-full p-2 border rounded-lg"
            onClick={() => setStep(1)}
          >
            Back
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Booking Complete!</h2>
          <p className="text-green-600">Your appointment has been booked.</p>
          <button 
            className="w-full p-3 bg-blue-600 text-white rounded-lg"
            onClick={() => setStep(1)}
          >
            Book Another
          </button>
        </div>
      )}
    </div>
  );
}