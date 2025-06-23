const DeleteTecnicaButton = ({ tecnicaId, onDelete }) => {
  const handleClick = () => {
    const confirmar = window.confirm('Tem certeza que deseja excluir esta técnica?');
    if (confirmar) {
        onDelete(tecnicaId);
    }
  };

  return (
    <button onClick={handleClick} className="btn-excluir">
      Excluir
    </button>
  );
};

export default DeleteTecnicaButton;