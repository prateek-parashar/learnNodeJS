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