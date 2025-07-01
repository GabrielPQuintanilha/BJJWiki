import { useState } from 'react';
import { enviarTecnica } from '../services/posicoesService';


function EnviarTecnicaForm({ onSuccess, onError, userName }) {
  const [nome, setNome] = useState('');
  const [posicao, setPosicao] = useState('');
  const [finalidade, setFinalidade] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await enviarTecnica({ nome, posicao, finalidade, userName });
      setNome('');
      setPosicao('');
      setFinalidade('');
      setLoading(false);
      if (onSuccess) onSuccess('Técnica enviada com sucesso!');
    } catch (err) {
      setLoading(false);
      if (onError) onError(err.message || 'Erro ao enviar técnica.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome: </label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Posição: </label>
        <input
          type="text"
          value={posicao}
          onChange={(e) => setPosicao(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Finalidade: </label>
        <input
          type="text"
          value={finalidade}
          onChange={(e) => setFinalidade(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar Técnica'}
      </button>
    </form>
  );
}

export default EnviarTecnicaForm;
