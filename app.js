const express = require('express');
require('dotenv').config()
const app = express()
const ejs = require('ejs'); 
const router = require("./routes/router.js")
const { sessionMiddleware, excludeFromAuth } = require('./middleware/utils');


app.use(sessionMiddleware);
app.use(excludeFromAuth(['/signup', '/login']));

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/public', express.static('public'));
app.use(router)

app.listen(3000, () => {
     console.log('running on 3000')
})

module.exports = {
    app
}