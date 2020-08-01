const fucktionA = () => {
    console.log("Fucktion A is called");
};

const fucktionB = (x, cb) => {
    cb(x);
    x++;
    console.log("fucktionB is called");
    console.log(x);
};

fucktionB(10, (x) => {
    console.log("fucktion callback is called " + x + " times");
});
