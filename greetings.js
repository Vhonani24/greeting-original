
module.exports = function Greetings() {
    var userName = "";
    var lang;
    var names = [];
    var regex = /^[A-Za-z]+$/;


    function setNames(name) {
        userName = name;

    }

    function getNames() {
        return userName;

    }

    function setLang(language) {
        lang = language;
    }
    function getLang() {
        return lang;

    }



    function greet() {
        var greetMessage ="";

        if (getNames().match(regex)) {
            if (getLang() === "Mandarin") {
                return "你好吗, " + getNames().charAt(0).toUpperCase() + getNames().slice(1).toLowerCase();
            }
            if (getLang() === "Spanish") {
                return "Como estas, " + getNames().charAt(0).toUpperCase() + getNames().slice(1).toLowerCase();
            }
            if (getLang() === "French") {
                return "Comment ça va, " + getNames().charAt(0).toUpperCase() + getNames().slice(1).toLowerCase();
            }

        }


    }

    function pushNames(enterNames) {
        var nameToUpperCase = enterNames.charAt(0).toUpperCase() + enterNames.slice(1).toLowerCase()
        if (nameToUpperCase.match(regex)) {
            if (names.length == 0) {
                names.push({
                    name: nameToUpperCase,
                    counter: 1
                });
            } else {
                if (!names.some(names => names.name === nameToUpperCase)) {
                    names.push({
                        name: nameToUpperCase,
                        counter: 1
                    });
                } else {
                    names.forEach(element => {
                        if (element.name === nameToUpperCase) {
                            element.counter++
                        }
                    });
                }
            }


            // if(!names.includes(enterNames.replace(/(\B)[^ ]*/g, match => (match.toLowerCase())))){
            //     names.push(enterNames.replace(/(\B)[^ ]*/g, match => (match.toLowerCase())));

            // }


        }


    }
    function usernameFor(user) {
        let userInfo;
        names.forEach(element => {
            if(element.username === user){
                userInfo = {
                    name: element.name,
                    counter: element.counter
                };
            }
        });
        return userInfo;
    }

    function setCounter() {

        return names.length;
    }

    function greeted() {
        return names;
    }


    function setErrors(name, lang) {


        if (name === "" && !lang) {
            return "Please select name & language!"
        }
        if (name === "") {
            return "Please enter your name!"
        }
        if (!lang) {
            return "Please select a language!"
        }


    }
    

    function reset(){
        message = "Reset successful!";
        greet.clear();
    }



    return {
        greet,
        pushNames,
        setCounter,
        setErrors,
        greeted,
        getNames,
        setNames,
        setLang,
        getLang,
        usernameFor,
        reset
    }


}