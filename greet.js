var newUserName = document.querySelector("#theName");
//get reference to the text area element
const greetMessage = document.querySelector("#greetMessage");
//get reference to the greet button
const greetButton = document.querySelector("#success-outlined");
//get reference to the greet button
const resetButton = document.querySelector("#danger-outlined");
//get reference to the counter
const counter = document.querySelector(".counter");

//This function should get username



//should return name plus selected language 
//should increase counter
//var setCounter = 1;
var getName;
var regex = /^[A-Za-z]+$/;

   //get old names and add to new names.

  
   if(localStorage["username"]){
     getName = JSON.parse(window.localStorage.getItem("username"));
     
   }
   //console.log(savedUserName);
let selectLang = greetFactory(getName);
   

counter.innerHTML = selectLang.setCounter();
   


   
   
  

function greetMe(){
    
    //get reference to radio button from 
    var selectRadioBtn = document.querySelector("input[name='inlineRadioOptions']:checked");
    //get data new data from  input box
        var getUserName = newUserName.value;
        //set up regex
      

        getUserName = getUserName.charAt(0).toUpperCase() + getUserName.slice(1);
        

        
        

        
       
        
        //if there is nothing save at the start then save an empty array
        if(localStorage.getItem("username") == null){
            localStorage.setItem("username", "[]");
        }
        
       
        selectLang.pushNames(getUserName);
        
        
        




        let filterUniqueNames = [...new Set(getName)];
        //save the new + saved usernames to local storage
        localStorage.setItem("username", JSON.stringify(filterUniqueNames));
        
        //set up counter
        if(localStorage["setCounter"]) {
                setCounter = filterUniqueNames.length;
                
                
                counter.innerHTML = selectLang.setCounter();
                
        }
       
       
        //if radio is selecte
        if(selectRadioBtn){
            var selectRadioBtn1 = selectRadioBtn.value;
          

            //if there is indeed usernames then continue
            if(localStorage.getItem("username") != null){

                selectLang.greetings(selectRadioBtn1,getUserName);
                if(selectRadioBtn1 && getUserName){
                    if(getUserName.match(regex)){
                        greetMessage.innerHTML = selectLang.greetings(selectRadioBtn1,getUserName);
                    }else{
                        greetMessage.innerHTML = "Please enter a valid name!!"
                    }
                   
 
        
                } counter.innerHTML = selectLang.setCounter();
                    
                
         
               
            }
            
            
        }
         //error messages
         if (selectLang.setErrors(getUserName, selectRadioBtn1) !== undefined) {

         greetMessage.innerHTML =  selectLang.setErrors(getUserName, selectRadioBtn1);
         }

    
}

function reset(){
    localStorage.clear();
    counter.innerHTML = 0
}

greetButton.addEventListener("click", greetMe)
resetButton.addEventListener("click", reset)