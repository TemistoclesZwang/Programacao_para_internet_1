document.addEventListener('DOMContentLoaded', function () {
    var botaoExibir = document.getElementById('botaoExibir');
    botaoExibir.addEventListener('click', exibirConteudo);
});

function exibirConteudo() {
    var conteudo = document.getElementById('caixaDeTexto').value;
    if (conteudo === "") {
        alert("Campo em branco");
    }

    document.getElementById('conteudo').innerHTML = conteudo;
}