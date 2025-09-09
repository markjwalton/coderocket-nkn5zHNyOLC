# Base44 Booking Widget Integration

This booking widget integrates seamlessly with your Base44 backend to provide a complete appointment booking experience.

## Installation

1. **Install Dependencies:**
```bash
npm install date-fns lucide-react
```

2. **Copy Components:**
Copy these files to your React project:
- `components/BookingWidget.jsx`
- `components/ProvisionalRequestForm.jsx`
- `utils/api.js`

3. **Configure API:**
Edit `utils/api.js` and replace:
- `YOUR_BASE44_API_ENDPOINT` with your actual Base44 API endpoint
- `YOUR_BASE44_API_KEY` with your actual API key

4. **Use the Widget:**
```jsx
import BookingWidget from './components/BookingWidget'

function MyPage() {
  const handleBookingComplete = (booking) => {
    console.log('Booking completed:', booking)
    // Handle success
  }

  const handleError = (error) => {
    console.error('Booking error:', error)
    // Handle errors
  }

  return (
    <BookingWidget
      onBookingComplete={handleBookingComplete}
      onError={handleError}
    />
  )
}
```

## Features

✅ **Card-based availability display** - Clean, intuitive interface
✅ **Responsive design** - Works on all devices
✅ **Week navigation** - Browse availability by week
✅ **Provisional booking system** - Custom requests handled elegantly
✅ **Base44 integration** - Direct API connection
✅ **Error handling** - Graceful error management

## API Requirements

Your Base44 backend should have these entities:
- `AppointmentType` - Service types with pricing
- `AvailabilitySlot` - Available time slots
- `Appointment` - Booking records

The widget will automatically fetch data and create provisional bookings through your Base44 API.