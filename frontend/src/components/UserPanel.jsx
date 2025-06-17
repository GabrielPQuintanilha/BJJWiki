import { useState, useEffect } from 'react';
import { excluirTecnicaEnviada, listarTecnicasEnviadas, aprovarTecnica } from '../services/posicoesService';

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
          const json = await listarTecnicasEnviadas();
          setTecnicasEnviadas(json);
        } catch (err) {
          console.error('Erro ao buscar técnicas enviadas:', err);
        }
    };

    carregarTecnicas();
  }, [mostrarPainelAdmin]);

  const handleAprovar = async (id) => {
    const confirmar = window.confirm('Deseja aprovar esta técnica?');
    if (!confirmar) return;

    try {
      await aprovarTecnica(id);
      setTecnicasEnviadas((prev) => prev.filter((tecnica) => tecnica.id !== id));
    } catch (error) {
      console.error('Erro ao aprovar técnica:', error);
      alert('Erro ao aprovar técnica.');
    }
  };

  const handleDelete = async (id) => {
    await excluirTecnicaEnviada(id, setTecnicasEnviadas);
  };

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
          <button type="button" onClick={deleteUser}>Deletar Conta</button>

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
                            <strong>{tecnica.nome}</strong> - {tecnica.finalidade} - {tecnica.posicao} 
                            <button 
                              onClick={() => handleDelete(tecnica.id)} 
                              className="botao-painel-admin"
                            >
                              Deletar
                            </button>
                            <button 
                              onClick={() => handleAprovar(tecnica.id)} 
                              className="botao-painel-admin"
                              style={{ marginLeft: '8px' }}
                            >
                              Aprovar
                            </button>
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
