const BASE_URL = 'http://localhost:3000';

export async function apiFetch(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, options);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Erro de requisição');
  return data;
}
