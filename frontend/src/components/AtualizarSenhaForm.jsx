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
    <div style={{ marginTop: '10px' }}>
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
    </div>
  );
}

export default AtualizarSenhaForm;