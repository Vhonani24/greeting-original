
module.exports = function Greetings(getName){

 
    var userName = ""; 
    var lang;
    var names = getName || [];
    var regex = /^[A-Za-z]+$/;

function setNames(name){
    userName = name;

}

function getNames(){
    return userName;

}
   
function setLang(language){
    lang = language;
}
function getLang(){
    return lang;

}


    function greet(){
        
        if(getNames().match(regex)){
            if(getLang() === "Mandarin"){
                return "你好吗, " + getNames().charAt(0).toUpperCase() +  getNames().slice(1).toLowerCase();
            }
            if(getLang() === "Spanish"){
                return "Como estas, " + getNames().charAt(0).toUpperCase() +  getNames().slice(1).toLowerCase();
            }
            if(getLang() === "French"){
                return "Comment ça va, " + getNames().charAt(0).toUpperCase() +  getNames().slice(1).toLowerCase();
            }

        }
       
    }

    function pushNames(enterNames){
        if(enterNames.match(regex)){

            if(!names.includes(enterNames.replace(/(\B)[^ ]*/g, match => (match.toLowerCase())))){
                names.push(enterNames.replace(/(\B)[^ ]*/g, match => (match.toLowerCase())));
            }
    

        }

        
    }

    function setCounter(){
        
        return names.length;
    }
   
    function greetNameList(){
        return names;
    }
    

    function setErrors(name,lang){
      

        if(name === "" && !lang){
            return "Please select name & language!"
        }
        if(name===""){
            return "Please enter your name!"
        }
        if(!lang){
            return "Please select a language!"
        }
       
         
    }

    

return{
    greet,
    pushNames,
    setCounter,
    setErrors,
    greetNameList,
    getNames,
    setNames,
    setLang,
    getLang
}


}