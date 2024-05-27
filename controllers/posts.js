// imports
const dbPosts = require('../data/db.js')
const path = require("path");

// export controller
module.exports = {
    index: (req, res) => {
        res.format({
            html: () => {
                let html = '<div>'
                dbPosts.forEach(post => {
                    html +=
                        `<img width="250" src="/img/${post.image}"/>
                    <h2>${post.title}</h2>
                    <p>${post.content}
                    <h3>tags:</h3>
                    <ul>
                    `;
                    post.tags.forEach(tag => html += `<li>${tag}</li>`);
                    html += `
                    </ul>
                    <a href="/posts/${post.slug}"> Vai al post</a>
                    <br>
                    `
                })
                html += `</div>`
                res.send(html)
            },
        })
    },
    show: (req, res) => {
        const requestedSlug = req.params.slug;
        const requestedPost = dbPosts.find(post => post.slug === requestedSlug);
        if (!requestedPost) {
            return res.status(404).send(`<h1>Post non trovato</h1>`);
        }
        res.format({
            html: () => {
                requestedPost ? res.send(`
                <div>
                    <h3>${requestedPost.title}</h3>
                    <img width="200" src=${`/img/${requestedPost.image}`} />
                    <p>${requestedPost.content}</p>
                    <p><strong>Tags</strong>: ${requestedPost.tags.map(t => `<span class="tag">${t}</span>`).join(', ')}</p>
                    <a href="/posts">torna alla lista</a>
                </div>
            `) : res.status(404).send(`<h1>Post non trovato</h1>`);
            }
        })
    },

    create: (req, res) => {
        res.format({
            html: () => {
                res.send(`<h1>Creazione nuovo post</h1>`)
            },
            default: () => {
                res.sendStatus(406);
            }
        })
    },

    download: (req, res) => {
        const slug = req.params.slug;
        const post = dbPosts.find(post => post.slug === slug)
        const downloadPath = path.join('public/img/' + post.image);
        console.log(downloadPath);
        res.download(downloadPath);
    }
}