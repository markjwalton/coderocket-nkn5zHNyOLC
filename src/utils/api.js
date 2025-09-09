// Base44 API Helper - Updated with real endpoints and field mappings
const BASE44_API_ENDPOINT = 'https://app.base44.com/api/apps/68a168f4718247f95ed61cd8/entities';
const API_KEY = '482e914d8fe845f7a6b0438a1428f8ca';

const api = {
  list: async (entity, params = '') => {
    const url = params ? `${BASE44_API_ENDPOINT}/${entity}?${params}` : `${BASE44_API_ENDPOINT}/${entity}`;
    console.log('API Request:', url);
    
    const response = await fetch(url, {
      headers: { 
        'api_key': API_KEY,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('API Response:', data);
    return data;
  },
  
  create: async (entity, data) => {
    console.log('Creating entity:', entity, data);
    
    const response = await fetch(`${BASE44_API_ENDPOINT}/${entity}`, {
      method: 'POST',
      headers: {
        'api_key': API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json();
    console.log('Create response:', result);
    return result;
  },
  
  update: async (entity, entityId, data) => {
    console.log('Updating entity:', entity, entityId, data);
    
    const response = await fetch(`${BASE44_API_ENDPOINT}/${entity}/${entityId}`, {
      method: 'PUT',
      headers: {
        'api_key': API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json();
    console.log('Update response:', result);
    return result;
  }
};

// Entity-specific API functions
export const Appointment = { 
  create: (data) => api.create('Appointment', data),
  list: (params) => api.list('Appointment', params)
};

export const AppointmentType = { 
  list: (params) => api.list('AppointmentType', params),
  update: (id, data) => api.update('AppointmentType', id, data)
};

export const AvailabilitySlot = { 
  list: (params) => api.list('AvailabilitySlot', params),
  update: (id, data) => api.update('AvailabilitySlot', id, data)
};

// Helper function to build query parameters for AppointmentType
// Filterable fields: name, description, duration_minutes, price, colour, requires_verification, is_active, advance_booking_days
export const buildAppointmentTypeQuery = (filters = {}) => {
  const params = new URLSearchParams();
  
  if (filters.name) params.append('name', filters.name);
  if (filters.description) params.append('description', filters.description);
  if (filters.duration_minutes) params.append('duration_minutes', filters.duration_minutes);
  if (filters.price) params.append('price', filters.price);
  if (filters.colour) params.append('colour', filters.colour);
  if (filters.requires_verification !== undefined) params.append('requires_verification', filters.requires_verification);
  if (filters.is_active !== undefined) params.append('is_active', filters.is_active);
  if (filters.advance_booking_days) params.append('advance_booking_days', filters.advance_booking_days);
  
  return params.toString();
};

// Helper function to build query parameters for AvailabilitySlot
// Filterable fields: specialist_email, day_of_week, start_time, end_time, is_active, appointment_types
export const buildAvailabilityQuery = (filters = {}) => {
  const params = new URLSearchParams();
  
  if (filters.specialist_email) params.append('specialist_email', filters.specialist_email);
  if (filters.day_of_week !== undefined) params.append('day_of_week', filters.day_of_week);
  if (filters.start_time) params.append('start_time', filters.start_time);
  if (filters.end_time) params.append('end_time', filters.end_time);
  if (filters.is_active !== undefined) params.append('is_active', filters.is_active);
  if (filters.appointment_types) params.append('appointment_types', filters.appointment_types);
  
  return params.toString();
};