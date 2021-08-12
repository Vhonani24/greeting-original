const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const Greetings = require('./greetings');
const greetings = Greetings();
app.engine('handlebars', exphbs({ layoutsDir: 'views/layouts/' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
//just testing flash messages
const cookieParser = require('cookie-parser')
const session = require('express-session')
app.use(cookieParser('secret'))

app.use(session({cookie: {maxAge: null},
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    secret: 'secret'
   
}))

//app.use(flash());
//flash message middleware
app.use((req, res, next)=>{
    res.locals.message = req.session.message
    delete req.session.message
    next()
})
  



//-------------------------------
app.get('/', function (req, res) {
    res.render('index', {
        name: greetings.getNames(),
        greetMessage: greetings.greet(),
        counter: greetings.setCounter(),
       
        
        

    });
    
});


app.post('/', function (req, res) {
    if(req.body.name == "" || req.body.lang == ""){
        req.session.message = {
            type: 'danger',
            intro: 'Empty fields!',
            message: 'please enter the requested information'

        }

    }
    else{
        greetings.setNames(req.body.name);
        greetings.setLang(req.body.lang);
        greetings.pushNames(req.body.name);
        greetings.setCounter();
        res.redirect("/");
        

    }



    


});



const PORT = process.env.PORT || 2021;
app.listen(PORT, function () {
    
    console.log('App started at port:', PORT);
});
