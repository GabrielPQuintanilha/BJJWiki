// funcao que vai "buscar" info do front e enviar p backend
export async function loginUser(credentials) {
    const res = await fetch('http://localhost:3000/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
  
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Erro no login');
  
    return data;
  }

export async function registerUser(credentials) {
  const res = await fetch('http://localhost:3000/users/register', {  // Alterei o endpoint para 'auth/register', conforme sua estrutura
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Erro no registro');

  return data;
}