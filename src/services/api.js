export class APIError extends Error {
    constructor(message, status, errors = null) {
        super(message);
        this.name = 'APIError';
        this.status = status;
        this.errors = errors;
    }
}

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:8000';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export const getCsrfCookie = async () => {
    await fetch(`${SERVER_URL}/sanctum/csrf-cookie`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
        credentials: "include",
    });
};

export const fetchAPI = async (endpoint, options = {}) => {
    const isFormData = options.body instanceof FormData;

    const csrfToken = getCookie('XSRF-TOKEN');
    const method = options.method || 'GET';

    const headers = {
        'Accept': 'application/json',
        ...(csrfToken && { 'X-XSRF-TOKEN': decodeURIComponent(csrfToken) }),
        ...options.headers,
    };

    if (!isFormData && !headers['Content-Type']) {
        headers['Content-Type'] = 'application/json';
    }

    let formattedBody = options.body;
    if (options.body && !isFormData && typeof options.body === 'object') {
        formattedBody = JSON.stringify(options.body);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        method,
        headers,
        body: formattedBody,
        credentials: 'include',
    });

    if (response.status === 204) {
        return null;
    }

    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    const data = isJson ? await response.json() : null;

    if (!response.ok) {
        if (response.status === 401) {
            localStorage.removeItem('user');

            if (!window.location.pathname.startsWith('/login')) {
                window.location.href = '/login';
            }

            throw new APIError('Sesi kamu telah berakhir. Silakan login kembali.', 401);
        }

        const errorMessage = data?.message || `Terjadi kesalahan server (${response.status})`;
        const validationErrors = response.status === 422
            ? (data?.errors || data || null)
            : (data?.errors || null);

        throw new APIError(errorMessage, response.status, validationErrors);
    }

    return data;
};

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}
