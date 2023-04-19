// selecione o botão usando o método getElementById 
const botao: HTMLElement = document.getElementById("botao");
const botaoLimpar: HTMLElement = document.getElementById("botaoLimpar");

// adicione um evento de clique ao botão 
botao.addEventListener("click", function () {
    // selecione o parágrafo usando o método getElementById 
    const paragrafo: HTMLElement = document.getElementById("paragrafo");

    // altere o texto do parágrafo 
    paragrafo.textContent = "O texto deste parágrafo foi alterado!";
});

botaoLimpar.addEventListener("click", function () {
    // selecione o parágrafo usando o método getElementById 
    const paragrafo2: HTMLElement = document.getElementById("paragrafo2");

    // altere o texto do parágrafo 
    paragrafo2.textContent = "";
});