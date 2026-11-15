
// ==========================================
// DADOS TEMPORÁRIOS DO PERFIL
// ==========================================

const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

// Sem login, volta para o início
if (!usuario) {
    window.location.href = "index.html";
}


// ==========================================
// CARREGAR INFORMAÇÕES DO USUÁRIO
// ==========================================

function carregarUsuario() {

    document.getElementById("nomeUsuario").textContent =
        usuario.nome;

    document.getElementById("nomeCompleto").textContent =
        usuario.nomeCompleto;

    document.getElementById("endereco").textContent =
        usuario.endereco;

    document.getElementById("email").textContent =
        usuario.email;

    document.getElementById("cpf").textContent =
        usuario.cpf;

    document.getElementById("cep").textContent =
        usuario.cep;
}


// ==========================================
// CARREGAR HISTÓRICO DE COMPRAS
// ==========================================

function carregarPedidos() {

    const listaPedidos = document.getElementById("listaPedidos");

    listaPedidos.innerHTML = "";

    // Buscar pedidos salvos no navegador
    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

    if (pedidos.length === 0) {
        listaPedidos.textContent =
            "Você ainda não realizou compras.";

        return;
    }

    // Mostrar cada pedido
    pedidos.forEach(pedido => {

        const item = document.createElement("div");
        item.classList.add("pedido");

        const titulo = document.createElement("h3");
        titulo.textContent = `Pedido #${pedido.id}`;

        const data = document.createElement("p");
        data.textContent = `Data: ${pedido.data}`;

        const produtos = document.createElement("p");

        const nomesProdutos = pedido.produtos.map(produto => {
            return `${produto.nome} (x${produto.quantidade})`;
        }).join(", ");

        produtos.textContent = `Produtos: ${nomesProdutos}`;

        const total = document.createElement("p");

        total.textContent = `Total: ${Number(pedido.total).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })}`;

        const status = document.createElement("p");
        status.textContent = `Status: ${pedido.status}`;

        const entregador = document.createElement("p");
        entregador.textContent = `Entregador: ${pedido.entregador}`;

        item.append(
            titulo,
            data,
            produtos,
            total,
            status,
            entregador
        );

        listaPedidos.appendChild(item);
    });
}


// ==========================================
// EXECUTAR AS FUNÇÕES
// ==========================================

carregarUsuario();
carregarPedidos();
