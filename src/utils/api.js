// Base44 API Helper
// Replace these with your actual Base44 API endpoint and key
const BASE44_API_ENDPOINT = 'YOUR_BASE44_API_ENDPOINT'; // e.g., https://your-app.base44.com/api/entities
const API_KEY = 'YOUR_BASE44_API_KEY';

const api = {
  list: async (entity, params = '') => {
    const response = await fetch(`${BASE44_API_ENDPOINT}/${entity}?${params}`, {
      headers: { 
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  },
  
  create: async (entity, data) => {
    const response = await fetch(`${BASE44_API_ENDPOINT}/${entity}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }
};

// Entity-specific API functions
export const Appointment = { 
  create: (data) => api.create('Appointment', data) 
};

export const AppointmentType = { 
  list: () => api.list('AppointmentType') 
};

export const AvailabilitySlot = { 
  list: (params) => api.list('AvailabilitySlot', params) 
};