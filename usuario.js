
const API_URL = "https://localhost:7263/api";

// Recuperar usuário que fez login
const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

// Se não estiver logado, voltar ao início
if (!usuario || !usuario.idCliente) {
    window.location.href = "index.html";
} else {
    carregarUsuario();
    carregarPedidos();
}

// ==========================================
// CARREGAR DADOS DO PERFIL
// ==========================================

async function carregarUsuario() {
    try {
        const resposta = await fetch(
            `${API_URL}/clientes/${usuario.idCliente}`
        );

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar o perfil.");
        }

        const cliente = await resposta.json();

        document.getElementById("nomeUsuario").textContent =
            cliente.nome.split(" ")[0];

        document.getElementById("nomeCompleto").textContent =
            cliente.nome;

        document.getElementById("endereco").textContent =
            cliente.endereco;

        document.getElementById("email").textContent =
            cliente.email;

        document.getElementById("cpf").textContent =
            cliente.cpf;

        document.getElementById("cep").textContent =
            cliente.cep;

    } catch (erro) {
        console.error("Erro ao carregar perfil:", erro);
        alert("Não foi possível carregar seus dados.");
    }
}

// ==========================================
// CARREGAR HISTÓRICO DE PEDIDOS
// ==========================================

async function carregarPedidos() {
    const listaPedidos = document.getElementById("listaPedidos");

    listaPedidos.innerHTML = "Carregando pedidos...";

    try {
        const resposta = await fetch(
            `${API_URL}/clientes/${usuario.idCliente}/pedidos`
        );

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar os pedidos.");
        }

        const pedidos = await resposta.json();

        listaPedidos.innerHTML = "";

        if (pedidos.length === 0) {
            listaPedidos.textContent =
                "Você ainda não realizou compras.";
            return;
        }

        pedidos.forEach(pedido => {
            const item = document.createElement("div");
            item.classList.add("pedido");

            const titulo = document.createElement("h3");
            titulo.textContent = `Pedido #${pedido.idPedido}`;

            const data = document.createElement("p");
            data.textContent =
                `Data: ${new Date(pedido.criadoEm).toLocaleString("pt-BR")}`;

            const produtos = document.createElement("div");

            pedido.itens.forEach(produto => {
                const linha = document.createElement("p");

                linha.textContent =
                    `${produto.nomeProduto} - Quantidade: ${produto.quantidade} - ` +
                    `${Number(produto.precoUnitario).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })}`;

                produtos.appendChild(linha);
            });

            const total = document.createElement("p");

            total.textContent =
                `Total: ${Number(pedido.total).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })}`;

            item.append(titulo, data, produtos, total);

            listaPedidos.appendChild(item);
        });

    } catch (erro) {
        console.error("Erro ao carregar pedidos:", erro);

        listaPedidos.textContent =
            "Não foi possível carregar seu histórico de compras.";
    }
}

// ==========================================
// SAIR DA CONTA
// ==========================================

const botaoSair = document.getElementById("sair");

if (botaoSair) {
    botaoSair.addEventListener("click", function() {
        localStorage.removeItem("usuarioLogado");
        window.location.href = "index.html";
    });
}
