function mascara_tel()
{
    var tel = document.getElementById("tel").value
    console.log(tel)
    tel = tel.slice(0,17) // só vai até 17 character
    document.getElementById("tel").value=tel

    if(tel[0] != "+" && tel[0] != undefined)
    {
        document.getElementById("tel").value = "+"+tel[0];
    }

    if(tel[3] != "(" && tel[3] != undefined)
    {
        document.getElementById("tel").value = tel.slice(0,3) + "("+tel[3];
    }

    if(tel[6] != ")" && tel[6] != undefined)
    {
        document.getElementById("tel").value = tel.slice(0,6) + ")"+tel[6];
    }

    if(tel[12] != "-" && tel[12] != undefined)
    {
        document.getElementById("tel").value = tel.slice(0,12) + "-"+tel[12];
    }


}

function mascara_cep()
{
    var cep = document.getElementById("cep").value
    cep = cep.slice(0,10)
    document.getElementById("cep").value = cep

    if(cep[2] != "." && cep[2] != undefined)
    {
        document.getElementById("cep").value = cep.slice(0,2) + "."+cep[2];
    }
    
    if(cep[6] != "-" && cep[6] != undefined)
    {
        document.getElementById("cep").value = cep.slice(0,6) + "-" + cep[6];
    }
} 

function mascara_cpf()
{
    var cpf = document.getElementById("cpf").value
    cpf = cpf.slice(0,14)
    document.getElementById("cpf").value = cpf

    if(cpf[3] != "." && cpf[3] != undefined)
    {
        document.getElementById("cpf").value = cpf.slice(0,3) + "." + cpf[3];
    }

        if(cpf[7] != "." && cpf[7] != undefined)
    {
        document.getElementById("cpf").value = cpf.slice(0,7) + "." + cpf[7];
    }

        if(cpf[11] != "-" && cpf[11] != undefined)
    {
        document.getElementById("cpf").value = cpf.slice(0,11) + "-" + cpf[11];
    }
}


// ==========================================
// SALVAR O CADASTRO
// ==========================================


const formCadastro = document.getElementById("formCadastro");

if (formCadastro) {
    formCadastro.addEventListener("submit", async function(event) {
        event.preventDefault();

        const nomeCompleto = document.getElementById("nome").value.trim();
        const senha = document.getElementById("senha").value;
        const email = document.getElementById("email").value.trim().toLowerCase();
        const telefone = document.getElementById("tel").value.trim();
        const cpf = document.getElementById("cpf").value.trim();
        const cep = document.getElementById("cep").value.trim();
        const endereco = document.getElementById("endereço").value.trim();

        if (cpf.length !== 14) {
            alert("CPF incompleto. Use o formato XXX.XXX.XXX-XX.");
            return;
        }

        const cliente = {
            nome: nomeCompleto,
            cep: cep,
            cpf: cpf,
            endereco: endereco,
            email: email,
            senha: senha,
            telefone: telefone
        };

        try {
            const resposta = await fetch("https://localhost:7263/api/clientes/cadastro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(cliente)
            });

            const resultado = await resposta.json();

            if (!resposta.ok) {
                throw new Error(
                    resultado.mensagem ||
                    resultado.detail ||
                    "Não foi possível realizar o cadastro."
                );
            }

            alert("Cadastro realizado com sucesso! Faça seu login.");

            formCadastro.reset();
            window.location.href = "index.html";

        } catch (erro) {
            console.error("Erro ao cadastrar:", erro);
            alert("Erro ao realizar cadastro: " + erro.message);
        }
    });
}
