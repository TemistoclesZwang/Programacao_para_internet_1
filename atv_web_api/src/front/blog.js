const loadPosts = async () => {
    const response = await fetch('http://localhost:3000/posts')
    const posts = await response.json();

    posts.forEach(post => {
        appendPost(post);
    });
}


async function addLike(id) {
    const config = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
    };

    const response = await fetch(`http://localhost:3000/posts/${id}/like`, config);
    const oneMoreLike = await response.json();
    return (oneMoreLike.addLike);
}


async function delPost(id) {
    const config = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    };

    await fetch(`http://localhost:3000/posts/${id}`, config);
}

async function getAllCmm() {
    const config = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };

    const response = await fetch(`http://localhost:3000/comentarios`, config);
    return await response.json();

}


async function getCmmByPostId(postId) {
    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    };

    const response = await fetch(`http://localhost:3000/posts/${postId}/comentarios`, config);
    // console.log(response);
    return await response.json();

}

async function addPost() {

    const newPost = {
        "id": document.getElementById('id').value,
        "title": document.getElementById('post-tile').value,
        "text": document.getElementById('post-text').value,
        "likes": 0
    };

    const config = {
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
    };

    const response = await fetch('http://localhost:3000/posts', config);
    const post = await response.json();
    appendPost(post);
}

async function sendCmm(comentario,idPost) {

    const newPost = {
        "id_post": idPost,
        "text": comentario
    };

    const config = {
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
    };

    const response = await fetch('http://localhost:3000/comentarios', config);
}


templateForSelect = (element, html) => {
    const template = document.getElementById('post-template');
    const postElement = document.importNode(template.content, true);
    element.querySelectorAll(html)

}



appendPost = (post) => {
    //.cada post entra aqui individualmente
    const template = document.getElementById('post-template');
    const postElement = document.importNode(template.content, true);

    // .atribuindo um id para cada post
    const articleSelect = postElement.querySelector("article.post#fjofaisd99")
    articleSelect.id = post.id


    const btnLike = postElement.querySelectorAll('button')[0]
    const btnDel = postElement.querySelectorAll('button')[1]
    const btnCmm = postElement.querySelectorAll('button')[2]
    
    const postTitle = postElement.querySelectorAll('h3')[0]
    postTitle.innerText = post.title;

    const postItens = postElement.querySelectorAll('p')
    postItens[0].innerText = post.text;
    postItens[1].innerText = post.likes + " like(s)";

    const getCmm = postElement.querySelectorAll('textarea');



    // const postId = postElement.querySelectorAll('input[name="id-like"]')[0];
    // postId.innerText = post.id
    // const selectPostId = postId.innerText;

    //. coloca comentarios e datas nos posts
    const promiseComentarios = getCmmByPostId(post.id)

    promiseComentarios.then((retorno) => {
        const tamanho = Object.keys(retorno).length;
        if (tamanho > 0) {

            let dataEcomentarios = '';
            retorno.forEach((item) => {
                dataEcomentarios += item.data_time +'\n'+item.comentario + '\n\n'
                postItens[3].innerText = dataEcomentarios
            });
        } else {
            postItens[3].innerText = comentario
        }
    });
    // console.log(getAllCmm()); 


    btnLike.onclick = async (event) => {
        event.preventDefault();
        postItens[1].innerText = await addLike(post.id) + " like(s)";
        // .refatorar
    };

    btnDel.addEventListener("click", async (event) => {
        event.preventDefault();
        const confirmacao = confirm("Excluir este item?");

        if (confirmacao) {
            await delPost(post.id);
            const selectPost = document.getElementById(post.id);
            selectPost.remove();
        }
    })

    btnCmm.addEventListener("click", async (event) => {
        event.preventDefault();
        const extrairTextoDoCmm = getCmm[0].value
        await sendCmm(extrairTextoDoCmm,post.id)
        // !atualizar aqui com data e comentario
        // postItens[2].innerText = 'data test'
        // postItens[3].innerText = extrairTextoDoCmm

        // console.log(extrairTextoDoCmm,post.id);
        console.log(getCmm[0].innerText);
        // .refatorar
    });


    document.getElementById('timeline').append(postElement);
// ! fazer o comentaŕio aparecer na tela quando clicar no botão
// !limitar a 3 comentarios 
// ! botão de cancelar limpa text area
// !separar o conteúdo do index.ts em rotas
}



window.onload = () => {
    const btnAddPost = document.getElementById('add-post')
    btnAddPost.onclick = addPost;
    loadPosts()
}



