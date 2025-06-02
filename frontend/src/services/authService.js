export const login = async (name, password) => {
  const res = await fetch('http://localhost:3000/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, password }),
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Erro no login');
  }

  return {
    token: data.token,
    user: data.user,
  };
};

export const fetchUserData = async (token) => {
  const res = await fetch('http://localhost:3000/users/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  const userData = await res.json();
  return userData;
};

export async function updatePassword(currentPassword, newPassword, token) {
  if (!currentPassword || !newPassword) {
    throw new Error('Por favor, preencha os dois campos de senha');
  }

  const response = await fetch('http://localhost:3000/users/update-password', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ currentPassword, newPassword }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Erro ao atualizar senha');
  }

  return data;
}

export async function register(name, password) {
  if (!name || !password) {
    throw new Error('Por favor, preencha todos os campos');
  }

  const response = await fetch('http://localhost:3000/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Erro ao criar conta');
  }

  return data;
}

export async function deleteUserAccount(token) {
  const response = await fetch('http://localhost:3000/users/delete-account', {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao deletar conta');
  }

  return await response.json();
}

