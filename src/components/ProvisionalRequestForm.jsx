import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

export default function ProvisionalRequestForm({
  appointmentType,
  onSubmit,
  onCancel,
  loading
}) {
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
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const alternativeDates = [
      { date: formData.preferred_date_1, time: formData.preferred_time_1 },
      { date: formData.preferred_date_2, time: formData.preferred_time_2 },
      { date: formData.preferred_date_3, time: formData.preferred_time_3 }
    ].filter(alt => alt.date && alt.time);

    onSubmit({
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      },
      alternative_dates: alternativeDates,
      notes: formData.notes,
      is_custom_request: true
    });
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Request Custom Time</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancel}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Card className="bg-blue-50 border-blue-200 mb-6">
            <CardContent className="p-4">
              <p className="text-sm text-blue-800">
                <strong>Selected Service:</strong> {appointmentType?.name} 
                ({appointmentType?.duration_minutes} minutes • ${appointmentType?.price})
              </p>
            </CardContent>
          </Card>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Information */}
            <div className="space-y-4">
              <h4 className="font-semibold">Your Information</h4>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                />
              </div>
            </div>

            {/* Preferred Times */}
            <div className="space-y-4">
              <h4 className="font-semibold">Preferred Times (up to 3 options)</h4>
              
              {[1, 2, 3].map((num) => (
                <Card key={num} className="border border-gray-200">
                  <CardContent className="p-4">
                    <h5 className="font-medium mb-3">Option {num} {num === 1 ? '(Required)' : '(Optional)'}</h5>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`date_${num}`}>Date</Label>
                        <Input
                          id={`date_${num}`}
                          type="date"
                          required={num === 1}
                          min={new Date().toISOString().split('T')[0]}
                          value={formData[`preferred_date_${num}`]}
                          onChange={(e) => updateFormData(`preferred_date_${num}`, e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`time_${num}`}>Time</Label>
                        <Input
                          id={`time_${num}`}
                          type="time"
                          required={num === 1}
                          value={formData[`preferred_time_${num}`]}
                          onChange={(e) => updateFormData(`preferred_time_${num}`, e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Notes */}
            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                rows={4}
                placeholder="Any special requirements or additional information..."
                value={formData.notes}
                onChange={(e) => updateFormData('notes', e.target.value)}
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Request'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}