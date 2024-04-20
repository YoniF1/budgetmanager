const express = require('express');
require('dotenv').config()
const app = express()
const ejs = require('ejs'); 
const routes = require('./routes/hackroutes.js')
const router = require("./routes/router.js")

const { sessionMiddleware, excludeFromAuth } = require('./middleware/utils');


app.use(sessionMiddleware);
app.use(excludeFromAuth(['/signup', '/login']));

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/public', express.static('public')); // TODO fix app.us(express.static('public))

app.use(router) // TODO fix the routes
app.use('/', routes)

app.listen(3000, () => {
     console.log('running on 3000')
})

module.exports = {
    app
}
