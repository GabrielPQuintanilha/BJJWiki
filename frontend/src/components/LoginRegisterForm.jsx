import { useState } from 'react';
import { validarNomeUsuario, validarSenha } from '../shared/userValidation';


export default function LoginRegisterForm({ onLogin, onRegister, error }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [tentouLogar, setTentouLogar] = useState(false);

  const handleLoginClick = async () => {
    setTentouLogar(true);
    await onLogin(name, password);
  };

  const handleRegisterClick = async () => {
    if (!validarNomeUsuario(name)) {
      alert('Nome de usuário inválido: deve ter de 5 a 20 caracteres, sem espaços.');
      return;
    }
    if (!validarSenha(password)) {
      alert('Senha inválida: mínimo 8 caracteres e sem espaços.');
      return;
    }
    await onRegister(name, password);
  };

  return (
    <>
      <h3>Login</h3>
      <div className="div_login">
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleLoginClick}>Entrar</button>
        <button onClick={handleRegisterClick}>Criar Conta</button>
      </div>
      {tentouLogar && error && <p>{error}</p>}
    </>
  );
}