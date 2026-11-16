
const modalLogin = document.getElementById("login");
const formLogin = document.getElementById("formLogin");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const fecharLogin = document.getElementById("fecharLogin");
const mensagemLogin = document.getElementById("mensagemLogin");
const botaoUsuario = document.getElementById("user");

// Abre o perfil ou a janela de login
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

// Login pela API
if (formLogin) {
    formLogin.addEventListener("submit", async function(event) {
        event.preventDefault();

        const emailDigitado = email.value.trim().toLowerCase();
        const senhaDigitada = senha.value;

        try {
            const resposta = await fetch("https://localhost:7263/api/clientes/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: emailDigitado,
                    senha: senhaDigitada
                })
            });

            const resultado = await resposta.json();

            if (!resposta.ok) {
                throw new Error(
                    resultado.mensagem ||
                    resultado.detail ||
                    "E-mail ou senha incorretos."
                );
            }

            // Guarda os dados do cliente, sem a senha
            const usuario = {
                idCliente: resultado.idCliente,
                nome: resultado.nome,
                email: resultado.email
            };

            localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

            window.location.href = "usuario.html";

        } catch (erro) {
            console.error("Erro no login:", erro);

            if (mensagemLogin) {
                mensagemLogin.textContent = erro.message;
            } else {
                alert(erro.message);
            }
        }
    });
}
