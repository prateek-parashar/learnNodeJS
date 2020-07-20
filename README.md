# learnNodeJS

My journey to learn Node JS

---

## My comments as I went through the course

### Basics

-   THIS IS SO COOL!
    Coming from java, it always seemed impossible to create a server without a third party container (i.e Tomcat, Glassfish)
    the fact that node has it inbuilt is freaking amazing

-   The response object is so much like the printerWriter that's used in Java

-   Node is Asynchronous in nature and it promotes the event driven architecture where we
    give it callback functions which it dumps to the CPU, carries on with the execution of the rest
    of the code, and then when the main stack is empty, it executes all the callback functions.

-   Node promotes asynchronous code! Never block the event loop!
    Node has basically 2 ways to process the code - The event loop and the worker pool threads.
    The worker pool threads are utilized to do the heavy lifting (i.e. File operation / high computational tasks)
    The event loop on the other hand works best with short fast paced tasks.
    It's the job of the event loop to keep track of the callBacks attatched to the event listeners / emitters and
    execute the callback functions.
-   There is a lot more to learn and understand. More iterative reading and more sources to look at for grokking the working of node.

-   P.S. After fininshing with the first couple of modules, I can safely say that this instructor (Max from udemy) is freaking awesome!

### Npm

-   Till now, I had just heard the bad things of the node package management, now I saw it firstHand.
-   Installed the nodemon package, and it ended up installing god knows how many files!
-   Anyways, the packages from npm can be categorized in 2 ways - Development packages and production packages.
-   Use the command - `npm install (package name) --save-dev` to segregate the packages

### ExpressJS

-   ExpressJs is an unopiniated framework for nodeJS
-   It seems so similar to flask!
-   The core principle of ExpressJS is the middleware.
-   Middleware allows us to send the incoming request through multiple funnels where we can do things with it.
-   The funneling / continuation of the request is achieved in ExpressJS via the `next()` function which is passed to the callback function used in the `app.use` method.
-   If the `next()` function is not available, the request is not funneled to the next method.
-   Express makes the sending of responses damn easy! No more manual setting up of headers and sending the response using the `res.write` function.
