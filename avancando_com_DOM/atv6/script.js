document.addEventListener('DOMContentLoaded', function () {
    var selectOpcoes = document.getElementById('listaOpcoes');
    selectOpcoes.addEventListener('change', function () {
        alterarTxt(selectOpcoes)
    });


});


function alterarTxt(selectOpcoes) {
    let texto = document.getElementById('caixaDeTexto');

    const novoTextoMai = document.createTextNode(texto.textContent.toUpperCase());
    const novoTextoMin = document.createTextNode(texto.textContent.toLowerCase());


    if (selectOpcoes.value === 'Maiusculo') {
        
        alert(novoTextoMai)
        document.getElementById("resultado").appendChild(novoTextoMai)
        
    } else {
        document.getElementById("resultado").appendChild(novoTextoMin);
    }

}

