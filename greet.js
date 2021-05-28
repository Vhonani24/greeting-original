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
var setCounter = 1;
var savedUserName =[];
   //get old names and add to new names.
  
   if(localStorage["username"]){
     savedUserName = JSON.parse(window.localStorage.getItem("username"));
     
   }
   console.log(savedUserName);

   counter.innerHTML = savedUserName.length;
   


   function checkErrors(){
       
       var selectRadioBtn = document.querySelector("input[name='inlineRadioOptions']:checked");
       if(newUserName.value=== ""){
           greetMessage.innerHTML = "Please enter your name!";
        }
        else if(!selectRadioBtn){
            greetMessage.innerHTML = "Please choose language!";
        }
       
   
        
      
    }
  

function greetMe(){
    checkErrors();

 
    //get reference to radio button from 
    var selectRadioBtn = document.querySelector("input[name='inlineRadioOptions']:checked");
    //get data new data from  input box
        var getUserName = newUserName.value;
        //if there is nothing save at the start then save an empty array
        if(localStorage.getItem("username") == null){
            localStorage.setItem("username", "[]");
        }
     
        savedUserName.push(getUserName);
        //filter out duplicates

        let filterUniqueNames = [...new Set(savedUserName)];
        //save the new + saved usernames to local storage
        localStorage.setItem("username", JSON.stringify(filterUniqueNames));
        //set up counter
        if(localStorage["setCounter"]) {
                setCounter = filterUniqueNames.length;
                
                localStorage["setCounter"] = setCounter;
                counter.innerHTML = setCounter;
                
        }
        
     
        


        //if radio is selecte
        if(selectRadioBtn){
            var selectRadioBtn1 = selectRadioBtn.value;
            //handle the errors
           
            
            //if there is indeed usernames then continue
            if(localStorage.getItem("username") != null){
               
                if(selectRadioBtn1 === "Mandarin"){
                    greetMessage.innerHTML = "你好吗, " + getUserName;
                
                    counter.innerHTML = setCounter;
                    localStorage["setCounter"] = setCounter;
                    setCounter++;
                }
                if(selectRadioBtn1 === "Spanish"){
                    greetMessage.innerHTML = "Como estas, " + getUserName;
                   
                    counter.innerHTML = setCounter;
                    localStorage["setCounter"] = setCounter;
                    setCounter++;
                }
                if(selectRadioBtn1 === "French"){
                    greetMessage.innerHTML = "Comment ça va, " + getUserName;
                    
                    counter.innerHTML = setCounter;
                    localStorage["setCounter"] = setCounter;
                    setCounter++;
                }
                
               
            }
            
            
        }




    
}

function reset(){
    localStorage.clear();
    counter.innerHTML = 0
}

greetButton.addEventListener("click", greetMe)
resetButton.addEventListener("click", reset)