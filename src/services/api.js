// Custom Error khusus untuk menampung status code & validation errors
export class APIError extends Error {
    constructor(message, status, errors = null) {
        super(message);
        this.name = 'APIError';
        this.status = status;
        this.errors = errors; // Tempat menampung error validasi Laravel (422)
    }
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export const fetchAPI = async (endpoint, options = {}) => {
    const isFormData = options.body instanceof FormData;

    const headers = {
        'Accept': 'application/json',
        ...options.headers,
    };

    if (!isFormData && !headers['Content-Type']) {
        headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (response.status === 204) {
        return null;
    }

    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    const data = isJson ? await response.json() : null;

    if (!response.ok) {
        const errorMessage = data?.message || `Terjadi kesalahan server (${response.status})`;
        const validationErrors = data?.errors || null;

        throw new APIError(errorMessage, response.status, validationErrors);
    }

    return data;
};