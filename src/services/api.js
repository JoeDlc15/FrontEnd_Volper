const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
// agregando url para que funcione en render

export const getProducts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/productos`, {
            headers: {
                'vscode-browser-req': 'true',
                'Bypass-Tunnel-Reminder': 'true',
                'ngrok-skip-browser-warning': '69420'
            }
        });
        if (!response.ok) throw new Error('Error al obtener productos');
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        return [];
    }
};

export const getProductById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/productos/${id}`, {
            headers: {
                'vscode-browser-req': 'true',
                'Bypass-Tunnel-Reminder': 'true',
                'ngrok-skip-browser-warning': '69420'
            }
        });
        if (!response.ok) throw new Error('Error al obtener el producto');
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        return null;
    }
};

export const createQuote = async (quoteData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/cotizaciones`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Bypass-Tunnel-Reminder': 'true'
            },
            body: JSON.stringify(quoteData)
        });
        if (!response.ok) throw new Error('Error al enviar la cotización');
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        return null;
    }
};

export const registerProductView = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/productos/${id}/view`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Bypass-Tunnel-Reminder': 'true',
                'ngrok-skip-browser-warning': '69420'
            }
        });
        if (!response.ok) throw new Error('Error al registrar vista');
        return await response.json();
    } catch (error) {
        console.error('API Error (view):', error);
        return null;
    }
};

export const getAdminQuotations = async () => {
    try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${API_BASE_URL}/admin/cotizaciones`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'vscode-browser-req': 'true',
                'Bypass-Tunnel-Reminder': 'true'
            }
        });
        if (!response.ok) throw new Error('Error al obtener cotizaciones');
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        return [];
    }
};

export const getAdminQuotationById = async (id) => {
    try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${API_BASE_URL}/admin/cotizaciones/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'vscode-browser-req': 'true',
                'Bypass-Tunnel-Reminder': 'true'
            }
        });
        if (!response.ok) throw new Error('Error al obtener la cotización');
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        return null;
    }
};

// --- CUSTOMER API ---

export const updateCustomerProfile = async (formData) => {
    try {
        const token = localStorage.getItem('customerToken');
        const response = await fetch(`${API_BASE_URL}/customer/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Bypass-Tunnel-Reminder': 'true'
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Error al actualizar perfil');
        return data;
    } catch (error) {
        console.error('API Error (Profile):', error);
        throw error;
    }
};

export const getCustomerQuotes = async () => {
    try {
        const token = localStorage.getItem('customerToken');
        const response = await fetch(`${API_BASE_URL}/customer/quotes`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Bypass-Tunnel-Reminder': 'true'
            }
        });
        if (!response.ok) throw new Error('Error al obtener cotizaciones');
        return await response.json();
    } catch (error) {
        console.error('API Error (Quotes):', error);
        return [];
    }
};

export const updateQuoteItems = async (quoteId, items) => {
    const token = localStorage.getItem('customerToken');
    const response = await fetch(`${API_BASE_URL}/customer/quotes/${quoteId}/items`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Bypass-Tunnel-Reminder': 'true'
        },
        body: JSON.stringify({ items })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Error al actualizar ítems');
    return data;
};

export const cancelQuote = async (quoteId) => {
    const token = localStorage.getItem('customerToken');
    const response = await fetch(`${API_BASE_URL}/customer/quotes/${quoteId}/cancel`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Bypass-Tunnel-Reminder': 'true'
        }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Error al cancelar cotización');
    return data;
};

export const duplicateQuote = async (quoteId) => {
    const token = localStorage.getItem('customerToken');
    const response = await fetch(`${API_BASE_URL}/customer/quotes/${quoteId}/duplicate`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Bypass-Tunnel-Reminder': 'true'
        }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Error al re-cotizar');
    return data;
};

export const forgotPassword = async (email) => {
    try {
        const response = await fetch(`${API_BASE_URL}/customer/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Bypass-Tunnel-Reminder': 'true'
            },
            body: JSON.stringify({ email })
        });
        return await response.json();
    } catch (error) {
        console.error('API Error (Forgot):', error);
        return { error: 'Error de conexión' };
    }
};

export const resetPassword = async (token, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/customer/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Bypass-Tunnel-Reminder': 'true'
            },
            body: JSON.stringify({ token, password })
        });
        return await response.json();
    } catch (error) {
        console.error('API Error (Reset):', error);
        return { error: 'Error de conexión' };
    }
};
export const getFavorites = async () => {
    try {
        const token = localStorage.getItem('customerToken');
        if (!token) return [];
        const response = await fetch(`${API_BASE_URL}/favorites`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Bypass-Tunnel-Reminder': 'true'
            }
        });
        if (!response.ok) return [];
        return await response.json();
    } catch (error) {
        console.error('API Error (getFavorites):', error);
        return [];
    }
};

export const toggleFavorite = async (productId) => {
    try {
        const token = localStorage.getItem('customerToken');
        if (!token) return null;
        const response = await fetch(`${API_BASE_URL}/favorites/toggle`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Bypass-Tunnel-Reminder': 'true'
            },
            body: JSON.stringify({ productId })
        });
        return await response.json();
    } catch (error) {
        console.error('API Error (toggleFavorite):', error);
        return null;
    }
};

export const syncFavorites = async (productIds) => {
    try {
        const token = localStorage.getItem('customerToken');
        if (!token) return [];
        const response = await fetch(`${API_BASE_URL}/favorites/sync`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Bypass-Tunnel-Reminder': 'true'
            },
            body: JSON.stringify({ productIds })
        });
        if (!response.ok) return [];
        return await response.json();
    } catch (error) {
        console.error('API Error (syncFavorites):', error);
        return [];
    }
};
