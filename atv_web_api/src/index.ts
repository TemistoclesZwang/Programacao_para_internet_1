import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Data } from './interface/Microblog';
import { ComentariosDb } from './interface/ComentariosDb';
import { Comentario } from './interface/Comentario';
import { Post } from './interface/post';
import express = require('express');
import cors from 'cors';


const app = express()

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

const data = new Data();
const cmm = new ComentariosDb();


//;post listar todos comentarios de um post
app.post("/posts/:idPost/comentarios", async function (request: Request, response: Response) {
  const idPost: string = request.params.idPost
  
  response.json(await cmm.comen(idPost));
  console.log(await cmm.comen(idPost));
});

//;get 
app.get("/comentarios", async function (request: Request, response: Response) {
  response.json(await cmm.retrieveAll());
  console.log(await cmm.retrieveAll());
});

app.get("/comentarios/:id", async function (request: Request, response: Response) {
  const id: string = request.params.id
  response.json(await cmm.retrieve(id))
  console.log(await cmm.retrieve(id))
});

// ;post 
app.post("/comentarios", async function (request: Request, response: Response) {
  // const { id,text,likes} = request.body; //.posso pegar os 3 do cliente
  const { text,id_post } = request.body;
  console.log(text,id_post);

  if (!text || !id_post) {
    return response.status(400).json({ error: "text e id_post são obrigatórios" });
  }
  const newCmm = new Comentario(text,id_post);

  response.json({ newCmm });
  response.status(201).send()
  await cmm.create(newCmm);

});

//;put
app.put("/comentarios/:comentarioIdUrl", async function (request: Request, response: Response) {
  const comentarioIdUrl: string = request.params.comentarioIdUrl


  if (await cmm.retrieve(comentarioIdUrl) !== undefined) {
    const { comentario} = request.body;

    if (!comentario) {
      return response.status(400).json({ error: "text é obrigatório" });
    }


    response.status(200).send()
    await cmm.update(comentarioIdUrl, comentario)

  } else {
    response.status(404).send()
  }
});


// ;patch
app.patch("/comentarios/:comentarioId", async function (request: Request, response: Response) {
  const comentarioId: string = request.params.comentarioId

  if (await cmm.retrieve(comentarioId) !== undefined) {
    const { text } = request.body;

    // const newCmm = new Comentario(id,title, text, likes);
    response.status(200).send()
    await cmm.update(comentarioId, text)

  } else {
    response.status(404).send()
  }
});



// ;delete
app.delete("/comentarios/:comentarioId", function (request: Request, response: Response) {

  const comentarioId: string = request.params.comentarioId
  if (cmm.retrieve(comentarioId) !== undefined) {
    cmm.delete(comentarioId)
    response.status(204).send()

  } else {
    response.status(404).send()
  }
});


//;get 
app.get('/', (request: Request, response: Response) => {
  response.send('hello world')
})

app.get("/posts", async function (request: Request, response: Response) {
  response.json(await data.retrieveAll());
  console.log(await data.retrieveAll());
});

app.get("/posts/:id", async function (request: Request, response: Response) {
  const id: string = request.params.id
  response.json(await data.retrieve(id))
  console.log(await data.retrieve(id))
});

// ;post
app.post("/posts", async function (request: Request, response: Response) {
  // const { id,text,likes} = request.body; //.posso pegar os 3 do cliente
  const idUniversal = uuidv4()
  const { text,title } = request.body;
  console.log(text,title);
  
  const newPost = new Post(idUniversal,title, text, 0);

  response.json({ newPost });
  response.status(201).send()
  await data.create(newPost);

});

//;put
app.put("/posts/:id", async function (request: Request, response: Response) {
  const id: string = request.params.id

  if (await data.retrieve(id) !== undefined) {
    const { text,title, likes } = request.body;
    if (!text || !likes || !title) {
      return response.status(400).json({ error: "text,likes e title são obrigatórios" });
    }
    const newPost = new Post(id, title,text, likes);
    response.status(200).send()
    await data.update(id, newPost.title,newPost.text, newPost.likes)

  } else {
    response.status(404).send()
  }
});


// ;patch
app.patch("/posts/:id", async function (request: Request, response: Response) {
  const id: string = request.params.id

  if (await data.retrieve(id) !== undefined) {
    const { title,text, likes } = request.body;

    const newPost = new Post(id,title, text, likes);

    response.status(200).send()
    await data.update(id, newPost.title,newPost.text, newPost.likes)

  } else {
    response.status(404).send()
  }
});


app.patch("/posts/:id/like", async function (request: Request, response: Response) {
  const id: string = request.params.id

  if (await data.retrieve(id) !== undefined) {
    const retrieveId:any = await data.retrieve(id)
    const retrieveJustLikes:number = retrieveId['likes']
    const addLike:number = retrieveJustLikes + 1

    const newPost = new Post(id, '','', addLike);

    response.json({ addLike});
    response.status(200).send()

    await data.update(id, newPost.title,newPost.text, newPost.likes)

  } else {
    response.status(404).send()
  }
});

// ;delete
app.delete("/posts/:id", function (request: Request, response: Response) {

  const id: string = request.params.id
  if (data.retrieve(id) !== undefined) {
    data.delete(id)
    response.status(204).send()

  } else {
    response.status(404).send()
  }
});


app.listen(3000, function () {
  console.log("Server is running");
});


