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
    ssl : {
        rejectUnauthorized:false
    }
  });


var sessionStore = new session.MemoryStore;
const exphbs = require('express-handlebars');

const Greetings = require('./greetings');
const greetings = Greetings(pool);
const getRoutes = require('./routes');
const routes = getRoutes(greetings);


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


app.get('/', routes.home);

app.get('/greeted', routes.greetedPage);

app.get('/counter/:name', routes.counterPage);

app.post('/', routes.postData);
app.post('/reset', routes.resetData);


const PORT = process.env.PORT || 2021;
app.listen(PORT, function () {
    
    console.log('App started at port:', PORT);
});


