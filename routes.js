module.exports = function myGreetingsRoutes(greetings) {

    async function home(req, res) {

        res.render('index', {
            message: req.flash('error'),
            name: greetings.getNames(),
            greetMessage: greetings.greet(),
            counter: await greetings.setCounter(),





        });

    }
    async function greetedPage(req, res) {
        res.render('greeted', {
            greeting: greetings.greeted(),


        });
    }
    async function counterPage(req, res) {
        const user = req.params.name;

        userGreeted = await greetings.individualCounter(user);

        // console.log(greetings.usernameObj(user));
        res.render('counter', {
            user,
            userGreeted




        });


    }
    async function postData(req, res) {
        const { body } = req;
        if (!body.lang) {
            req.flash('error', 'Please select a language!');
            return res.redirect('/');
        }
        if (!body.name) {
            req.flash('error', 'Please enter your name!');
            return res.redirect('/');
        }
        else {
            greetings.setNames(req.body.name);
            greetings.setLang(req.body.lang);
            await greetings.pushNames(req.body.name);
            await greetings.setCounter();
            greetings.greeted();

            res.redirect("/");
        }



    }
    async function resetData(req, res){
        await greetings.resetDatabase();
        res.redirect('/');
    
    }
    return {
        home,
        greetedPage,
        counterPage,
        postData,
        resetData
    }

}