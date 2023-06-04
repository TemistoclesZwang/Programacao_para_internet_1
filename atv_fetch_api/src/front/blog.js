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
    // const oneMoreLike = await response.json();
    // return (oneMoreLike.addLike);
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

    const postTitle = postElement.querySelectorAll('h3')[0]
    postTitle.innerText = post.title;

    const postItens = postElement.querySelectorAll('p')
    postItens[0].innerText = post.text;
    postItens[1].innerText = post.likes + " like(s)";

    const postId = postElement.querySelectorAll('input[name="id-like"]')[0];
    postId.innerText = post.id
    // const selectPostId = postId.innerText;

    btnLike.onclick = async (event) => {
        event.preventDefault();
        postItens[1].innerText = await addLike(post.id) + " like(s)";
        // .refatorar
    };

    btnDel.addEventListener("click", async (event) => {
        event.preventDefault();
        const confirmacao = confirm("Tem certeza que deseja excluir este item?");

        if (confirmacao) {
            await delPost(post.id);
            const selectPost = document.getElementById(post.id);
            selectPost.remove();
        }
        })


    document.getElementById('timeline').append(postElement);

}



window.onload = () => {
    const btnAddPost = document.getElementById('add-post')
    btnAddPost.onclick = addPost;
    loadPosts()

}



