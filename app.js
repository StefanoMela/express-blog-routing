// import e inizializzazione di Express
const express = require('express');
const app = express();

// metodi per cartella public e lettura body req
app.use(express.static('public'));
app.use(express.json());

// import router
const postRouter = require('./routers/post');

// import data
const dbPosts = require('./data/db.js')

// inizializzaione app Express
app.get('/', (req, res) =>{

    // const indexContent =
    // `
    // <h1> Blogghino </h1>
    // <a href="/posts"> Vai alla lista dei post</a>
    // <p>oppure navigali uno per uno:</p>
    // <ul>${dbPosts.map((post) => `<li><a href="${post.slug}">${post.title}</a></li>`).join("")}
    // </ul>
    // `
    // res.send(indexContent);
    let indexContent = `
    <h1> Blogghino </h1>
    <a href="/posts"> Vai alla lista dei post</a>
    <p>oppure navigali uno per uno:</p>
    <ul>
    `;
    dbPosts.forEach(post => {
        indexContent += `
        <li><a href="/posts/${post.slug}">${post.title}</a></li>
        `;
    });
    indexContent += `</ul>`;
    res.send(indexContent);
});

app.use('/posts', postRouter)

app.listen(3000, () => {
    console.log('Server avviato su http://localhost:3000');
});