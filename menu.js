let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// Salva o carrinho no navegador
function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// Detecta o clique nos botões
document.addEventListener("click", function(event) {

    const botao = event.target.closest(".add-carrinho");

    if (!botao) return;

    const produtoHTML = botao.closest(".containerProd");

    const id = produtoHTML.dataset.idProduto;
    const nome = produtoHTML.querySelector("h2").textContent;
    const preco = Number(produtoHTML.dataset.preco);

    const produtoExistente = carrinho.find(
        produto => produto.idProduto === id
    );

    if (produtoExistente) {
        produtoExistente.quantidade++;
    } else {
        carrinho.push({
            idProduto: id,
            nome: nome,
            preco: preco,
            quantidade: 1
        });
    }

    salvarCarrinho();

    alert(nome + " foi adicionado ao carrinho!");
});

// ==========================================
// BARRA DE PESQUISA DO CARDÁPIO
// ==========================================

const campoBusca = document.getElementById("busca");

function normalizar(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[’']/g, "");
}

if (campoBusca) {
    const produtosMenu = Array.from(document.querySelectorAll(".containerProd"));
    const titulosSecao = Array.from(document.querySelectorAll(".TítuloE"));
    const cardapio = document.getElementById("cardápio");

    // Mensagem de "nenhum resultado"
    const semResultados = document.createElement("p");
    semResultados.id = "semResultados";
    semResultados.textContent = "Nenhum açaí encontrado.";
    semResultados.style.display = "none";
    cardapio.appendChild(semResultados);

    function mostrar(elemento, visivel) {
        elemento.style.display = visivel ? "" : "none";
    }

    function filtrarCardapio() {
        const termo = normalizar(campoBusca.value.trim());

        // 1º procura pelo NOME do produto; se não achar, procura nos ingredientes
        let encontrados = produtosMenu.filter(produto =>
            normalizar(produto.querySelector("h2").textContent).includes(termo)
        );

        if (termo !== "" && encontrados.length === 0) {
            encontrados = produtosMenu.filter(produto =>
                normalizar(produto.querySelector("p").textContent).includes(termo)
            );
        }

        // Mostra só os produtos encontrados e elimina os outros
        produtosMenu.forEach(produto => {
            mostrar(produto, encontrados.includes(produto));
        });

        // Esconde o título (Puros, Outros) se a seção ficou vazia
        titulosSecao.forEach(titulo => {
            const grade = titulo.nextElementSibling;
            const temVisivel = grade && encontrados.some(p => grade.contains(p));
            mostrar(titulo, temVisivel);
        });

        semResultados.style.display = encontrados.length > 0 ? "none" : "block";

        // Direciona a tela para o primeiro produto encontrado
        if (termo !== "" && encontrados.length > 0) {
            encontrados[0].scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }

    campoBusca.addEventListener("input", filtrarCardapio);
    campoBusca.addEventListener("search", filtrarCardapio);
}