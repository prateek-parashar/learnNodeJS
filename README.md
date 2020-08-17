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
-   The way that MongoDB handles object id is interesting and quite different. You have to create a special object using the mongoDB object to access the object id, which it stores in the variable `_id`
-   MongoDB gives us 2 ways to update the any document we have in the collection. `replace` or `update` both of which are used in thier own way.
-   Didn't work through all the methods for the MongoDB thing as we have to move towards Mongoose which is an ODM (Object Document Mapping) basically an implementation of the ORM in the NoSQL world.
-   Mongoose promotes the schema based architecture, so we kind of go to forcing the schema ways that are prevalent in the SQL world.
-   In mongoose, you first create a schema and then create a model based on that schema! Which, kinda feels like a way to imitate the POJOs of Java.
-   Yeah, it kinda works that way itself, so it kinda extends the model and gives it methods to do the CRUD operations directly instead of relying on any external DB object.
-   We can also embbed documents inside other documents in MongoDB, which is kinda similar to the work we do in java with Hibernate.
-   We can create relations in mongoose with the help of the `ref` keyword and manually inserting the ID of the required model to another model. This is, of course apart from using embbeded dcuments.
-   Mongoose allows us to define our own methods in the schema
-   The `populate` method of mongoose is very powerful as it allows us to extract data of the referenced (related, associated) object
-   `exports.addOrder` this method is very suspiciously written.
-   Always remember to restart after changes in the ejs files
-   The suspicious part in the method `exports.addOrder` is the part where we ill in the product data by just using the products id by the method `productID._doc`, which tells mongoose to fetch the data, kind of a similar operation which populate did.

### Authentication

-   Done with all the basic CRUD operations.
-   Starting off with the most naive solution to handle a login session is the request driven solution where we set the `req.isLoggedIn` parameter and then set it to true on a successful login. And then send this value to every view and check for it before rendering the pages. This is clearly not worth even looking at since the date from a request is gone the moment even a single response is rendered. The only thing we can get from this is that each and every request is viewed as an independent request.
-   Cookies are an elegant way to handle the login session conundrum. Cookies are headers that we can set from the backend, and it gets saved in the browser of the user. The fact that they are saved in the browser of the user makes sure that they are isolated from one user to another.
-   Once they are set, cookies are sent along with every subsequent requests to the server which means that cookies are a cross request data storage object.
-   Cookies however are not the correct way to store sensetive data such as the `isLoggedInParameter` as they can be edited from the dev tool. They are best left to tracking users.
-   Sessions are the solution that was raised in the last point. Session is stored server side, but we ues the cookies (called `session cookies`) to store the id of the session, which we hash and store server side, which allows us to make sure that a user remains in the session for all the requests, and at the same time, he cannot assume a different identity or bypass the login functionality by changing the session as it is hashed and stored in the server side.
-   The `express-session` package, after being added as a middleware, sets a session attribute to the `req` object and we can add more data to the session object.
-   Sessions are a powerful construct which allows us to save user data which we do not want to lose for every request and which is also not public enough to be directly stored in a cookie.
-   Ofcourse, for a saving the session in server side, we have to do it in a database, which is done quite easily with the help of `connect-mongodb-session`.
-   Using `bcrypt` for encrypting the passwords.
-   Route protection was an intersting topic. The way the requests flow can be manipulated in express really shines through in implementing such a logic.
-   CSRF attacks are interesting and so is the way that they are handled. We use a CSRF token to prevent them. The package we use to generate the token in express is `csurf`.
-   The CSRF token is something we keep track of only on our rendered view and not on the session, as the latter can be stolen. We do this by keeping a hidden input field and setting the value to the securely generated CSRF token from server side. The package that we are using here, `csurf` mandates that the hidden input field where we set the token should be named as `_csrf`
-   The csrf input field should be present in every view and in every form as the main point of CSRF is to prevent `POST` request from malicious user.
-   `req.locals.{variable}` is godsend!!
-   Flash messages are an effective way to provide feedback to the user. They are convinient and are utilized in a `use and throw` manner by attatching and removing them from the session so as now to pollute the session variable. We use the package `flash-connect`.
-   Sent a mail via node from the `nodemailer` server called `ethreal`.
-   Just to remind myself again, so far I have seen all these ways to extract information from the `req` object:
    -   `req.body` - From input fields
    -   `req.params` - From the url, set in the routes (eg - `/edit/:productID`)
    -   `req.session` - Of course, can only be accessed if we set the session object.

### Data Validation and Error handling

-   `express-validator` is for data validation.
-   Works in a similar way to things like the `flash messages` and the `session` libraries, by being added in the middle ware, however, it's actively added whereever required in the `routes` rather than being added in the `app.js` file only once.
-   `express-validator` has a rich library of validation functions that we can use to validate our date. And of course, it allows us to create custom validator functions. After all, what is a validator but an if else function.
-   The validator module has a lot of functionality. The way that we are using to identify which parameters has the error and to change the class of that form parameters (this piece of code here - `validationError.find(e => e.param === 'email') ? 'invalid': ''`) this uses the error object created by the validator module which has a param field to keep track of the parameters.
-   Apart from validation, this node module also provides a lot of data sanitization methods which allow us to trim white spaces (`.trim()`), normalize the case on input (used while saving email addresses) and even security sanitization.

### Error Handling

-   There will be errors in the application.
-   Errors can be cause by different things -

    -   Technical or Network errors (DB Down! Server failure!)
        Can't do much about it, best case scenario would be to show an apologetic error page to the user and maybe send an email to the system administrator.
    -   User Errors or Expected errors (Uploaded file type is incorrect, data validation, File size is too high to read)
        In these cases, we should first inform the user and then allow them to retry
    -   Bugs and Logical errors
        Can't be handled on runtime, should be eliminated during testing and development.

-   For synchrocous operations, we have the `try-catch` mechanisms to handle errors and in asynchronous operations, we use the `then-catch` mechanism.
-   After the error has occured, we might handle it by displaying an error page, redirecting the user or keep the user on the same page and display the error message to guide the user further.

-   Express provides us with its own central error handler where we pass in the error object to the `next` function of the request. Upon receiving such a request, express skips all other middlewares and calls in the special error middleware (which has to be defined by us) which looks like this `app.use((err, req, res, next) => {})` wherein we can handle our errors as appropriate.
-   The above is a neat solution rather than just writing `console.log(err)` in each and every catch block, which in my opinion does nothing for the user.
-   The express error handling middleware works differently for sync and async code. To reach the express error handler from sync code, we can simple throw the error like `throw new Error()` but for async code, we have to pass the error inside the `next` function.
-   One problem I encounterd while working on this was the triggering of infinite loop on the error checking mechanism for the user sesssion. It was triggered cause the middleware where I assign the user to the session executes every time a request is sent, and since I was redirecting the request in my error handling middleware, I ended up causing an infinite back and forth between the 2 middleware function. Should avoid that.
-   For every redirection / error or more generally every freaking response, we should adhere to the standart status codes. Exhaustive list here -> https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

### File uploads and downloads

-   Files cannot be handled with simple `urlencoding`, that works only for text. We set the following enctype `enctype="multipart/form-data"` in the form to inform the server the the form will contain different types of data and not just text.
-   Express uses the package `multer` to parse the form data other than the text (we use `app.use(express.urlencoded({ extended: true }));` to handle that).
-   Multer is a middleware that we add on to express, it constantly monitors requests which contains multipart form data and then extracts the files from them.
-   For accesing the files and images sent via the request, we use the parameter - `req.file`.
-   We set the `destination` parameter in the multer configuration to save and convert the buffer of data sent to us via the request into a single file.
-   This is the first time I had an experience with uploading the files and seving them to the user. Big revealation in this module was the fact that the file is never stored in the database (too inefficient) but instead on the file system itself. What we do store in the database is the path to the file in the file system.
-   Be careful in the way that express handles static folders / files. It can cause unneccesary headache. Remember that with the simple middleware like this -> `app.use(express.static(path.join(rootDir, "public")));` express assumes that whatever folder you are passing to it, resides in the root folder of the project. You can modify this behaviour.
-   For giving the option to download files, make sure to set the headers appropriately which allow the browser to parse the incoming data to the appropriate file type.
-   Downloads can be allowed in 2 different ways, one where node loads all of them in memory and then serves them, which is very inefficient. The efficient way is by creating a write stream because the response object in express (or even node) is a writable stream.
-   Authentication and authorization for the users should be taken care of at each and every step! Never allow one user to access links / urls which are meant for another user. Keep checking and verifying the user and the data that you are sending again and again. This feels tedious. Have to look at places to find if there are way sto manage it in a better manner.
-   We use the package `pdfkit` to generate pdfs on the fly. We can customize and format the pdf. Refer the documentation to read more.

### Pagination

-   Pagination is simply achieved by the `limit` and `skip` functionality of the databases. Then the headache is about creating the buttons and the user navigation for the first, last, next and previous pages.
-   Note to self, NEVER TURN ON THE ERROR HANDLING ROUTES ON EXPRESS JS WHILE DEVELOPING. While they may be really appropriate for the end user as you don't want them to see the error messages, it is vital that I get the error message while developing myself right in the freaking browser.
