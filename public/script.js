
// evento de clique para logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  fetch("/logout")
    .then(() => {
      // Redireciona de volta pro login (ou página inicial)
      window.location.href = "/";
    })
    .catch(error => {
      console.error("Erro ao fazer logout", error);
      alert("Erro ao sair");
    });
});