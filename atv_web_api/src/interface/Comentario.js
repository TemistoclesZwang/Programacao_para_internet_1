"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comentario = void 0;
var Comentario = /** @class */ (function () {
    function Comentario(text, id_post) {
        this.text = text;
        this.id_post = id_post;
    }
    return Comentario;
}());
exports.Comentario = Comentario;
function displayComentario(comentario) {
    console.log("title: ".concat(comentario.text));
    console.log("text: ".concat(comentario.id_post));
}
// const comentario = new Comentario(123, 'textt', 'idPost');
// displayComentario(comentario);
// module.exports = Post;
