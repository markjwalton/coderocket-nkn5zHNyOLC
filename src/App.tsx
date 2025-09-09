import BookingWidget from './components/BookingWidget'

function App() {
  const handleBookingComplete = (booking: any) => {
    console.log('Booking completed:', booking)
    // Handle successful booking - maybe show a toast notification
  }

  const handleError = (error: string) => {
    console.error('Booking error:', error)
    // Handle errors - maybe show an error toast
    alert(error) // Simple error handling for now
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <BookingWidget
        apiBaseUrl="https://your-base44-api.com/api" // Replace with your actual Base44 API URL
        onBookingComplete={handleBookingComplete}
        onError={handleError}
      />
    </div>
  )
}

export default App