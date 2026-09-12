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
    const token = localStorage.getItem('token');

    const headers = {
        'Accept': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
    };

    if (!isFormData && !headers['Content-Type']) {
        headers['Content-Type'] = 'application/json';
    }

    let formattedBody = options.body;
    if (options.body && !isFormData && typeof options.body === 'object') {
        formattedBody = JSON.stringify(options.body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
        body: formattedBody,
    });

    if (response.status === 204) {
        return null;
    }

    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    const data = isJson ? await response.json() : null;

    if (!response.ok) {
        const errorMessage = data?.message || `Terjadi kesalahan server (${response.status})`;

        const validationErrors = response.status === 422
            ? (data?.errors || data || null)
            : (data?.errors || null);

        throw new APIError(errorMessage, response.status, validationErrors);
    }

    return data;
};