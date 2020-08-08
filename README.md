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
-   The speed with which the development of new features after the initial groundwork has been laid astonished me. But I think it will slow down as the complexity will grow more in size as well and the current groundwork will not be enough to hold on as the cracks begin to show up. I wonder if there's a relation to the amount of time it takes to add n number of features can to the way a developer feels about maintaining the app.
-   I still have a lot to learn about the database modelling and ways to structure my code better. Probably should start with the data base design or data oriented design soon.
-   Dynamic Routing is handled nicely here, although, I am not sure if this is the best way, since we are exposing the product id in the URL. I don;t know maybe it is the best way, I will explore other apps to verify.
-   The fact that the request flow is dependent entirely on the order in which the code is written lexically still bothers me and I think could be a source of errors. I wonder how and why the Express people decided on this approach.
-   One possible source of error which was shown by Max was like this : Suppose the route for dynamiclly accessing the product is like this - `product/:productID` and if perchance one ends up putting this **above** the route for say, delete which might be `product/delete` the dynamic route for deleting the product will never be reached as it will be considered a dynamic value which satisfies the condition for the dynamic access.
-   For accessing the data values sent from the view to the backend, we have to use `req.params.{value}` for `GET` requests and `req.body.{value}` for `POST` requests
-   We can also access the query parameters of the request by `req.query{value}`.
-   The query parameters are passed by changing the URL dynamically.

### SQL DataBases

-   I am diverging from the course, while Max will use the MySql db, I will use the postgresDB for the project.
-   Wrote the `Database.js` method to test the connection to the database which seemed to work just fine. I am using this package called as `pgp-promise`. A package which entirely depends on one single maintainer!!! I can't understand how a company can decide to build thier product relying on node modules. I mean, it seems quite unreliable. Perhaps, then it must drive the developers to have a much deeper undersntanding on how the entire package works under the hood so that they could make changes to it as they see fit in case of an unreliability / lack of maintainance. I understand that software doesn't rust (Thanks to Joel) but still, it isn't as if this module is an independent offering! It itself fepends on multiple things, which is just too many moving parts and this just screams like a disaster waiting to happen. Maybe I am not experienced enough to see it, and maybe it will be okay, but I don't like it at all even by thinking of it.
-   Saw a weird syntax (weird to me maybe cause I am new to it) today while instantiating the `pgp` object. The syntax is like this -

```
    const pgp = require("pg-promise")();
```

Notice the extra pais of parenthesis at the end of the import statement. I had never seen them before, and even if it was evidently highlighed in the documentation, I missed them completely and ended up on the github issue where the author of the library had explained earlier (2015) to a user to just RTFM properly, lol.

-   Created a successful postgres table and connected and retrieved data form it via the `pgp-promise` node package. A weird thing I faced was with inserting rows into the postgres table, apparently it reserves the double qoutes for the column names and table names explicitly. See [this](https://stackoverflow.com/questions/41396195/what-is-the-difference-between-single-quotes-and-double-quotes-in-postgresql) for more details if I ever need them.
-   Moving on to sequelize now
-   Using an ORM always feels so sooo freaking good. Max really wasted a lot of time getting every single CRUD operation to work with the file based system, as it's an entirely useless exercise. Anyways, since CRUD operations are so easy, it becomes so much more easier to just focus on the business use cases. Programming in today's world relies entirely on so many abstractions that it is easy to sometimes forget the layers and layers of hard work done by a few who make it easy for all of us to focus on just our core business logic.
-   The importing of the `sequalize` object and the `sequalize.sync()` method both are a little finnicky. THe didn't pick up my User definition and just weren't ready to create a table for me!! Worked only when I imported it manually to the `app.js` file.
-   Sequalize is freaking amazing!!!!! Though, the creator of `pgp-promise` Vitaly has mentioned that there might be performance issue with it, it still is an amazing ORM for node. Something which I am seeing here, and didn't yet in `hibernate` is the constant usage of `associations` for example, the ability to create Model entities completely based on the relation that they share. In this example, suppose a `User` object has a `one-to-many` relation with the `products` that it can create, then sequlize provides us a method to create a `product` with an instance of a `User`! How much I find this exciting maybe just a reminder to myself of how little I understand the power of relational databases. Gotta work more on that.
-   Now I am going to move quickly through the sql lectures, as I would like to work with MongoDB straight away.

### NOSQL DataBases

-   Got a first look ever at a NOSQL database -> MongoDB (From the word hu*mongo*us clever!).
-   So, comparing the terminology, from the sql databases to the nosql databases,
    -   Table -> Collection
    -   Rows/Relations -> Documents
-   More points to note :
    -   A document in the mongDB does not follow a schema! Which means, it's perfectly fine to save a product without any price and you don't have to insert `null` as you would in an SQL database.
    -   MongoDB stores data in JSON format (Actually it's BSON short for Binary JSON, something which mongo converts JSON to for performance improvements).
-   MongoDB allows and even invites us to create fewer relations by envouraging nested documents in the in the Collections. Even so, relations are perfectly possible and shold be used if the data duplication is too high.
-   Cool!, we will be using cloud!! MongoDB Atlas baby! This is my first interaction with a remote cloud database, if you don't count postgres in the heroku world. This is what I wanted when I signed up for this course!
-   Connecting to and utilizing the cloud database for mongoDB feels great!
-   This constant rewriting of the CRUD operations has become combersome now, thankfully, this will be the last and we move on to more interesting topics like authentication. Oh wait, there's the usage of Mongoose after this. lol
-   The way that MongoDB handles object id is interesting and quite different. You have to create a special object using the mongoDB object to access the object id.
