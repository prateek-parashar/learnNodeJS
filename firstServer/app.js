const http = require("http");

const server = http.createServer((req, res) => {
    console.log(
        `The request URL is ${req.url} and the request method is ${req.method}`
    );

    res.setHeader("Content-Type", "text/html");

    res.write("<html>");
    res.write("<head> <title> My server response </title></head>");
    res.write("<body> <h2> Hello World! </h2> </body>");
    res.write("</html>");

    res.end();
});

server.listen(3000);

/**
 * Comments -
 * THIS IS SO COOL!
 * Coming from java, it always seemed impossible to create a server without a third party container (i.e Tomcat, Glassfish)
 * the fact that node has it inbuilt is freaking amazing
 */

/**
 * The response is so much like the printerWriter that's used in Java
 */
