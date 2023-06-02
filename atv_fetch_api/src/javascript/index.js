"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const Microblog_1 = require("./interface/Microblog");
const post_1 = require("./interface/post");
const express = require("express");
// const data = require("./data/data.json");
const app = express();
const data = new Microblog_1.Data();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//;get 
app.get('/', (request, response) => {
    response.send('hello world');
});
app.get("/posts", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        response.json(yield data.retrieveAll());
        console.log(yield data.retrieveAll());
    });
});
app.get("/posts/:id", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = request.params.id;
        response.json(yield data.retrieve(id));
        console.log(yield data.retrieve(id));
    });
});
// ;post
app.post("/posts", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        // const { id,text,likes} = request.body; //.posso pegar os 3 do cliente
        const idUniversal = (0, uuid_1.v4)();
        const { text } = request.body; //.pegando somente text
        const newPost = new post_1.Post(idUniversal, text, 0);
        data.create(newPost);
        response.json({ newPost });
        response.status(201).send();
    });
});
//;put
app.put("/posts/:id", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = request.params.id;
        if ((yield data.retrieve(id)) !== undefined) {
            const { text, likes } = request.body;
            if (!text || !likes) {
                return response.status(400).json({ error: "text e likes são obrigatórios" });
            }
            const newPost = new post_1.Post(id, text, likes);
            response.status(200).send();
            yield data.update(id, newPost.text, newPost.likes);
        }
        else {
            response.status(404).send();
        }
    });
});
// ;patch
app.patch("/posts/:id", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = request.params.id;
        if ((yield data.retrieve(id)) !== undefined) {
            const { text, likes } = request.body;
            const newPost = new post_1.Post(id, text, likes);
            response.status(200).send();
            yield data.update(id, newPost.text, newPost.likes);
        }
        else {
            response.status(404).send();
        }
    });
});
app.patch("/posts/:id/like", function (request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = request.params.id;
        if ((yield data.retrieve(id)) !== undefined) {
            const retrieveId = yield data.retrieve(id);
            const retrieveJustLikes = retrieveId['likes'];
            const addLike = retrieveJustLikes + 1;
            const newPost = new post_1.Post(id, '', addLike);
            response.status(200).send();
            yield data.update(id, newPost.text, newPost.likes);
        }
        else {
            console.log();
            response.status(404).send();
        }
    });
});
// ;delete
app.delete("/posts/:id", function (request, response) {
    const id = request.params.id;
    if (data.retrieve(id) !== undefined) {
        data.delete(id);
        response.status(204).send();
    }
    else {
        response.status(404).send();
    }
});
app.listen(3000, function () {
    console.log("Server is running");
});
//# sourceMappingURL=index.js.map