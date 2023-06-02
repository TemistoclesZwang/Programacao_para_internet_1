class Collection {
    constructor() {
        this.elements = [];
    }

    retrieveAll() {
        return this.elements;
    }
    create(post) {
        this.elements.push(post);
    }

    retrieve(id) {
        const find = this.elements.some(post => post.id === id);
        if (find === true) {
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


}
module.exports = Collection;


// //. Exemplo de uso da classe Collection com os elementos
// const collection = new Collection();
// collection.create({
//     id: 1,
//     text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     likes: 20,
// });
// collection.create({
//     id: 2,
//     text: "Praesent in nisi eget leo condimentum fringilla vitae nec augue.",
//     likes: 15,
// });
// collection.create({
//     id: 3,
//     text: "Nulla at mauris eget odio scelerisque rhoncus.",
//     likes: 10,
// });

// console.log(collection.retrieveAll()); // Saída: Array com os elementos adicionados à coleção

// const retrievedElement = collection.retrieve({
//     id: 2,
//     text: "Praesent in nisi eget leo condimentum fringilla vitae nec augue.",
//     likes: 15,
// });
// console.log(retrievedElement); // Saída: Objeto com as características do elemento encontrado na coleção
