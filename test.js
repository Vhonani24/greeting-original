describe('The greet function', function(){
    it('should be able to take in a name and store into local storage', function(){

        let testGreet = greetFactory();

       

       
        assert.equal( 'ted', testGreet.savedUserNames());
    });

});