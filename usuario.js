
// ==========================================
// DADOS TEMPORÁRIOS DO PERFIL
// ==========================================

const usuarioTeste = {
    nome: "Maria Silva",
    nomeCompleto: "Maria Silva Santos",
    endereco: "Rua das Flores, 123",
    email: "maria@email.com",
    cpf: "123.456.789-00",
    cep: "30000-000"
};


// ==========================================
// CARREGAR INFORMAÇÕES DO USUÁRIO
// ==========================================

function carregarUsuario() {

    document.getElementById("nomeUsuario").textContent =
        usuarioTeste.nome;

    document.getElementById("nomeCompleto").textContent =
        usuarioTeste.nomeCompleto;

    document.getElementById("endereco").textContent =
        usuarioTeste.endereco;

    document.getElementById("email").textContent =
        usuarioTeste.email;

    document.getElementById("cpf").textContent =
        usuarioTeste.cpf;

    document.getElementById("cep").textContent =
        usuarioTeste.cep;
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
