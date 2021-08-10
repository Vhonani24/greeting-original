const express = require('express');
const app = express();
const exphbs = require('express-handlebars');

var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
var sessionStore = new session.MemoryStore;


const Greetings = require('./greetings');


const greetings = Greetings();
app.engine('handlebars', exphbs({ layoutsDir: 'views/layouts/' }));
app.set('view engine', 'handlebars');

app.use(cookieParser('secret'));
app.use(session({
    cookie: { maxAge: 60000 },
    store: sessionStore,
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
}));
app.use(flash());



app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

var greets = "";


app.get('/', function (req, res) {
    res.render('index', {
        name: greetings.getNames(),
        greetMessage: greetings.greet(),
        counter: greetings.setCounter(),
        expressFlash: req.flash('success'), sessionFlash: res.locals.sessionFlash
        

    });
    
});


app.post('/greeted', function (req, res) {
    greetings.setNames(req.body.name);
    greetings.setLang(req.body.lang);
    greetings.pushNames(req.body.name);
    greetings.setCounter();
    req.flash('info', 'Flash Message Added');
    res.redirect("/");

});

const PORT = process.env.PORT || 2021;
app.listen(PORT, function () {
    
    console.log('App started at port:', PORT);
});
