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
