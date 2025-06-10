// UserPanel.jsx
import { useState, useEffect } from 'react';
import { listarTecnicasEnviadas } from '../services/posicoesService';

function UserPanel({
  userData,
  error,
  onLogin,
  onLogout,
  onRegister,
  atualizarSenha,
  deleteUser,
}) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [tentouLogar, setTentouLogar] = useState(false);

  const [mostrarFormSenha, setMostrarFormSenha] = useState(false);
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');

  const [mostrarPainelAdmin, setMostrarPainelAdmin] = useState(false);
  const [tecnicasEnviadas, setTecnicasEnviadas] = useState([]);

  useEffect(() => {
    const carregarTecnicas = async () => {
      if (!mostrarPainelAdmin) return;

        try {
          // console.log("Iniciando listarTecnicasEnviadas")
          const json = await listarTecnicasEnviadas();
          console.log("Constante json criada")
          setTecnicasEnviadas(json);
          console.log("Iniciando setTecnicasEnviadas")
        } catch (err) {
          console.error('Erro ao buscar técnicas enviadas:', err);
        }
    };

    carregarTecnicas();
  }, [mostrarPainelAdmin]);

  const handleLoginClick = async () => {
    setTentouLogar(true);
    await onLogin(name, password);
  };

  const handleRegisterClick = async () => {
    await onRegister(name, password);
  };

  const handleAtualizarSenha = async () => {
    await atualizarSenha(senhaAtual, novaSenha);
    setSenhaAtual('');
    setNovaSenha('');
    setMostrarFormSenha(false);
  };

  return (
    <div className="div_user">
      {userData ? (
        <>
          <p>Usuário: {userData.name}</p>

          <button type="button" onClick={onLogout}>Sair</button>
          <button type="button" onClick={deleteUser}>Deletar a Conta</button>

          {!mostrarFormSenha ? (
            <button type="button" onClick={() => setMostrarFormSenha(true)}>
              Atualizar Senha
            </button>
          ) : (
            <>
              <input
                type="password"
                placeholder="Senha atual"
                value={senhaAtual}
                onChange={(e) => setSenhaAtual(e.target.value)}
                style={{ display: 'block', marginBottom: '10px' }}
              />
              <input
                type="password"
                placeholder="Nova senha"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                style={{ display: 'block', marginBottom: '10px' }}
              />
              <button type="button" onClick={handleAtualizarSenha}>
                Confirmar Atualização
              </button>
              <button
                type="button"
                onClick={() => setMostrarFormSenha(false)}
                style={{ marginLeft: '10px' }}
              >
                Cancelar
              </button>
            </>
          )}

          {userData.is_admin && (
            <div className="admin-area">
              <button
                className="admin-button"
                onClick={() => setMostrarPainelAdmin(!mostrarPainelAdmin)}
              >
                {mostrarPainelAdmin ? 'Fechar Controle' : 'Abrir Controle'}
              </button>

              {mostrarPainelAdmin && (
                  <div className="painel-admin">
                    <h2>Técnicas Enviadas</h2>
                    {tecnicasEnviadas.length === 0 ? (
                      <p>Nenhuma técnica enviada.</p>
                    ) : (
                      <ul>
                        {tecnicasEnviadas.map((tecnica) => (
                          <li key={tecnica.id}>
                            <strong>{tecnica.nome}</strong> - {tecnica.finalidade}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

            </div>
          )}
        </>
      ) : (
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
      )}
    </div>
  );
}

export default UserPanel;
