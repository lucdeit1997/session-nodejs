const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(session({
    secret: 'some secret here',
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 10000,
    }
}));

app.post('/login', (req, res) =>{
    req.session.username = req.body.username;
    req.session.password = req.body.password;
    res.end('done');
});

app.get('/', (req, res) =>{
    if(req.session.username)
    {
        res.redirect('/logged');
    }
    else
    {
        res.render('index');
    }
})

app.get('/logged', (req, res) =>{

    if(req.session.username)
    {
        res.write("<h1>Sigin Sucsess</h1> <a href='/logout'>logout</a>");
        res.end();
    }
    else
    {   
        res.write("<h1>sigin fail</h1> <a href='/'>Main Page</a>");
        res.end();
    }

})

app.get('/logout', (req, res) =>{
    req.session.destroy(function(err){
        if(err)
        {
            res.negotiate(err);
        }
        res.redirect('/');
    })
})
app.listen('3000', (req, res)=>{
    console.log('server running on port 3000');
})