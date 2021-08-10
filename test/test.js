const assert = require('assert');

const Greetings = require('../greetings');

describe('The greet function', function(){
    describe('Greetings', function(){
        it('should be able to take in a name and return a greeting in Spanish and that name with the first letter uppercased', function(){

            let testGreet = Greetings();
            assert.equal( 'Como estas, Ted', testGreet.greetings('Spanish', 'ted'));
        });
        it('should be able to take in a name and return a greeting in Mandarin and that name with the first letter uppercased', function(){
    
            let testGreet = Greetings();
            assert.equal('你好吗, Ted', testGreet.greetings('Mandarin', 'ted'));
        });
        it('should be able to take in a name and return a greeting in French and that name with the first letter uppercased', function(){
    
            let testGreet = Greetings();
            assert.equal('Comment ça va, Ted', testGreet.greetings('French', 'ted'));
        });

    });
    describe('Counter', function(){
        it('Should be able to return the count number if one person greeted', function(){

            let testGreet = Greetings();

            testGreet.pushNames('Musa');
            testGreet.greetings('French', 'musa');
            
            assert.equal( 1, testGreet.setCounter());
         
        });
        it('Should be able to return the count number if same person greetet in all 3 langauges', function(){

            let testGreet = Greetings();

            testGreet.pushNames('Musa');
            testGreet.pushNames('Musa');
            testGreet.greetings('French', 'musa');
            testGreet.greetings('Mandarin', 'musa');
            testGreet.greetings('Spanish', 'musa');
            
            assert.equal( 1, testGreet.setCounter());
         
        });
        
        

    });
    describe('Name list', function(){
        it('Should be able to return the list of all the names greeted', function(){

            let testGreet = Greetings();

            testGreet.pushNames('Musa');
            testGreet.pushNames('Mulalo');
            testGreet.pushNames('Naledi');
            testGreet.pushNames('Piet'); 
            
            assert.deepEqual(['Musa','Mulalo','Naledi','Piet'], testGreet.greetNameList());     
          
         
        });
        it('Should be able to return the list of all the names greeted', function(){

            let testGreet = Greetings();

            testGreet.pushNames('Mulalo');
            testGreet.pushNames('Mulalo');
            testGreet.pushNames('Mashudu');
        
            assert.deepEqual(['Mulalo','Mashudu'], testGreet.greetNameList());      
         
        });
        

    });
    describe('Error Messages', function(){
        it('Should be able to return an error message if name is name  is not entered and language is not selected', function(){

            let testGreet = Greetings();


            assert('Please select name & language!', testGreet.setErrors("", null));      
         
        });
        it('Should be able to return an error message if name is  not entered', function(){

            let testGreet = Greetings();

            assert('Please enter your name!', testGreet.setErrors("", "Spanish"));      
         
        });
        it('Should be able to return an error message if language is not selected', function(){

            let testGreet = Greetings();

            assert('Please select a language!', testGreet.setErrors("Mashudu", null));      
         
        });     
        

    });
    

});