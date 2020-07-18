const testObject = {
    name : "Richard",
    company : "Pied Piper",
    
    //here, the this keyword would refer to the object which encloses it
    printName : function () {
        console.log(this.name);
    },

    //If we use the arrow syntax, the this keyword would not refer to the enclosing object, instead it would print "undefined"
    //That behaviour is caused by the defautl jS behaviour where the this keyword refers to whoever called a method that uses this
    printNameArrow : () => {
        console.log(this.name);
    }
}

// testObject.printName();
testObject.printNameArrow();
