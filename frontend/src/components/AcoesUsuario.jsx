import React from 'react';

function AcoesUsuario({
  nomeUsuario,
  onLogout,
  deleteUser,
  mostrarFormSenha,
  setMostrarFormSenha,
}) {
  return (
    <>
      <p>Olá, {nomeUsuario}</p>

      <button type="button" onClick={onLogout}>Sair</button>
      <button type="button" onClick={deleteUser}>Deletar Conta</button>

      {!mostrarFormSenha ? (
        <button type="button" onClick={() => setMostrarFormSenha(true)}>
          Atualizar Senha
        </button>
      ) : null}
    </>
  );
}

export default AcoesUsuario;