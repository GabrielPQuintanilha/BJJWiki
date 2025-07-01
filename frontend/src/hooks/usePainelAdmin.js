import { useEffect, useState } from 'react';
import { listarTecnicasEnviadas } from '../services/posicoesService';

export default function usePainelAdmin(ativo) {
  const [tecnicasEnviadas, setTecnicasEnviadas] = useState([]);

  useEffect(() => {
    if (!ativo) return;

    const carregar = async () => {
      try {
        const json = await listarTecnicasEnviadas();
        setTecnicasEnviadas(json);
      } catch (error) {
        console.error('Erro ao carregar técnicas:', error);
      }
    };

    carregar();
  }, [ativo]);

  return [tecnicasEnviadas, setTecnicasEnviadas];
}