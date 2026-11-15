
const modalLogin = document.getElementById("login");
const formLogin = document.getElementById("formLogin");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const botaoLogin = document.getElementById("ButLogin");
const fecharLogin = document.getElementById("fecharLogin");
const mensagemLogin = document.getElementById("mensagemLogin");

const botaoUsuario = document.getElementById("user");

// Abre a janela de login
if (botaoUsuario && modalLogin) {
    botaoUsuario.addEventListener("click", function(event) {
        event.preventDefault();
        modalLogin.showModal();
    });
}

// Fecha a janela de login
if (fecharLogin && modalLogin) {
    fecharLogin.addEventListener("click", function() {
        modalLogin.close();
    });
}

// Login fictício para testes
if (formLogin) {
    formLogin.addEventListener("submit", function(event) {
        event.preventDefault();

        const emailDigitado = email.value.trim();
        const senhaDigitada = senha.value;

        // Dados da conta fictícia
        if (
            emailDigitado === "maria@email.com" &&
            senhaDigitada === "123456"
        ) {
            const usuario = {
                nome: "Maria Silva",
                nomeCompleto: "Maria Silva Santos",
                endereco: "Rua das Flores, 123",
                email: "maria@email.com",
                cpf: "123.456.789-00",
                cep: "30000-000"
            };

            localStorage.setItem(
                "usuarioLogado",
                JSON.stringify(usuario)
            );

            window.location.href = "usuario.html";

        } else {
            if (mensagemLogin) {
                mensagemLogin.textContent =
                    "E-mail ou senha incorretos.";
            }
        }
    });
}
