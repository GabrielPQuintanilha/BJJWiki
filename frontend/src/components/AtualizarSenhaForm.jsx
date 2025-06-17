import React from 'react';

function AtualizarSenhaForm({
  senhaAtual,
  setSenhaAtual,
  novaSenha,
  setNovaSenha,
  handleAtualizarSenha,
  setMostrarFormSenha,
}) {
  return (
    <div className="divAtualizarSenhaForm">
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
        Confirmar
      </button>
      <button
        type="button"
        onClick={() => setMostrarFormSenha(false)}
      >
        Cancelar
      </button>
    </div>
  );
}

export default AtualizarSenhaForm;