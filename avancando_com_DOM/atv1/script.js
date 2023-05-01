document.addEventListener('DOMContentLoaded', function () {
    var botaoExibir = document.getElementById('fazerCalculo');
    botaoExibir.addEventListener('click', calcular);
});

function calcular() {
    var n1 = document.getElementById('caixaDeTexto1').value;
    var n2 = document.getElementById('caixaDeTexto2').value;
    
    if (n1.length === 0 || n2.length === 0) {
        var campoEmBranco = true
        

    }
    if (isNaN(n1) || isNaN(n2) || campoEmBranco === true) {
        alert("Digite um número inteiro");
    }else{

        var soma = Number(n1) + Number(n2)
        document.getElementById('resultado').innerHTML = soma;
    }
}