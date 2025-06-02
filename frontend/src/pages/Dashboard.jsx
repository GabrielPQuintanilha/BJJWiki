import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [posicoes, setPosicoes] = useState([]); // <- Novo estado para as posições
  const [posicaoSelecionada, setPosicaoSelecionada] = useState(''); // <- Estado para posição escolhida
  const [sequencias, setSequencias] = useState([]);
  const navigate = useNavigate();

  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');

  const [mostrarFormSenha, setMostrarFormSenha] = useState(false);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [tentouLogar, setTentouLogar] = useState(false);

  const [mostrarCadastro, setMostrarCadastro] = useState(false);
  const [novoNome, setNovoNome] = useState('');
  const [senhaCadastro, setSenhaCadastro] = useState('');

  const [mostrarCriarTecnica, setMostrarCriarTecnica] = useState(false);

  const handleRegister = async () => {
    if (!name || !password) {
      alert('Por favor, preencha todos os campos');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Conta criada com sucesso! Agora faça login.');
        setMostrarCadastro(false);
        setNovoNome('');
        setSenhaCadastro('');
      } else {
        alert(data.message || 'Erro ao criar conta');
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao criar conta');
    }
  };

  const handleLogin = async () => {
    setTentouLogar(true);
    try {
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem('token', data.token);

        // Recarrega os dados do usuário
        const userRes = await fetch('http://localhost:3000/users/me', {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });
        const userData = await userRes.json();
        setUserData(userData);
        setError(null);
      } else {
        setError(data.message || 'Erro no login');
      }
    } catch (err) {
      console.error(err);
      setError('Erro ao tentar fazer login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const atualizarSenha = async () => {
    const token = localStorage.getItem('token');

    if (!senhaAtual || !novaSenha) {
      alert('Por favor, preencha os dois campos de senha');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/users/update-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword: senhaAtual, newPassword: novaSenha }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Senha atualizada com sucesso!');
        setSenhaAtual('');
        setNovaSenha('');
      } else {
        alert(data.message || 'Erro ao atualizar senha');
      }
    } catch (err) {
      alert('Erro ao atualizar senha');
      console.error(err);
    }
  };

  const deleteUser = () => {
    const confirmDelete = window.confirm(
      'Tem certeza que deseja apagar sua conta? Esta ação é irreversível.'
    );
    if (!confirmDelete) {
      return; // Usuário cancelou, não faz nada
    }

    const token = localStorage.getItem('token');

    fetch('http://localhost:3000/users/delete-account', {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao deletar conta');
        return res.json();
      })
      .then(() => {
        localStorage.removeItem('token');
        window.location.reload();
        //navigate('/');
      })
      .catch((err) => {
        console.error(err);
        setError('Erro ao deletar conta');
      });
  };

  useEffect(() => {
    // Obter o token JWT do localStorage ou cookies
    const token = localStorage.getItem('token'); // Ou pode ser document.cookie, dependendo de onde você armazena o token

    if (!token) {
      setError('Token não encontrado. Faça o login novamente.');
      return;
    }

    // Fazer a requisição para obter os dados do usuário
    fetch('http://localhost:3000/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUserData(data)) // Atualizar os dados do usuário no estado
      .catch((err) => {
        setError('Erro ao carregar dados do usuário');
        console.error(err);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/users/posicoes')
      .then((res) => res.json())
      .then((data) => setPosicoes(data))
      .catch((err) => {
        setError('Erro ao carregar posições');
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (posicaoSelecionada) {
      const posicaoId = parseInt(posicaoSelecionada, 10); // Garantir que seja um número
      fetch(`http://localhost:3000/users/conexoes/id/${posicaoId}`)
        .then((res) => res.json())
        .then((data) => setSequencias(data)) // Dados das sequências
        .catch((err) => {
          setError('Erro ao carregar sequências');
          console.error(err);
        });
    }
  }, [posicaoSelecionada]);

  return (
    <div>
      <h1 className="logo">Brazilian Jiujitsu Wiki</h1>

      {userData ? (
        <div className="div_user">
          <p>Usuario: {userData.name}</p>

          <button type="button" onClick={handleLogout}>
            Sair
          </button>
          <button onClick={deleteUser} type="button">
            Deletar a Conta
          </button>

          {!mostrarFormSenha ? (
            <button onClick={() => setMostrarFormSenha(true)} type="button">
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
              <button
                onClick={async () => {
                  await atualizarSenha();
                  setMostrarFormSenha(false); // Oculta o formulário após atualização
                }}
                type="button"
              >
                Confirmar Atualização
              </button>
              <button
                onClick={() => setMostrarFormSenha(false)}
                type="button"
                style={{ marginLeft: '10px' }}
              >
                Cancelar
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="div_user">
          <h3>Login</h3>
          <div className="div_login">    {/*o div_login e div_usar tinham tamanhos diferentes. o erro acontecia dentro de div login. Dessa forma com novo erro o div_user aumentava e levava o login (com seus inputs) junto*/}
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
        <label htmlFor="posicao">Selecione uma Técnica:</label>
        <select
          id="posicao"
          value={posicaoSelecionada}
          onChange={(e) => {
            setPosicaoSelecionada(e.target.value);
          }}
        >
          <option value="">-- Selecionar --</option>
          {posicoes.map((posicao) => (
            <option key={posicao.id} value={posicao.id}>
              {posicao.nome}
            </option>
          ))}
          <option value="enviar">ENVIAR UMA TÉCNICA</option>
        </select>

        {posicaoSelecionada === "enviar" && (
          <div className="div_posicaoSelecionada">
            {userData ? (
              <>
                <h3>Enviar uma Técnica</h3>
                {/* Aqui você pode incluir o formulário real */}
                <p>SCRUBELS</p>
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
                  <p>
                    <strong>Nome:</strong> {posicao.nome}
                  </p>
                  <p>
                    <strong>Posição:</strong> {posicao.posicao}
                  </p>
                  <p>
                    <strong>Finalidade:</strong> {posicao.finalidade}
                  </p>
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
