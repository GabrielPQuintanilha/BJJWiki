import React from 'react';

function PainelAdmin({ 
  mostrarPainelAdmin, 
  setMostrarPainelAdmin, 
  tecnicasEnviadas, 
  handleDelete, 
  handleAprovar 
}) {
  return (
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
  );
}

export default PainelAdmin;