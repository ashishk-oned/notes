// const http = require('http')
const express = require('express');
const cors = require('cors');

let notes = [
  { id: 1, content: "HTML is easy", important: true },
  { id: 2, content: "Browser can execute only JavaScript", important: false },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/JSON' })
//   response.end(JSON.stringify(notes))
// })

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
// api endpoint
app.get('/api/notes', (request, response) => {
    response.json(notes)
  })

  //single resource routes using request parameters
app.get('/api/notes/:id',(request, response)=>{
    const id = Number(request.params.id);
    const note = notes.find(notes=>notes.id===id);
    //console.log(note);
    if (note){
        response.json(note);
    }
    else{
        response.status(404).end();
    }
    
})

//deleting resources

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
  })


//recieving data


const maxId = () => notes.length >0 ? Math.max(...notes.map(x=>x.id)):0;
function genNote(content,important){
    return {
        id:maxId()+1,
        content,
        important,
        date:new Date()


    }
    // this.id = maxId()+1;
    // this.content = content;
    // this.important = important;
    // this.date = new Date();

}

app.post('/api/notes', (request, response) => { 
    const body = request.body ;
    const content = body.content;
    const important = body.important||false;
    if (!content){
        return response.status(400).json({
            eroor:"content missing"
        })
    }
    else {
        const note = genNote(content,important);
        notes = notes.concat(note);
        console.log(note);
        response.json(note);
    }
    
});


const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);