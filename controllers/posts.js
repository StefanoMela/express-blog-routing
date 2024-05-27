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
                    html += `</ul>`
                })
                html += `</div>`
                res.send(html)
            },
        })
    },
    show: (req, res) => {
        const requestedSlug = req.params.slug;
        const reqItem = dbPosts.find(post => post.slug === requestedSlug);
        res.format({
            html: () => {
                reqItem ? res.send(`
                <div>
                    <h3>${reqItem.title}</h3>
                    <img width="200" src=${`/img/${reqItem.image}`} />
                    <p><strong>Tags</strong>: ${reqItem.tags.map(t => `<span class="tag">${t}</span>`).join(', ')}</p>
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