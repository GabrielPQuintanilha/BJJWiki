const BASE_URL = 'http://localhost:3000';

export async function apiFetch(endpoint, options = {}) {
    const headers = {
        'Accept': 'application/json',
        ...(options.body && !(options.body instanceof FormData || options.body instanceof Blob)) ? { 'Content-Type': 'application/json' } : {},
        ...options.headers,
    };

    let bodyToSend = options.body;
    if (bodyToSend && typeof bodyToSend === 'object' && !(bodyToSend instanceof FormData || bodyToSend instanceof Blob)) {
        bodyToSend = JSON.stringify(bodyToSend);
    }

    const finalOptions = {
        ...options, 
        headers: headers,
        body: bodyToSend, 
    };

    try {
        const res = await fetch(`${BASE_URL}${endpoint}`, finalOptions);

        let data = null;
        const contentType = res.headers.get('content-type');

        if (res.status !== 204 && contentType && contentType.includes('application/json')) {
            try {
                data = await res.json(); 
            } catch (jsonParseError) {
                console.warn(`apiFetch: Erro ao parsear JSON para ${endpoint}. Status: ${res.status}. Erro:`, jsonParseError);
                try {
                    const rawText = await res.text();
                    console.warn(`apiFetch: Conteúdo bruto da resposta (falha JSON) para ${endpoint}:`, rawText);
                } catch (textError) {  }
            }
        } else if (res.status !== 204) {
            try {
                const rawText = await res.text();
                console.warn(`apiFetch: Resposta não JSON para ${endpoint}. Status: ${res.status}. Conteúdo:`, rawText);
            } catch (textError) { }
        }

        if (!res.ok) {
            const errorMessage = (data && data.message) || (data && typeof data === 'string' ? data : `Erro ${res.status}: Requisição falhou.`);
            const error = new Error(errorMessage);
            error.status = res.status;
            error.data = data; 
            throw error;
        }

        if (res.status === 204) {
            return null;
        }

        return data;

    } catch (err) {
        console.error('Erro no apiFetch:', err);
        throw err; 
    }
}