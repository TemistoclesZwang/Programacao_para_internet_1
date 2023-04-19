#### 2. Crie dois exemplos usando os métodos do objeto document: 
a. getElementById(); 
b. getElementsByTagName();


###### getElementById();
Exemplo com **innerHTML**

```
#html
<p id="paragrafo">Texto aqui.</p>

#JS
var paragrafo = document.getElementById("paragrafo");
paragrafo.innerHTML = "Altere meu texto";

```

###### getElementsByTagName();
Exemplo com **textContent**
```
#html
  <p>Texto 1 .</p>
  <p>Texto 2 .</p>
  <p>Texto 3 .</p>

#JS
var paragrafos = document.getElementsByTagName("p");
paragrafos.textContent = "Texto modificado";

```

#### 4. Qual a diferença entre as propriedades textContent e innerHTML dos elementos HTML? Cite exemplos.
Os exemplos podem ser verificados a cima. 
```
Exemplo: HTML <p id="paragrafo">Texto aqui.</p>

```

**textContent** = Retorna somente o texto
```
Retorno do exemplo: "Texto aqui."
```
**innerHTML** = Retorna texto e código HTML
```
Retorno do exemplo: "<p>Texto aqui.</p>"
```

#### 5. Crie um exemplo em que uma propriedade CSS de um elemento HTML é alterada via DOM 
```
<div id="divTeste">Texto aqui!</div>

```

```
const mudarCor = document.getElementById('divTeste');

mudarCor.style.backgroundColor = 'green';

mudarCor.style.color = 'white';


```

#### 6. Crie um script acionado por um botão que altere a cor de texto e a cor do fundo de uma página para fundo preto e cor de texto branca. Crie outro botão que faça o  efeito reverso.

```
<body>
  <div id="divTeste">
    <p>Texto aqui!.</p>
  </div>

  <button onclick="alterarCores('white', 'black')">Alterar Cores</button>
  <button onclick="alterarCores('black', 'white')">Alterar Cores</button>

  <script>
    function alterarCores(corFundo, corTexto) {
      var divTeste = document.getElementById("divTeste");
      divTeste.style.backgroundColor = corFundo;
      divTeste.style.color = corTexto;
    }
  </script>


```