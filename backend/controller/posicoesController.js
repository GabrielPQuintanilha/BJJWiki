const techniqueService = require('../services/techniqueService');

exports.deletarTecnica = async (req, res) => {
  const id = req.params.id;

  try {
    await techniqueService.deletarTecnica(id);
    res.status(204).send();
  } catch (err) {
    console.error('Erro ao deletar técnica:', err);
    res.status(500).json({ error: 'Erro ao deletar técnica' });
  }
};