function TecnicasSelector({
  userData,
  posicoes,
  posicaoSelecionada,
  setPosicaoSelecionada,
  sequencias,
}) {
  return (
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
        {userData && (
          <option value="enviar">ENVIAR UMA TÉCNICA</option>
        )}
      </select>

      {posicaoSelecionada === 'enviar' && (
        <div className="div_posicaoSelecionada">
          {userData ? (
            <>
              <h3>Enviar uma Técnica</h3>
              {/* INCLUIR FORMULARIO */}
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
  );
}

export default TecnicasSelector;
