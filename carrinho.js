
// ==========================================
// RECUPERAR CARRINHO
// ==========================================

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];


// ==========================================
// FORMATAR PREÇOS
// ==========================================

function formatarPreco(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


// ==========================================
// SALVAR CARRINHO
// ==========================================

function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    mostrarCarrinho();
}


// ==========================================
// EXIBIR PRODUTOS NA TELA
// ==========================================

function mostrarCarrinho() {
    const lista = document.getElementById("listaProdutos");
    const subtotalElemento = document.getElementById("subtotal");
    const totalElemento = document.getElementById("total");

    lista.innerHTML = "";

    let subtotal = 0;

    if (carrinho.length === 0) {
        lista.textContent = "Seu carrinho está vazio.";
    }

    carrinho.forEach((produto, indice) => {
        const valorItem = produto.preco * produto.quantidade;
        subtotal += valorItem;

        const item = document.createElement("div");
        item.className = "produtoCarrinho";

        const informacoes = document.createElement("div");
        informacoes.className = "infoProduto";

        const nome = document.createElement("h3");
        nome.textContent = produto.nome;

        const preco = document.createElement("p");
        preco.textContent = formatarPreco(produto.preco);

        const quantidade = document.createElement("div");
        quantidade.className = "controlesQuantidade";

        const diminuir = document.createElement("button");
        diminuir.textContent = "-";
        diminuir.dataset.acao = "diminuir";
        diminuir.dataset.indice = indice;

        const numero = document.createElement("span");
        numero.textContent = produto.quantidade;

        const aumentar = document.createElement("button");
        aumentar.textContent = "+";
        aumentar.dataset.acao = "aumentar";
        aumentar.dataset.indice = indice;

        const remover = document.createElement("button");
        remover.textContent = "Remover";
        remover.className = "removerProduto";
        remover.dataset.acao = "remover";
        remover.dataset.indice = indice;

        informacoes.append(nome, preco);
        quantidade.append(diminuir, numero, aumentar);

        item.append(informacoes, quantidade, remover);
        lista.appendChild(item);
    });

    subtotalElemento.textContent = formatarPreco(subtotal);
    totalElemento.textContent = formatarPreco(subtotal);
}


// ==========================================
// AUMENTAR, DIMINUIR E REMOVER PRODUTOS
// ==========================================

document.addEventListener("click", function(event) {
    const botao = event.target.closest("button[data-acao]");

    if (!botao) return;

    const indice = Number(botao.dataset.indice);
    const acao = botao.dataset.acao;

    if (!carrinho[indice]) return;

    if (acao === "aumentar") {
        carrinho[indice].quantidade++;
    }

    if (acao === "diminuir") {
        carrinho[indice].quantidade--;

        if (carrinho[indice].quantidade <= 0) {
            carrinho.splice(indice, 1);
        }
    }

    if (acao === "remover") {
        carrinho.splice(indice, 1);
    }

    salvarCarrinho();
});


// ==========================================
// FINALIZAR PEDIDO E SALVAR NO HISTÓRICO
// ==========================================

document.getElementById("finalizarPedido").addEventListener("click", function() {

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    // Calcular o valor total
    const total = carrinho.reduce((soma, produto) => {
        return soma + Number(produto.preco) * Number(produto.quantidade);
    }, 0);

    // Recuperar pedidos já realizados
    let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

    // Criar o novo pedido
    const pedido = {
        id: pedidos.length + 1,

        data: new Date().toLocaleDateString("pt-BR"),

        produtos: carrinho.map(produto => ({
            idProduto: Number(produto.idProduto),
            nome: produto.nome,
            quantidade: Number(produto.quantidade),
            preco: Number(produto.preco)
        })),

        total: total,

        status: "Recebido",

        entregador: "A definir"
    };

    // Adicionar o pedido ao histórico
    pedidos.push(pedido);

    // Salvar no navegador
    localStorage.setItem("pedidos", JSON.stringify(pedidos));

    // Preparar JSON para a futura API
    console.log("JSON do pedido:");
    console.log(JSON.stringify(pedido, null, 2));

    // Limpar o carrinho
    carrinho = [];
    salvarCarrinho();

    alert("Pedido realizado com sucesso!");
});


// ==========================================
// MOSTRAR CARRINHO AO ABRIR A PÁGINA
// ==========================================

mostrarCarrinho();
