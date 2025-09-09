import React, { useState } from 'react'

interface AppointmentType {
  id: string
  name: string
  duration_minutes: number
  price: number
}

interface ProvisionalRequestFormProps {
  appointmentType: AppointmentType | null
  onSubmit: (data: any) => void
  onCancel: () => void
  loading: boolean
}

export default function ProvisionalRequestForm({
  appointmentType,
  onSubmit,
  onCancel,
  loading
}: ProvisionalRequestFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferred_date_1: '',
    preferred_time_1: '',
    preferred_date_2: '',
    preferred_time_2: '',
    preferred_date_3: '',
    preferred_time_3: '',
    notes: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const alternativeDates = [
      { date: formData.preferred_date_1, time: formData.preferred_time_1 },
      { date: formData.preferred_date_2, time: formData.preferred_time_2 },
      { date: formData.preferred_date_3, time: formData.preferred_time_3 }
    ].filter(alt => alt.date && alt.time)

    onSubmit({
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      },
      alternative_dates: alternativeDates,
      notes: formData.notes,
      is_custom_request: true
    })
  }

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Request Custom Time</h3>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-blue-800">
              <strong>Selected Service:</strong> {appointmentType?.name} 
              ({appointmentType?.duration_minutes} minutes • ${appointmentType?.price})
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Information */}
            <div className="space-y-4">
              <h4 className="font-semibold">Your Information</h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full p-3 border border-gray-200 rounded-lg focus:border-blue-300 focus:outline-none"
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    className="w-full p-3 border border-gray-200 rounded-lg focus:border-blue-300 focus:outline-none"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:border-blue-300 focus:outline-none"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                />
              </div>
            </div>

            {/* Preferred Times */}
            <div className="space-y-4">
              <h4 className="font-semibold">Preferred Times (up to 3 options)</h4>
              
              {[1, 2, 3].map((num) => (
                <div key={num} className="grid md:grid-cols-2 gap-4 p-4 border border-gray-200 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Option {num} - Date {num === 1 ? '*' : ''}
                    </label>
                    <input
                      type="date"
                      required={num === 1}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:border-blue-300 focus:outline-none"
                      value={formData[`preferred_date_${num}` as keyof typeof formData]}
                      onChange={(e) => updateFormData(`preferred_date_${num}`, e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Time {num === 1 ? '*' : ''}
                    </label>
                    <input
                      type="time"
                      required={num === 1}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:border-blue-300 focus:outline-none"
                      value={formData[`preferred_time_${num}` as keyof typeof formData]}
                      onChange={(e) => updateFormData(`preferred_time_${num}`, e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-medium mb-1">Additional Notes</label>
              <textarea
                rows={4}
                className="w-full p-3 border border-gray-200 rounded-lg focus:border-blue-300 focus:outline-none"
                placeholder="Any special requirements or additional information..."
                value={formData.notes}
                onChange={(e) => updateFormData('notes', e.target.value)}
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}