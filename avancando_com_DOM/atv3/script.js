document.addEventListener('DOMContentLoaded', function () {
    var botaoExibir = document.getElementById('botaoExibir');
    botaoExibir.addEventListener('click', exibirImg);
});

function exibirImg() {
    var caminhoImg = document.getElementById('caixaDeTexto').value;

    const criarImg = document.createElement("img");
    criarImg.src = `${caminhoImg}`;
    criarImg.style.maxWidth = "50%";
    criarImg.style.maxHeight = "50%";
    criarImg.classList.add("imagem");

    document.getElementById("resultado").appendChild(criarImg);
}