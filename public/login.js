function showAlert(message) {
  alert(message);
}

function renderLogin() {
  document.getElementById("app").innerHTML = `
    <h1>Bem-vindo ao servidor Node.js</h1>
    <input id="user" type="text" placeholder="Usuario" /><br/>
    <input id="password" type="password" placeholder="Senha" /><br/>
    <button id="loginButton">Login</button>
    <button id="createAccountButton">Criar Conta</button>
  `;

  document.getElementById("loginButton").addEventListener("click", handleLogin);
  document.getElementById("createAccountButton").addEventListener("click", handleRegister);
}

function renderDashboard() {
  document.getElementById("app").innerHTML = `
    <h1>Bem-vindo à sua área logada!</h1>
    <p>Login realizado com sucesso.</p>
    <button id="logoutBtn">Sair</button>
  `;

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("token");
    showAlert("Logout realizado.");
    renderLogin();
  });
}

function getFormData() {
  return {
    usuario: document.getElementById("user").value,
    senha: document.getElementById("password").value,
  };
}

//enviar data
function postData(url, data) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(res => res.json());
}

async function handleRegister() {
  const { usuario, senha } = getFormData();

  try {
    const data = await postData("http://localhost:3000/register", { usuario, senha });

    if (data.error) {
      showAlert(data.error);
    } else {
      console.log("Usuário cadastrado:", data);
      showAlert("Usuário cadastrado com sucesso!");
    }
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    showAlert("Erro ao cadastrar usuário.");
  }
}

async function handleLogin() {
  const { usuario, senha } = getFormData();

  try {
    const data = await postData("http://localhost:3000/login", { usuario, senha });

    if (data.error) {
      showAlert(data.error);
    } else {
      console.log("Login efetuado:", data);
      localStorage.setItem('token', data.token); // Guarda o token no localStorage
      showAlert("Bem-vindo!");
      renderDashboard()
    }
  } catch (error) {
    console.error("Erro ao logar:", error);
    showAlert("Erro ao logar.");
  }
}

// Verifica se já existe token ao carregar a página
window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (token) {
    renderDashboard();
  } else {
    renderLogin();
  }
});
