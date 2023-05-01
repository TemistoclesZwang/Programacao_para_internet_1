document.addEventListener('DOMContentLoaded', function () {
    var select = document.getElementById('nomeImgs');
    select.addEventListener('change',exibirImg)
});

function exibirImg() {
    var caminhoImg = document.getElementById('nomeImgs').value;
    const criarImg = document.createElement("img");
    criarImg.src = `${caminhoImg}.gif`;
    criarImg.style.maxWidth = "500px";
    criarImg.style.maxHeight = "500px";
    criarImg.classList.add("imagem");

    document.getElementById("resultado").appendChild(criarImg);
}