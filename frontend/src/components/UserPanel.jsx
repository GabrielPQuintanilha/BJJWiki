import { useState } from 'react';

import {
  excluirTecnicaEnviada,
  listarTecnicasEnviadas,
  aprovarTecnica,
} from '../services/posicoesService';

import LoginRegisterForm from './LoginRegisterForm';
import UsuarioLogado from './UsuarioLogado';
import usePainelAdmin from '../hooks/usePainelAdmin';

function UserPanel({
  userData,
  error,
  onLogin,
  onLogout,
  onRegister,
  atualizarSenha,
  deleteUser,
   carregarPosicoes,
}) {
  const [mostrarFormSenha, setMostrarFormSenha] = useState(false);
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [mostrarPainelAdmin, setMostrarPainelAdmin] = useState(false);

  const [tecnicasEnviadas, setTecnicasEnviadas] = usePainelAdmin(mostrarPainelAdmin);

  const handleAprovar = async (id) => {
    const confirmar = window.confirm('Deseja aprovar esta técnica?');
    if (!confirmar) return;

    try {
      await aprovarTecnica(id);
      setTecnicasEnviadas((prev) => prev.filter((tecnica) => tecnica.id !== id));
      if (carregarPosicoes) {
        carregarPosicoes();  // Recarrega a lista de técnicas no Dashboard
      }
    } catch (error) {
      console.error('Erro ao aprovar técnica:', error);
      alert('Erro ao aprovar técnica.');
    }
  };

  const handleDelete = async (id) => {
    await excluirTecnicaEnviada(id, setTecnicasEnviadas);
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
        <UsuarioLogado
          userData={userData}
          onLogout={onLogout}
          deleteUser={deleteUser}
          mostrarFormSenha={mostrarFormSenha}
          setMostrarFormSenha={setMostrarFormSenha}
          senhaAtual={senhaAtual}
          setSenhaAtual={setSenhaAtual}
          novaSenha={novaSenha}
          setNovaSenha={setNovaSenha}
          handleAtualizarSenha={handleAtualizarSenha}
          mostrarPainelAdmin={mostrarPainelAdmin}
          setMostrarPainelAdmin={setMostrarPainelAdmin}
          tecnicasEnviadas={tecnicasEnviadas}
          handleDelete={handleDelete}
          handleAprovar={handleAprovar}
        />
      ) : (
        <LoginRegisterForm 
          onLogin={onLogin} 
          onRegister={onRegister} 
          error={error} 
        />
      )}
    </div>
  );
}

export default UserPanel;
