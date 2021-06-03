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
        
        //if there is nothing save at the start then save an empty array
        if(localStorage.getItem("username") == null){
            localStorage.setItem("username", "[]");
        }

        selectLang.pushNames(getUserName);
        /*if(getUserName != ""){
            savedUserName.push(getUserName);
            //filter out duplicates

        }*/
        
        




        let filterUniqueNames = [...new Set(getName)];
        //save the new + saved usernames to local storage
        localStorage.setItem("username", JSON.stringify(filterUniqueNames));
        //set up counter
        if(localStorage["setCounter"]) {
                setCounter = filterUniqueNames.length;
                
                //localStorage["setCounter"] = setCounter;
                counter.innerHTML = selectLang.setCounter();
                
        }
        
     
        //greetMessage.innerHTML = selectLang.setErrors(getUserName,selectRadioBtn);


        //if radio is selecte
        if(selectRadioBtn){
            var selectRadioBtn1 = selectRadioBtn.value;
            //handle the errors 
            
            //if there is indeed usernames then continue
            if(localStorage.getItem("username") != null){

                selectLang.greetings(selectRadioBtn1,getUserName);
                if(selectRadioBtn1 && getUserName){
                    greetMessage.innerHTML = selectLang.greetings(selectRadioBtn1,getUserName);
        
                }

           
                   
                
                    counter.innerHTML = selectLang.setCounter();
                    //localStorage["setCounter"] = setCounter;
                    //setCounter++;
                
         
               
            }
            
            
        }




    
}

function reset(){
    localStorage.clear();
    counter.innerHTML = 0
}

greetButton.addEventListener("click", greetMe)
resetButton.addEventListener("click", reset)