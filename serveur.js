const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('pages/index.ejs');
});

app.get('/login', function(req, res) {

    const username = req.body.username;
    const password = req.body.password;

    res.render('pages/login.ejs', {username, password});
});

app.get('/dl', function(req, res){
    const file = `${__dirname}/public/img/pepo.jpg`;
    res.download(file);
});

app.get('/chapitre/:nombre', function(req, res){
    res.render('pages/chapitre.ejs', {
        chap : req.params.nombre
    });
});


app.use(function(req, res, next){
    res.status(404).render('pages/404.ejs');
});

app.listen(8080);