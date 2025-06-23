import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import UserPanel from '../components/UserPanel';
import TecnicasSelector from '../components/TecnicasSelector';
import { enviarTecnica } from '../services/posicoesService';
import * as posicoesService from '../services/posicoesService';


import {
  login,
  register,
  getUserProfile,
  changePassword,
  deleteUserAccount,
} from '../services/authService';

import {
  getAllPosicoes,
  fetchConexoesByPosicao,
} from '../services/posicoesService';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const [posicoes, setPosicoes] = useState([]);
  const [posicaoSelecionada, setPosicaoSelecionada] = useState('');
  const [sequencias, setSequencias] = useState([]);

  const navigate = useNavigate();

  const handleRegister = async (name, password) => {
    try {
      await register(name, password);
      alert('Conta criada com sucesso! Agora faça login.');
    } catch (err) {
      alert(err.message);
      console.error(err);
    }
  };

  const handleLogin = async (name, password) => {
    try {
      const { token } = await login(name, password);
      localStorage.setItem('token', token);
      const user = await getUserProfile(token);
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

  const atualizarSenha = async (senhaAtual, novaSenha) => {
    try {
      const token = localStorage.getItem('token');
      await changePassword(senhaAtual, novaSenha, token);
      alert('Senha atualizada com sucesso!');
    } catch (err) {
      alert(err.message);
      console.error(err);
    }
  };

  async function handleEnviar(dados) {
    try {
      const resposta = await enviarTecnica(dados);
      alert('Técnica enviada com sucesso!');
    } catch (error) {
      alert(error.message);
    }
  }

  const handleDeleteTecnica = async (id) => {
    try {
      await posicoesService.deletarTecnica(id);
      setPosicoes((prev) => prev.filter((p) => p.id !== id));
      setPosicaoSelecionada(''); // opcional, se quiser "limpar" a seleção
    } catch (err) {
      alert('Erro ao deletar técnica');
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

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Token não encontrado. Faça o login novamente.');
      return;
    }
    getUserProfile(token)
      .then(setUserData)
      .catch(err => {
        setError(err.message);
        console.error(err);
      });
  }, []);

  useEffect(() => {
    getAllPosicoes()
      .then(setPosicoes)
      .catch(err => {
        setError('Erro ao carregar posições');
        console.error(err);
      });
  }, []);

  // Buscar conexões/progressões quando muda a posição selecionada
 useEffect(() => {
    if (!posicaoSelecionada || posicaoSelecionada === 'enviar') {
      setSequencias([]); 
      return;
    }

    const posicaoId = parseInt(posicaoSelecionada, 10);
    if (isNaN(posicaoId)) {
      setError('ID da posição inválido');
      return;
    }

    fetchConexoesByPosicao(posicaoId)
      .then(setSequencias)
      .catch(err => {
        setError('Erro ao carregar sequências');
        console.error(err);
      });
  }, [posicaoSelecionada]);

  return (
    <div>
      <h1 className="logo">Brazilian Jiujitsu Wiki</h1>

      <UserPanel
        userData={userData}
        error={error}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onRegister={handleRegister}
        atualizarSenha={atualizarSenha}
        deleteUser={deleteUser}
      />

      <TecnicasSelector
        userData={userData}
        userName={userData?.nome}
        posicoes={posicoes}
        posicaoSelecionada={posicaoSelecionada}
        setPosicaoSelecionada={setPosicaoSelecionada}
        sequencias={sequencias}
        onDelete={handleDeleteTecnica}
      />

    </div>
  );
}

export default Dashboard;
