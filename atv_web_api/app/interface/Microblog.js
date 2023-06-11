class Collection {
    constructor() {
        this.elements = [];
    }

    create(post) {
        this.elements.push(post);
    }

    retrieve(id) {
        if (this.elements.includes(id)) {
            return id;
        } else {
            return null;
        }
    }

    update(id, updatedPost) {
        const index = this.elements.findIndex((post) => post.id === id);
        if (index !== -1) {
            this.elements[index] = updatedPost;
        }
    }

    delete(id) {
        // ! pode utilizar o retrive aqui para econimizar linhas
        const index = this.elements.indexOf(id);
        if (index !== -1) {
            this.elements.splice(index, 1);
        }
    }

    retrieveAll() {
        return this.elements;
    }

}
module.exports = Collection;
