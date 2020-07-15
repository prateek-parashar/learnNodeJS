let testArray = ["hello", "there", "General", 10, "kenobi"];

// Using the for - of loop 
for (let value of testArray) {
    console.log(value);
}

//Using the map function on a array
let testMapArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// Every value is mapped to another value in the array
// Map function always returns the same number of output values as in the input
console.log(testMapArray.map(x => (x % 2) == 0));

// The value of the original array is left unchanged
console.log(testMapArray);

//Copying the arrray
// A deep copy of the arrays or objects is to be preferred as we try to avoid mutability as much as possible

let originalArray = ["Chess", "Football", "Basketball"];

// The spread operator (...) is an excellent way to copy the array 
//It can be applied to objects as well as arrays and it basically expands the values / properties
let copyArray1 = [...originalArray];

console.log(copyArray1);

// We can also use the slice operator with no arguements passed to it 
let copyArray2 = originalArray.slice();
console.log(copyArray2);

// The rest operator is essentially the opposite of the spread operator
//While the spread operator is used to expand the array / object to it's values, 
// the rest operator combines various arguements to a function into an array

// the below block works but isn't versatile enough, which means that in order to increase the number of arguements, 
// we would have to change the code at the function as well
let returnArray = (arg1, arg2, arg3) => {
    return [arg1, arg2, arg3];
}
console.log(returnArray(1, 2, 3));

// Below is a rewrite of the above function using the rest operator

// let returnArrayNew = (...args) => {
//     return args;
// }

let returnArrayNew = (...args) => args;

console.log(returnArrayNew(5, 6, 7));


// Syntactically, both the spread and the rest operator use 3 dots, but the effect is quite opposite