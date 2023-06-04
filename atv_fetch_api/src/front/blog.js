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

    await fetch(`http://localhost:3000/posts/${id}/like`, config);
    // const likes = await response.json();
}


async function OldaddLike() {
    // .pegar o id do post ao pressionar like
    // .enviar id para API
    // . fazer API retornar o novo valor do like
    // . pegar a resposta e atualizar a quantidade de likes da postagem

    const newPost = {
        "idLike": document.getElementById('id-like').value
    };
    console.log(document.getElementById('id-like').value);

    // const config = {
    //     'method': 'PATCH',
    //     'headers': {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(newPost)
    // };

    // const response = await fetch(`http://localhost:3000/posts/${idLike} /like`, config);
    // const post = await response.json();

    // appendPost(post);
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

templateForSelect= (element,html) => {
    const template = document.getElementById('post-template');
    const postElement = document.importNode(template.content, true);
    element.querySelectorAll(html)

}

appendPost = (post) => {
    //!cada post entra aqui individualmente
    const template = document.getElementById('post-template');
    const postElement = document.importNode(template.content, true);
    
    const buttons = postElement.querySelectorAll('button')
    const likeButton = buttons[0]

    const postTitle = postElement.querySelectorAll('h3')[0]
    postTitle.innerText = post.title;

    const postItens = postElement.querySelectorAll('p')
    postItens[0].innerText = post.text;
    postItens[1].innerText = post.likes + " like(s)";
    
    const postId = postElement.querySelectorAll('input[name="id-like"]')[0];
    postId.innerText = post.id
    const selectPostId = postId.innerText;


    // console.log(postId.innerText);
    // console.log(postElement.querySelector('#id-like').value)


    document.getElementById('timeline').append(postElement);

}



window.onload = () => {
    const btnAddPost = document.getElementById('add-post')
    btnAddPost.onclick = addPost;
    loadPosts()

    // const btnAddLike = document.getElementById("add-like")
    // btnAddLike.onclick = console.log(document.getElementById("id-like"));

}



