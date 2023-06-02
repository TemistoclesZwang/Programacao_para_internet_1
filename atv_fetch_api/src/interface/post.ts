
export class Post {
    id: string;
    title: string;
    text: string;
    likes: number;

    constructor(id: string, title: string,text: string, likes: number) {
        this.id = id;
        this.title = title;
        this.text = text;
        this.likes = likes;
    }
}


function displaypost(post: Post) {
    console.log(`id: ${post.id}`);
    console.log(`title: ${post.title}`);
    console.log(`text: ${post.text}`);
    if (post.likes) {
        console.log(`likes: ${post.likes}`);
    }
}


// const post = new Post(123, 'test', 2);
// displaypost(post);

// module.exports = Post;