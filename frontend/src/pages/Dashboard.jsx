import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  login,
  register,
  fetchUserData,
  updatePassword,
  deleteUserAccount,
} from '../services/authService';
import {
  fetchPosicoes,
  fetchConexoesPorPosicao,
} from '../services/posicoesService';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [tentouLogar, setTentouLogar] = useState(false);

  const [mostrarCadastro, setMostrarCadastro] = useState(false);
  const [novoNome, setNovoNome] = useState('');
  const [senhaCadastro, setSenhaCadastro] = useState('');

  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [mostrarFormSenha, setMostrarFormSenha] = useState(false);

  const [mostrarCriarTecnica, setMostrarCriarTecnica] = useState(false);
  const [posicoes, setPosicoes] = useState([]);
  const [posicaoSelecionada, setPosicaoSelecionada] = useState('');
  const [sequencias, setSequencias] = useState([]);

  const navigate = useNavigate();

  // Handlers
  const handleRegister = async () => {
    try {
      await register(name, password);
      alert('Conta criada com sucesso! Agora faça login.');
      setMostrarCadastro(false);
      setNovoNome('');
      setSenhaCadastro('');
    } catch (err) {
      alert(err.message);
      console.error(err);
    }
  };

  const handleLogin = async () => {
    setTentouLogar(true);
    try {
      const { token } = await login(name, password);
      localStorage.setItem('token', token);

      const user = await fetchUserData(token);
      setUserData(user);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const atualizarSenha = async () => {
    try {
      const token = localStorage.getItem('token');
      await updatePassword(senhaAtual, novaSenha, token);

      alert('Senha atualizada com sucesso!');
      setSenhaAtual('');
      setNovaSenha('');
    } catch (err) {
      alert(err.message);
      console.error(err);
    }
  };

  const deleteUser = async () => {
    const confirmDelete = window.confirm(
      'Tem certeza que deseja apagar sua conta? Esta ação é irreversível.'
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      await deleteUserAccount(token);
      localStorage.removeItem('token');
      window.location.reload();
    } catch (err) {
      console.error(err);
      setError('Erro ao deletar conta');
    }
  };

  // Effects
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Token não encontrado. Faça o login novamente.');
      return;
    }

    fetchUserData(token)
      .then(setUserData)
      .catch(err => {
        setError(err.message);
        console.error(err);
      });
  }, []);

  useEffect(() => {
    fetchPosicoes()
      .then(setPosicoes)
      .catch(err => {
        setError('Erro ao carregar posições');
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (posicaoSelecionada) {
      const posicaoId = parseInt(posicaoSelecionada, 10);
      fetchConexoesPorPosicao(posicaoId)
        .then(setSequencias)
        .catch(err => {
          setError('Erro ao carregar sequências');
          console.error(err);
        });
    }
  }, [posicaoSelecionada]);

  useEffect(() => {
    console.log('userData:', userData);
  }, [userData]);

  // Render
  return (
    <div>
      <h1 className="logo">Brazilian Jiujitsu Wiki</h1>

      {userData ? (
        <div className="div_user">
          <p>Usuário: {userData.name}</p>

          <button type="button" onClick={handleLogout}>Sair</button>
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
              <button type="button" onClick={async () => {
                await atualizarSenha();
                setMostrarFormSenha(false);
              }}>
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
          <div className="admin-area" style={{ marginTop: '20px', padding: '10px', border: '1px solid red' }}>
            <h2>Área do Administrador</h2>
            <p>Aqui você pode colocar controles exclusivos para admins.</p>
          </div>
        )}

        </div>
      ) : (
        <div className="div_user">
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
            <button onClick={handleLogin}>Entrar</button>
            <button onClick={handleRegister}>Criar Conta</button>
          </div>
          {tentouLogar && error && <p>{error}</p>}
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <label htmlFor="posicao">Selecione uma Técnica: </label>
        <select
          id="posicao"
          value={posicaoSelecionada}
          onChange={(e) => setPosicaoSelecionada(e.target.value)}
        >
          <option value="">-- Selecionar --</option>
          {posicoes.map((posicao) => (
            <option key={posicao.id} value={posicao.id}>
              {posicao.nome}
            </option>
          ))}
          <option value="enviar">ENVIAR UMA TÉCNICA</option>
        </select>

        {posicaoSelecionada === 'enviar' && (
          <div className="div_posicaoSelecionada">
            {userData ? (
              <>
                <h3>Enviar uma Técnica</h3>
                {/* INCLUIR FORMULARIO*/}
                <p>INCLUIR FORMULARIO</p>
              </>
            ) : (
              <p>Você precisa estar logado para enviar novas técnicas.</p>
            )}
          </div>
        )}

        {posicaoSelecionada && posicaoSelecionada !== 'enviar' && (
          <div className="div_posicaoSelecionada" style={{ marginTop: '10px' }}>
            <h3>Informações:</h3>
            {posicoes
              .filter((posicao) => posicao.id === parseInt(posicaoSelecionada))
              .map((posicao) => (
                <div key={posicao.nome}>
                  <p><strong>Nome:</strong> {posicao.nome}</p>
                  <p><strong>Posição:</strong> {posicao.posicao}</p>
                  <p><strong>Finalidade:</strong> {posicao.finalidade}</p>
                </div>
              ))}

            <div>
              <h3>Progressão:</h3>
              <div className="div_progressao">
                {sequencias.length > 0 ? (
                  sequencias.map((seq) => (
                    <div key={seq.id} style={{ marginBottom: '8px' }}>
                      <button onClick={() => setPosicaoSelecionada(seq.id)}>
                        {seq.nome} {seq.descricao}
                      </button>
                    </div>
                  ))
                ) : (
                  <p>Sem progressões disponíveis</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
