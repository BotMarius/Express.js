const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const app = express();

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = {
    hello: () => {
      return 'Hello world!';
    },
  };

app.use(bodyParser.urlencoded({
    extended: false
}));

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('pages/index.ejs');
});

app.get('/login', function(req, res) {
    res.render('pages/login.ejs');
});

app.post('/auth/login', function(req, res) {
    let logged = false;
    const username = req.body.username;
    const password = req.body.password;

    if(username === "admin" && password === "admin") {
        logged = true;
    }

    res.render('pages/dashboard.ejs', {username, password, logged});
});

app.get('/dl', function(req, res){
    const file = `${__dirname}/public/img/pepo.jpg`;
    res.download(file);
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }));

app.get('/chapitre/:nombre', function(req, res){
    res.render('pages/chapitre.ejs', {
        chap : req.params.nombre
    });
});


app.use(function(req, res, next){
    res.status(404).render('pages/404.ejs');
});

app.listen(8080);