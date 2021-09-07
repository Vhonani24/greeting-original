const express = require('express');
const app = express();
const pg = require("pg");
const Pool = pg.Pool;

var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('express-flash');

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local){
    useSSL = true;
}
// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://vhonani:vhonani123@localhost:5432/greet';

const pool = new Pool({
    connectionString,
    ssl : useSSL
  });


var sessionStore = new session.MemoryStore;
const exphbs = require('express-handlebars');

const Greetings = require('./greetings');
const greetings = Greetings(pool);
app.engine('handlebars', exphbs({ layoutsDir: 'views/layouts/' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
//just testing flash messages
app.use(cookieParser('secret'));
app.use(session({
    cookie: { maxAge: 60000 },
    store: sessionStore,
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
}));
app.use(flash());


app.get('/', async function (req, res) {
  
    res.render('index', {
        message: req.flash('error'),
        name: greetings.getNames(),
        greetMessage: greetings.greet(),
        counter: await greetings.setCounter(),
       
       
        
        

    });
    
});
app.get('/greeted', function(req, res){
    res.render('greeted', {
        greeting: greetings.greeted(),
        
       
    });
});
app.get('/counter/:name', async function(req, res){
    const user = req.params.name;
    
    userGreeted=await greetings.individualCounter(user);

    // console.log(greetings.usernameObj(user));
    res.render('counter', {
        user,
        userGreeted
       
    
        
       
    });


});

app.post('/', async function (req, res) {
    const { body } = req;
    if (!body.lang ) {
        req.flash('error', 'Please select a language!');
        return res.redirect('/');
    }
    if(!body.name){
        req.flash('error', 'Please enter your name!');
        return res.redirect('/');
    }
    else{
        greetings.setNames(req.body.name);
        greetings.setLang(req.body.lang);
        await greetings.pushNames(req.body.name);
        await greetings.setCounter();
        greetings.greeted();
       
        res.redirect("/");

        // console.log(greetings.greeted())


    }
    
    
        
});
app.post('/reset', async function (req, res){
    await greetings.resetDatabase();
    res.redirect('/');

});


const PORT = process.env.PORT || 2021;
app.listen(PORT, function () {
    
    console.log('App started at port:', PORT);
});


