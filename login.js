
const modalLogin = document.getElementById("login");
const formLogin = document.getElementById("formLogin");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const fecharLogin = document.getElementById("fecharLogin");
const mensagemLogin = document.getElementById("mensagemLogin");

const botaoUsuario = document.getElementById("user");

// Conta fictícia para testes (continua funcionando)
const contaTeste = {
    nome: "Maria",
    nomeCompleto: "Maria Silva Santos",
    endereco: "Rua das Flores, 123",
    email: "maria@email.com",
    senha: "123456",
    cpf: "123.456.789-00",
    cep: "30000-000"
};

// Clique no ícone de usuário:
// já logado -> vai para o perfil; senão abre a janela de login
if (botaoUsuario) {
    botaoUsuario.addEventListener("click", function(event) {
        event.preventDefault();

        if (localStorage.getItem("usuarioLogado")) {
            window.location.href = "usuario.html";
        } else if (modalLogin) {
            modalLogin.showModal();
        }
    });
}

// Fecha a janela de login
if (fecharLogin && modalLogin) {
    fecharLogin.addEventListener("click", function() {
        modalLogin.close();
    });
}

// Login com as contas cadastradas
if (formLogin) {
    formLogin.addEventListener("submit", function(event) {
        event.preventDefault();

        const emailDigitado = email.value.trim().toLowerCase();
        const senhaDigitada = senha.value;

        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        usuarios.push(contaTeste);

        const conta = usuarios.find(function(u) {
            return u.email === emailDigitado && u.senha === senhaDigitada;
        });

        if (conta) {
            // Guarda os dados da sessão (sem a senha)
            const usuario = {
                nome: conta.nome,
                nomeCompleto: conta.nomeCompleto,
                endereco: conta.endereco,
                email: conta.email,
                cpf: conta.cpf,
                cep: conta.cep,
                telefone: conta.telefone || ""
            };

            localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
            window.location.href = "usuario.html";

        } else if (mensagemLogin) {
            mensagemLogin.textContent = "E-mail ou senha incorretos.";
        }
    });
}
