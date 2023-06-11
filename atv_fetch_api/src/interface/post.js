"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
var Post = /** @class */ (function () {
    function Post(id, title, text, likes) {
        this.id = id;
        this.title = title;
        this.text = text;
        this.likes = likes;
    }
    return Post;
}());
exports.Post = Post;
function displaypost(post) {
    console.log("id: ".concat(post.id));
    console.log("title: ".concat(post.title));
    console.log("text: ".concat(post.text));
    if (post.likes) {
        console.log("likes: ".concat(post.likes));
    }
}
// const post = new Post(123, 'test', 2);
// displaypost(post);
// module.exports = Post;
