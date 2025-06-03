const techniqueRepository = require('../repositories/techniqueRepository');

exports.getAllTechniques = async () => {
  return await techniqueRepository.findAllTechniques();
};

exports.getConnectionsById = async (id) => {
  return await techniqueRepository.findConnectionsByTechniqueId(id);
};
