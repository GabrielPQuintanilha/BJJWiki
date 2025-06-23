function validarNomeUsuario(name) {
  const regex = /^[a-zA-Z0-9._-]{5,20}$/;
  return regex.test(name);
}

function validarSenha(password) {
  const regex = /^[\S]{8,}$/;
  return regex.test(password);
}

module.exports = { validarNomeUsuario, validarSenha };