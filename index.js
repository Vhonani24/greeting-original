const express = require('express');
const app = express();


var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('express-flash');

var sessionStore = new session.MemoryStore;
const exphbs = require('express-handlebars');

const Greetings = require('./greetings');
const greetings = Greetings();
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


app.get('/', function (req, res) {
  
    res.render('index', {
        message: req.flash('error'),
        name: greetings.getNames(),
        greetMessage: greetings.greet(),
        counter: greetings.setCounter(),
       
       
        
        

    });
    
});
app.get('/greeted', function(req, res){
    res.render('greeted', {
        greeting: greetings.greeted(),
        
       
    });
});
app.get('/counter/:name', function(req, res){
    const user = req.params.name;
    // console.log(greetings.usernameObj(user));
    res.render('counter', {
        userGreeted: greetings.usernameObj(user)
    
        
       
    });


});

app.post('/', function (req, res) {
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
        greetings.pushNames(req.body.name);
        greetings.setCounter();
        greetings.greeted();
       
        res.redirect("/");

        // console.log(greetings.greeted())


    }
    
    
        
});


const PORT = process.env.PORT || 2021;
app.listen(PORT, function () {
    
    console.log('App started at port:', PORT);
});


