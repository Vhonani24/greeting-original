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

var greets = "";


app.get('/', function (req, res) {
    res.render('index', {
        greets,
    });
    
});


app.post('/greeted', function (req, res) {
    console.log("hello");
    res.redirect("/");

});

const PORT = process.env.PORT || 3030;
app.listen(PORT, function () {
    console.log('App started at port:', PORT);
});
