const Post = require("./interface/post.js")
const Collection = require("./interface/Microblog.js")
const { response } = require('express')
const express = require('express')
const { v4: uuidv4 } = require('uuid');


const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const collection = new Collection();
const uuid = uuidv4();


//;get 
app.get('/', (request, response) => {
  response.send('hello world')
})

app.get("/posts", function(request, response) {
  response.json(collection.retrieveAll());
  console.log(collection.retrieveAll()); 
});

app.get("/posts/:id", function(request, response) {
  
  id = request.params.id
  response.json(collection.retrieve(id))
  console.log(collection.retrieve(id))
});

// ;post
app.post("/posts", function(request, response) {
  const idUniversal = uuid
  const {text} = request.body; //.pegando somente text
  const newPost = new Post(idUniversal,text,0); 
  collection.create(newPost)

  response.json({newPost});
  response.status(201).send()

});

//;put
app.put("/posts/:id", function(request, response) {
  id = request.params.id

  if (collection.retrieve(id) !== null) {
    
    response.status(204).send()

  }else{
    response.status(404).send()
  }
});


// ;patch

app.put("/posts/:id", function(request, response) {
  id = request.params.id
  
  
  if (collection.retrieve(id) !== null) {
    const { id,text,likes} = request.body;
    collection.update()
    
    response.status(204).send()

  }else{
    response.status(404).send()
  }
});


// ;delete
app.delete("/posts/:id", function(request, response) {
  
  id = request.params.id
  if (collection.retrieve(id) !== null) {
    collection.delete(id)
    response.status(204).send()

  }else{
    response.status(404).send()
  }
});


app.listen(3000, function() {
  console.log("Server is running");
});


