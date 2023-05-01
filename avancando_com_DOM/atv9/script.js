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


function procurarItem(novoItem, listaDeOp) {
    for (let i = 0; i < listaDeOp.length; i++) {
        if (novoItem === listaDeOp[i].value) {
            return true
        }
    }
    return false
}

function addTexto() {
    const selectOpcoes = document.getElementById('listaOpcoes')

    var pegarTexto = document.getElementById('caixaDeTexto').value;
    var acharItem = procurarItem(pegarTexto, selectOpcoes);

    if (pegarTexto === "" || acharItem === false) {
        alert("Campo em branco ou não existe a opção digitada");
    } else {

        selectOpcoes.removeChild(selectOpcoes[parseInt(pegarTexto) - 1]);
        // -1 por causa da diferença de index iniciando em 0
    }
}


