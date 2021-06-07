//start with the greeting message function
//pushing names into a list , function
//create a counter function....can just return the list length as counter
//handle errors messages

function greetFactory(getName){

 

    var names = getName || [];
    var regex = /^[A-Za-z]+$/;




    function greetings(str, name){
        
        if(name.match(regex)){
            if(str === "Mandarin"){
                return "你好吗, " + name;
            }
            if(str === "Spanish"){
                return "Como estas, " + name;
            }
            if(str === "French"){
                return "Comment ça va, " + name;
            }

        }
       
    }

    function pushNames(enterNames){
        if(enterNames.match(regex)){

            if(!names.includes(enterNames)){
                names.push(enterNames);
            }
    
            console.log(names);
    

        }

        
    }

    function setCounter(){
        return names.length;
    }

    function setErrors(name,lang){
      

        if(name === "" && !lang){
            return "Please select name & language "
        }
        if(name===""){
            return "Please enter your name!"
        }
        if(!lang){
            return "Please select a language!"
        }
       
         
    }

    

return{
    greetings,
    pushNames,
    setCounter,
    setErrors
}


}