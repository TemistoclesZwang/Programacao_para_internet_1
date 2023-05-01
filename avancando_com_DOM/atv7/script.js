document.addEventListener('DOMContentLoaded', function () {
    var botaoExibir = document.getElementById('botaoExibir');
    botaoExibir.addEventListener('click', addTexto);
});

function pegarTextoDigitado() {
    var pegarTexto = document.getElementById('caixaDeTexto').value;
    if (pegarTexto === "") {
        alert("Campo em branco");
    }
    return document.getElementById('conteudo').innerHTML = pegarTexto;
}

function addTexto() {
    const selectOpcoes = document.getElementById('listaOpcoes')
    const criarNovaOpcao = document.createElement('option');
    
    var pegarTexto = document.getElementById('caixaDeTexto').value;
    if (pegarTexto === "") {
        alert("Campo em branco");
    } else{
        criarNovaOpcao.value = '5';
        criarNovaOpcao.text = pegarTexto;
    
        selectOpcoes.appendChild(criarNovaOpcao);
    }



}


