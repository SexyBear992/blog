const express = require('express')
const path = require('path')
const body = require('body-parser')
const router = require('./routers/index.js')
const session = require('express-session')
const app = express()
// const port = 3000

app.use(session({
    secret: "1",
    cookie: {
        maxAge: 180000000
    }
}))

app.use(body.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    function (req, res, next) {
        res.set({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'x-Requested-With',
            'Access-Control-Allow-Methods': 'POST'
        })
        next();
    }
)

app.use(function (err, data, next) {
    next();
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

router(app);

app.listen(80, () => console.log(`Example app listening on port port!`))