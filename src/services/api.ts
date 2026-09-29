// Base API service with simulated network delays, filtering, and backend pluggability

const SIMULATE_LATENCY_MS = 250;

export async function simulateNetworkDelay<T>(data: T, delay = SIMULATE_LATENCY_MS): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
}

export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';

export class ApiError extends Error {
  status: number;
  constructor(message: string, status = 500) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}
