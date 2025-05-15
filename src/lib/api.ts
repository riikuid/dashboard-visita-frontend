export const API_BASE = import.meta.env.VITE_BACKEND_SERVER

export const API = {
  LOGIN: `${API_BASE}/auth/login`,
  REGISTER: `${API_BASE}/auth/register`,
  ACCESS_CONTROL: `${API_BASE}/access-control`,
  ACCESS_CONTROL_CONNECTION: `${API_BASE}/access-control/connection`,
  COMPANY: `${API_BASE}/company`,
  DEPARTMENT: `${API_BASE}/department`,
  LOG_ACCESS: `${API_BASE}/log-access`,
  PERMISSION_CARD: `${API_BASE}/permission-card`,
  PERMISSION: `${API_BASE}/permission`,
  PERSON: `${API_BASE}/person`,
  PERMISSION_QR: `${API_BASE}/permission-qr`,
  RFID: `${API_BASE}/rfid`,
  TICKET: `${API_BASE}/ticket`,
  USER: `${API_BASE}/user`,
  VISITOR: `${API_BASE}/visitor`,
}

export const HEADER = {
  JSON_HEADER: { 'Content-Type': 'application/json' },
  AUTH_HEADER: (token: any) => ({
    Authorization: `Bearer ${token}`,
  }),
}
