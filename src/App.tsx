import BookingWidget from './components/BookingWidget'

// Example data - replace with your actual data from Base44
const appointmentTypes = [
  {
    id: '1',
    name: 'Consultation',
    duration_minutes: 30,
    price: 50,
    description: 'Initial consultation and assessment'
  },
  {
    id: '2',
    name: 'Treatment Session',
    duration_minutes: 60,
    price: 100,
    description: 'Full treatment session'
  },
  {
    id: '3',
    name: 'Follow-up',
    duration_minutes: 15,
    price: 25,
    description: 'Quick follow-up appointment'
  }
]

const availabilitySlots = [
  {
    date: '2025-01-20',
    day_name: 'Monday',
    time_slots: ['09:00', '10:00', '14:00', '15:00']
  },
  {
    date: '2025-01-21',
    day_name: 'Tuesday',
    time_slots: ['09:00', '11:00', '16:00']
  },
  {
    date: '2025-01-23',
    day_name: 'Thursday',
    time_slots: ['10:00', '14:00', '15:00', '16:00']
  },
  {
    date: '2025-01-24',
    day_name: 'Friday',
    time_slots: ['09:00', '10:00', '11:00']
  }
]

function App() {
  const handleBookingComplete = (booking: any) => {
    console.log('Booking completed:', booking)
    // Handle successful booking
  }

  const handleError = (error: string) => {
    console.error('Booking error:', error)
    // Handle errors
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <BookingWidget
        appointmentTypes={appointmentTypes}
        availabilitySlots={availabilitySlots}
        apiBaseUrl="/api" // Your Base44 API endpoint
        onBookingComplete={handleBookingComplete}
        onError={handleError}
      />
    </div>
  )
}

export default App