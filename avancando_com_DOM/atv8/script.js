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


function checarOpsRepetidas(novaOp, listaDeOp) {
    for (let i = 0; i < listaDeOp.length; i++) {
        if (novaOp === listaDeOp[i].value) {
            alert('Opção repetida')
            return false
        }
        return true
    }
}


function addTexto() {
    const selectOpcoes = document.getElementById('listaOpcoes')
    const criarNovaOpcao = document.createElement('option');

    var pegarTexto = document.getElementById('caixaDeTexto').value;
    var opsRepetidas = checarOpsRepetidas(pegarTexto, selectOpcoes);

    if (pegarTexto === "" || opsRepetidas === false) {
        alert("Campo em branco ou opção repetida");
    } else {
        criarNovaOpcao.value = '5';
        criarNovaOpcao.text = pegarTexto;
        selectOpcoes.replaceChild(criarNovaOpcao, selectOpcoes[4]);
    }
}


