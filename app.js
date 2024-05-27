// import e inizializzazione di Express
const express = require('express');
const app = express();

// metodi per cartella public e lettura body req
app.use(express.static('public'));
app.use(express.json());

// import router
const postRouter = require('./routers/post');

// inizializzaione app Express
app.get('/', (req, res) =>{
    res.end(`
    <h1> Blogghino </h1>
    <a href="/posts"> Vai alla lista dei post</a>
    `)
});

app.use('/posts', postRouter)

app.listen(3000, () => {
    console.log('Server avviato su http://localhost:3000');
});