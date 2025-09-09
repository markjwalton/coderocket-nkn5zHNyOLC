import BookingWidget from './components/BookingWidget'

function App() {
  const handleBookingComplete = (booking) => {
    console.log('Booking completed:', booking)
    // Handle successful booking - maybe show a toast notification
    alert('Booking request submitted successfully!')
  }

  const handleError = (error) => {
    console.error('Booking error:', error)
    // Handle errors - maybe show an error toast
    alert(`Error: ${error}`)
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Book Your Appointment</h1>
        
        <BookingWidget
          onBookingComplete={handleBookingComplete}
          onError={handleError}
        />
      </div>
    </div>
  )
}

export default App