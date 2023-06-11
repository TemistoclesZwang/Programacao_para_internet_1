
export class Comentario {
    text: string;
    id_post: string;

    constructor(text: string, id_post: string) {
        this.text = text;
        this.id_post = id_post;

    }
}


function displayComentario(comentario: Comentario) {
    console.log(`title: ${comentario.text}`);
    console.log(`text: ${comentario.id_post}`);

}


// const comentario = new Comentario(123, 'textt', 'idPost');
// displayComentario(comentario);

// module.exports = Post;