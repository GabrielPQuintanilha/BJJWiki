import { useState } from 'react';
import EnviarTecnicaForm from './EnviarTecnicaForm';

function TecnicasSelector({
  userData,
  posicoes,
  posicaoSelecionada,
  setPosicaoSelecionada,
  sequencias,
}) {
  const [mensagem, setMensagem] = useState(null);
  const [erro, setErro] = useState(null);

  const handleSuccess = (msg) => {
    setMensagem(msg);
    setErro(null);
  };

  const handleError = (msg) => {
    setErro(msg);
    setMensagem(null);
  };

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
        {userData && <option value="enviar">ENVIAR UMA TÉCNICA</option>}
      </select>

      {posicaoSelecionada === 'enviar' && (
        <div className="div_posicaoSelecionada">
          {userData ? (
            <>
              <h3>Enviar uma Técnica</h3>
              {mensagem && <p style={{ color: 'green' }}>{mensagem}</p>}
              {erro && <p style={{ color: 'red' }}>{erro}</p>}
              <EnviarTecnicaForm
                onSuccess={handleSuccess}
                onError={handleError}
              />
            </>
          ) : (
            <p>Você precisa estar logado para enviar novas técnicas.</p>
          )}
        </div>
      )}

      {/* restante do código permanece igual */}
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
