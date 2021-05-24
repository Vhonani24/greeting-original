var newUserName = document.querySelector("#theName");
//get reference to the text area element
const greetMessage = document.querySelector("#greetMessage");
//get reference to the greet button
const greetButton = document.querySelector("#success-outlined");
//get reference to the greet button
const resetButton = document.querySelector("#danger-outlined");
//get reference to the counter
const counter = document.querySelector("#counter");
//set the greeting messages
var mandarin = "你好吗, ";
var spanish = "Como estas, ";
var french = "Comment ça va, ";

//This function should get username
//should return name plus selected language 
//should increase counter

function greetMe(){
    //get reference to radio button from 
    var selectRadioBtn = document.querySelector("input[name='inlineRadioOptions']:checked");
    //get data new data from  input box
        var getUserName = newUserName.value;
        //if there is nothing save at the start then save an empty array
        if(localStorage.getItem("username") == null){
            localStorage.setItem("username", "[]");
        }
        //get old names and add to new names
        var savedUserName = JSON.parse(localStorage.getItem("username"));
        savedUserName.push(getUserName);
        //save the new + saved usernames to local storage
        localStorage.setItem("username", JSON.stringify(savedUserName));

        //if radio is selecte
        if(selectRadioBtn){
            var selectRadioBtn1 = selectRadioBtn.value;
            //if there is indeed usernames then continue
            if(localStorage.getItem("username") != null){
                if(selectRadioBtn1 === "Mandarin"){
                    greetMessage.innerHTML = mandarin + getUserName;
                }
                if(selectRadioBtn1 === "Spanish"){
                    greetMessage.innerHTML = spanish + getUserName;
                }
                if(selectRadioBtn1 === "French"){
                    greetMessage.innerHTML = french + getUserName;
                }
            }
            
            
        }




    
}

function reset(){
    localStorage.clear();
}

greetButton.addEventListener("click", greetMe)
resetButton.addEventListener("click", reset)