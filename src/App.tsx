import BookingWidget from './components/BookingWidget'

function App() {
  const handleBookingComplete = (booking: any) => {
    console.log('Booking completed:', booking)
    // Handle successful booking (e.g., show notification, redirect, etc.)
  }

  const handleError = (error: string) => {
    console.error('Booking error:', error)
    // Handle errors (e.g., show error message to user)
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <BookingWidget 
        apiBaseUrl="https://your-api.com/api"
        onBookingComplete={handleBookingComplete}
        onError={handleError}
        className="mx-4"
      />
    </div>
  )
}

export default App