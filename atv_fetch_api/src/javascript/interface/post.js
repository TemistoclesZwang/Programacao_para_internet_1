"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
class Post {
    constructor(id, text, likes) {
        this.id = id;
        this.text = text;
        this.likes = likes;
    }
}
exports.Post = Post;
function displaypost(post) {
    console.log(`id: ${post.id}`);
    console.log(`text: ${post.text}`);
    if (post.likes) {
        console.log(`likes: ${post.likes}`);
    }
}
// const post = new Post(123, 'test', 2);
// displaypost(post);
// module.exports = Post;
//# sourceMappingURL=post.js.map