
document.addEventListener("DOMContentLoaded", function ()
{
    const header = document.querySelector("header");

    // cria o botão da lua/sol
    const botao = document.createElement("button");
    botao.id = "alternarTema";
    document.body.appendChild(botao);

    // liga ou desliga o modo escuro
    function mudarTema(escuro)
    {
        document.body.classList.toggle("darkmode", escuro);

        if (header)
        {
            header.classList.toggle("darkmode", escuro);
        }

        if (escuro)
        {
            botao.textContent = "☀️";
        }
        else
        {
            botao.textContent = "🌙";
        }
    }

    // vê se a pessoa já escolheu um tema antes
    const salvo = localStorage.getItem("tema");

    if (salvo == "escuro")
    {
        mudarTema(true);
    }
    else if (salvo == "claro")
    {
        mudarTema(false);
    }
    else
    {
        // se nunca escolheu, usa o tema do computador/celular
        mudarTema(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }

    // quando clica no botão
    botao.addEventListener("click", function ()
    {
        const ficouEscuro = !document.body.classList.contains("darkmode");

        mudarTema(ficouEscuro);

        if (ficouEscuro)
        {
            localStorage.setItem("tema", "escuro");
        }
        else
        {
            localStorage.setItem("tema", "claro");
        }
    });
});
