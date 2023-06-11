import { ComentariosDb } from './ComentariosDb';
import { Comentario } from './Comentario';


const comentarios = new ComentariosDb();
// const newComentario  =  new Comentario ('texto','6659e9be-e3d5-4663-abf5-467293f3966b')
// comentarios.create(newComentario)

// comentarios.retrieveAll();
// comentarios.joinPosts();
// comentarios.retrieve('1')
comentarios.comen('2')

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