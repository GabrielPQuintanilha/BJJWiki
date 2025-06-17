import React from 'react';
import AcoesUsuario from './AcoesUsuario';
import AtualizarSenhaForm from './AtualizarSenhaForm';
import PainelAdmin from './PainelAdmin';

function UsuarioLogado({
  userData,
  onLogout,
  deleteUser,
  mostrarFormSenha,
  setMostrarFormSenha,
  senhaAtual,
  setSenhaAtual,
  novaSenha,
  setNovaSenha,
  handleAtualizarSenha,
  mostrarPainelAdmin,
  setMostrarPainelAdmin,
  tecnicasEnviadas,
  handleDelete,
  handleAprovar,
}) {
  return (
    <>
      <AcoesUsuario
        nomeUsuario={userData.name}
        onLogout={onLogout}
        deleteUser={deleteUser}
        mostrarFormSenha={mostrarFormSenha}
        setMostrarFormSenha={setMostrarFormSenha}
      />

      {mostrarFormSenha && (
        <AtualizarSenhaForm
          senhaAtual={senhaAtual}
          setSenhaAtual={setSenhaAtual}
          novaSenha={novaSenha}
          setNovaSenha={setNovaSenha}
          handleAtualizarSenha={handleAtualizarSenha}
          setMostrarFormSenha={setMostrarFormSenha}
        />
      )}

      {userData.is_admin && (
        <PainelAdmin
          mostrarPainelAdmin={mostrarPainelAdmin}
          setMostrarPainelAdmin={setMostrarPainelAdmin}
          tecnicasEnviadas={tecnicasEnviadas}
          handleDelete={handleDelete}
          handleAprovar={handleAprovar}
        />
      )}
    </>
  );
}

export default UsuarioLogado;