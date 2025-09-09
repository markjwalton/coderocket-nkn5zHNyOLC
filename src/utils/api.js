// Base44 API Helper - Updated with all entity field mappings
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
  list: (params) => api.list('Appointment', params),
  update: (id, data) => api.update('Appointment', id, data)
};

export const AppointmentType = { 
  list: (params) => api.list('AppointmentType', params),
  update: (id, data) => api.update('AppointmentType', id, data)
};

export const AvailabilitySlot = { 
  list: (params) => api.list('AvailabilitySlot', params),
  update: (id, data) => api.update('AvailabilitySlot', id, data)
};

// Helper function to build query parameters for Appointment
// Filterable fields: customer_name, customer_email, customer_phone, customer_address, appointment_type, appointment_date, appointment_time, duration_minutes, status, assigned_specialist, notes, customer_notes, verification_code, is_verified, google_event_id, cancellation_reason, additional_requested_dates
export const buildAppointmentQuery = (filters = {}) => {
  const params = new URLSearchParams();
  
  if (filters.customer_name) params.append('customer_name', filters.customer_name);
  if (filters.customer_email) params.append('customer_email', filters.customer_email);
  if (filters.customer_phone) params.append('customer_phone', filters.customer_phone);
  if (filters.customer_address) params.append('customer_address', filters.customer_address);
  if (filters.appointment_type) params.append('appointment_type', filters.appointment_type);
  if (filters.appointment_date) params.append('appointment_date', filters.appointment_date);
  if (filters.appointment_time) params.append('appointment_time', filters.appointment_time);
  if (filters.duration_minutes) params.append('duration_minutes', filters.duration_minutes);
  if (filters.status) params.append('status', filters.status);
  if (filters.assigned_specialist) params.append('assigned_specialist', filters.assigned_specialist);
  if (filters.notes) params.append('notes', filters.notes);
  if (filters.customer_notes) params.append('customer_notes', filters.customer_notes);
  if (filters.verification_code) params.append('verification_code', filters.verification_code);
  if (filters.is_verified !== undefined) params.append('is_verified', filters.is_verified);
  if (filters.google_event_id) params.append('google_event_id', filters.google_event_id);
  if (filters.cancellation_reason) params.append('cancellation_reason', filters.cancellation_reason);
  if (filters.additional_requested_dates) params.append('additional_requested_dates', filters.additional_requested_dates);
  
  return params.toString();
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