
function greetFactory(getName){

 

    var names = getName || [];
    var regex = /^[A-Za-z]+$/;




    function greetings(str, name){
        
        if(name.match(regex)){
            if(str === "Mandarin"){
                return "你好吗, " + name.charAt(0).toUpperCase() +  name.slice(1);
            }
            if(str === "Spanish"){
                return "Como estas, " + name.charAt(0).toUpperCase() +  name.slice(1);
            }
            if(str === "French"){
                return "Comment ça va, " + name.charAt(0).toUpperCase() +  name.slice(1);
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
    greetings,
    pushNames,
    setCounter,
    setErrors,
    greetNameList
}


}