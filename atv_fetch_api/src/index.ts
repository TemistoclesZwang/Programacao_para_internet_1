// import {Express} from 'express';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Data } from './interface/Microblog';
import { Post } from './interface/post';
import express = require('express');
import cors from 'cors';

// const data = require("./data/data.json");

const app = express()
const data = new Data();

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));



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
  const { text,title } = request.body; //.pegando somente text
  const newPost = new Post(idUniversal,title, text, 0);

  data.create(newPost)
  console.log(newPost);
  
  response.json({ newPost });
  response.status(201).send()

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

    response.status(200).send()
    await data.update(id, newPost.title,newPost.text, newPost.likes)

  } else {
    console.log();
    
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


