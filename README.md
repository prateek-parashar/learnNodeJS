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
-   Express JS executes the middleware lexically from top to bottom.
-   The first arguement to the `app.use()` function can be used to define the routes.
-   Though we should beware! If the route is selected as `'/'` then the app will route to that one regardless of the other ones as setting this as the route wouldn't just include urls ending with `'/'` but rather ALL the URLS starting with `'/'`
-   We use the body-parser (earlier an external package now added into ExpressJS) to parse the incoming requests so that we can work with them easily.
-   Also, for rerouting, we use the method `req.redirect()`
-   Instead of using `app.use()` ExpressJS provides us with HTTP verb exclusive methods like `app.post()`, `app.delete()` etc.
-   Hence, using the HTTP verb exclusice methods is significantly better as they allow for filtering of requests based on the requested method type.
-   Better still, using the HTTP verb exclusiv method makes expressJS do a strict match on the URL pattern! Which means that the problem in `app.use()` which made the `'/'` get selected for all the routes, now only works strictly for `'/'`
-   Express also provides us with a Router function which is so much better at handling routes and also helps us split our route in various chunks.
-   Found suck a nice usage of the `app.use()` function, ERROR Handling! As it doesn't strictly pattern match the urls, it serves a great purpose in catching all the invalid URls requests! Just remember to always use it at the bottom, as ExpressJS middlewares work in a top to bottom fashion.
-   ExpressJS gives us a filtering mechanism that appends a common path name to all the routes so that we do not have to repeat is across the routes file.
-   The `path` module is a core module which gives us nice functionality like the `path.join()` function which allows us to create the path of the files which we need. Of course, I can stitch the path manually, but using the `path` module is great in that it makes all the path systems operating system agnostic cause different operating systems have thier own quirks (looking at you Windows).
-   Then there's the function called `path.dirname()` which gives the dirname of the passed in file.
-   To get the name of the file which acts as the entry point to the program, we use the property - `require.main.filename` which, in this case return the name of the entry point - `app.js`
-   Express gives us the method `app.use(express.static(directory name))` to allow us to serve static files.
-   Hence, Express forwards all the requests to files to the folder provided as an argument in the above function.
-   This is basically a middleware which searches for all the file references in the project at the given location.
-   The fact that we have to export the functions and variables from file to file is really annoying.

### Templating Engines

-   Express allows us to set the value of the templating engine that we are using the in the application.
-   To do that, we use the method `app.set()` where we can attatch some values to the express app (configuration setup).
-   Express has some built in values that we can set (provided in the documentation) where we can change the configurations.
-   For templating engines like HandleBars, we have to add more configurations like - importing it manually and using `app.engine()` to set teh default engine of the express app
-   So here, I successfully used the templating engine of handlebars. I have seen 2 of them until now and both of them seem ot have some issues. Pug feels really awesome to use for people who hate writing html (I am somewhere on the fence) but it isn't widely supported as I found about looking around, so I don't wanna get locked in an outlier technology. Handlebars on the other hand, is writing logic in pure HTML which, I think is the standard way to go. But handlebars seems to have little to no logic! I mean, why do you expect me to pass you boolean values handlebars? Why the hell can't I test for logic in the if statements! I get the philosophy of seperating the logic and keeping it all in one place, but that's DISPLAY logic we're talking about! Maybe it's a problem I might have later, but for now, I think we should be allowed to write logic in the HTML files and not just pass in chewed up food for the templating engine to swallow
-   Finally into EJS, Max held it back to probably highlight it's advantages as it's his favourite engine.
-   It's not all bad, though the syntax reminds me of the work I did in struts (java).
-   Writing javascript in html tags is cool. EJS kinda fixes both the issues I outlined in previously regarding handlebars and pug.
    It's great that we will be using this in this course.
-   One problem with EJS is that it doesn't have a default layout for the views, which it solves by creating partials.

### Creating controllers in Express

-   Controllers, atleast initially in the course are treated as middleware functions that work in between routes.
-   This approach is alright, but these massive and continous imports, I have a feeling, if it doesn't improve soon , it can get really complex real quick.

### Models and classes

-   Somehow, I just still don't understand classes in javascript.
-   After coding heavily in java, I don't get how the classes are constructed here.
-   I understand they are just a syntactic sugar over the prototype based inheritence, but still. What the fuck does the `this` keyword mean at all the places? How do I use getters and setters? Why the fuck are arrow functions not working? I can create functions without the arrow and also without the `function1 keyword? What the fuck java script!
-   I am making progress slowly. Revisited the course by Anthony Alicea to understand jva script. Thte talk by Venkat Subramanium - "Discovering javascript" was really enlightening. He has another one called "Rediscovering javascript" which explores the ES6 features, which I will do over time as it's over 2 hours long.
-   Fought with file methods of node to get this code working.
-   Had a first encounter with the lack of my asynchrocously thinking. I as trying to access the value which wasn't returned yet cause of the asyncronous file read operation. It was nice of Max to create a seperate video of that. And I feel great at having spotted the mistake before he aid so in the video with my own `printf` debugging skills xD.
-   Okay, I am way less behind in the callback world. Having watched the way Max solved the problem, I know that it would require more exposure to the asynchronous thinking. Whereas I solved the previous thing by modifying the read file function to a syncronous one, Max kept the function syncronous and then added `ANOTHER` callback on top of it to make it work. God damnit.

### Expanding the app

-   More and more views are getting added which expand out app and of course, as a by product, start to make it more complicated. I really enjoy the pace of this course.
