"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComentariosDb_1 = require("./ComentariosDb");
var comentarios = new ComentariosDb_1.ComentariosDb();
// const newComentario  =  new Comentario ('texto','6659e9be-e3d5-4663-abf5-467293f3966b')
// comentarios.create(newComentario)
// comentarios.retrieveAll();
// comentarios.joinPosts();
comentarios.retrieve('1');
// !fazer os 5 end points para os comentarios
// !adicionar data
// !checar se 1 post de fato esta tendo vários comentarios
// ;endpoints
// .listar comentários (POST)
// .criar comentário
// .recuperar 1 comentaŕio com base no id
// .deletar comentario
// .atualiza comentário
// . para update e retrive = id do comentário
// . para New comentario = id do post
