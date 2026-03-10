//const API_BASE_URL = 'http://localhost:3000/api';
//const API_BASE_URL = 'https://bitter-zebras-think.loca.lt/api';
const API_BASE_URL = 'https://backend-volper.onrender.com/api';

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
