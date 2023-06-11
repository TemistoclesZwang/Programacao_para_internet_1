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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var Microblog_1 = require("./interface/Microblog");
var ComentariosDb_1 = require("./interface/ComentariosDb");
var Comentario_1 = require("./interface/Comentario");
var post_1 = require("./interface/post");
var express = require("express");
var cors_1 = require("cors");
var app = express();
app.use(express.json());
app.use((0, cors_1.default)());
app.use(express.urlencoded({ extended: true }));
var data = new Microblog_1.Data();
var cmm = new ComentariosDb_1.ComentariosDb();
//;post listar todos comentarios de um post
app.post("/posts/:idPost/comentarios", function (request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var idPost, _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    idPost = request.params.idPost;
                    _b = (_a = response).json;
                    return [4 /*yield*/, cmm.comen(idPost)];
                case 1:
                    _b.apply(_a, [_e.sent()]);
                    _d = (_c = console).log;
                    return [4 /*yield*/, cmm.comen(idPost)];
                case 2:
                    _d.apply(_c, [_e.sent()]);
                    return [2 /*return*/];
            }
        });
    });
});
//;get 
app.get("/comentarios", function (request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _b = (_a = response).json;
                    return [4 /*yield*/, cmm.retrieveAll()];
                case 1:
                    _b.apply(_a, [_e.sent()]);
                    _d = (_c = console).log;
                    return [4 /*yield*/, cmm.retrieveAll()];
                case 2:
                    _d.apply(_c, [_e.sent()]);
                    return [2 /*return*/];
            }
        });
    });
});
app.get("/comentarios/:id", function (request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var id, _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    id = request.params.id;
                    _b = (_a = response).json;
                    return [4 /*yield*/, cmm.retrieve(id)];
                case 1:
                    _b.apply(_a, [_e.sent()]);
                    _d = (_c = console).log;
                    return [4 /*yield*/, cmm.retrieve(id)];
                case 2:
                    _d.apply(_c, [_e.sent()]);
                    return [2 /*return*/];
            }
        });
    });
});
// ;post 
app.post("/comentarios", function (request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, text, id_post, newCmm;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = request.body, text = _a.text, id_post = _a.id_post;
                    console.log(text, id_post);
                    if (!text || !id_post) {
                        return [2 /*return*/, response.status(400).json({ error: "text e id_post são obrigatórios" })];
                    }
                    newCmm = new Comentario_1.Comentario(text, id_post);
                    response.json({ newCmm: newCmm });
                    response.status(201).send();
                    return [4 /*yield*/, cmm.create(newCmm)];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
});
//;put
app.put("/comentarios/:comentarioIdUrl", function (request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var comentarioIdUrl, text;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    comentarioIdUrl = request.params.comentarioIdUrl;
                    console.log('retorno', comentarioIdUrl);
                    return [4 /*yield*/, cmm.retrieve(comentarioIdUrl)];
                case 1:
                    if (!((_a.sent()) !== undefined)) return [3 /*break*/, 3];
                    text = request.body.text;
                    if (!text) {
                        return [2 /*return*/, response.status(400).json({ error: "text é obrigatório" })];
                    }
                    // const newCmm = new Comentario(text,comentarioId);
                    // !testar
                    response.status(200).send();
                    return [4 /*yield*/, cmm.update(comentarioIdUrl, text)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    response.status(404).send();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
});
// ;patch
app.patch("/comentarios/:comentarioId", function (request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var comentarioId, text;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    comentarioId = request.params.comentarioId;
                    return [4 /*yield*/, cmm.retrieve(comentarioId)];
                case 1:
                    if (!((_a.sent()) !== undefined)) return [3 /*break*/, 3];
                    text = request.body.text;
                    // const newCmm = new Comentario(id,title, text, likes);
                    // !testar
                    response.status(200).send();
                    return [4 /*yield*/, cmm.update(comentarioId, text)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    response.status(404).send();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
});
// ;delete
app.delete("/comentarios/:comentarioId", function (request, response) {
    var comentarioId = request.params.comentarioId;
    if (cmm.retrieve(comentarioId) !== undefined) {
        cmm.delete(comentarioId);
        response.status(204).send();
    }
    else {
        response.status(404).send();
    }
});
// ! **************************
//;get 
app.get('/', function (request, response) {
    response.send('hello world');
});
app.get("/posts", function (request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _b = (_a = response).json;
                    return [4 /*yield*/, data.retrieveAll()];
                case 1:
                    _b.apply(_a, [_e.sent()]);
                    _d = (_c = console).log;
                    return [4 /*yield*/, data.retrieveAll()];
                case 2:
                    _d.apply(_c, [_e.sent()]);
                    return [2 /*return*/];
            }
        });
    });
});
app.get("/posts/:id", function (request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var id, _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    id = request.params.id;
                    _b = (_a = response).json;
                    return [4 /*yield*/, data.retrieve(id)];
                case 1:
                    _b.apply(_a, [_e.sent()]);
                    _d = (_c = console).log;
                    return [4 /*yield*/, data.retrieve(id)];
                case 2:
                    _d.apply(_c, [_e.sent()]);
                    return [2 /*return*/];
            }
        });
    });
});
// ;post
app.post("/posts", function (request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var idUniversal, _a, text, title, newPost;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    idUniversal = (0, uuid_1.v4)();
                    _a = request.body, text = _a.text, title = _a.title;
                    console.log(text, title);
                    newPost = new post_1.Post(idUniversal, title, text, 0);
                    response.json({ newPost: newPost });
                    response.status(201).send();
                    return [4 /*yield*/, data.create(newPost)];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
});
//;put
app.put("/posts/:id", function (request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var id, _a, text, title, likes, newPost;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = request.params.id;
                    return [4 /*yield*/, data.retrieve(id)];
                case 1:
                    if (!((_b.sent()) !== undefined)) return [3 /*break*/, 3];
                    _a = request.body, text = _a.text, title = _a.title, likes = _a.likes;
                    if (!text || !likes || !title) {
                        return [2 /*return*/, response.status(400).json({ error: "text,likes e title são obrigatórios" })];
                    }
                    newPost = new post_1.Post(id, title, text, likes);
                    response.status(200).send();
                    return [4 /*yield*/, data.update(id, newPost.title, newPost.text, newPost.likes)];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    response.status(404).send();
                    _b.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
});
// ;patch
app.patch("/posts/:id", function (request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var id, _a, title, text, likes, newPost;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = request.params.id;
                    return [4 /*yield*/, data.retrieve(id)];
                case 1:
                    if (!((_b.sent()) !== undefined)) return [3 /*break*/, 3];
                    _a = request.body, title = _a.title, text = _a.text, likes = _a.likes;
                    newPost = new post_1.Post(id, title, text, likes);
                    response.status(200).send();
                    return [4 /*yield*/, data.update(id, newPost.title, newPost.text, newPost.likes)];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    response.status(404).send();
                    _b.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
});
app.patch("/posts/:id/like", function (request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var id, retrieveId, retrieveJustLikes, addLike, newPost;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = request.params.id;
                    return [4 /*yield*/, data.retrieve(id)];
                case 1:
                    if (!((_a.sent()) !== undefined)) return [3 /*break*/, 4];
                    return [4 /*yield*/, data.retrieve(id)];
                case 2:
                    retrieveId = _a.sent();
                    retrieveJustLikes = retrieveId['likes'];
                    addLike = retrieveJustLikes + 1;
                    newPost = new post_1.Post(id, '', '', addLike);
                    response.json({ addLike: addLike });
                    response.status(200).send();
                    return [4 /*yield*/, data.update(id, newPost.title, newPost.text, newPost.likes)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    response.status(404).send();
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
});
// ;delete
app.delete("/posts/:id", function (request, response) {
    var id = request.params.id;
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
