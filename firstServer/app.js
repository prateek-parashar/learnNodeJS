const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    console.log(
        `The request URL is ${req.url} and the request method is ${req.method}`
    );

    const url = req.url;
    const method = req.method;

    if (url === "/") {
        res.write("<html>");
        res.write("<head> <title> Welcome </title></head>");
        res.write("<body>");
        res.write(
            "<form action='/message' method=POST><input type='text' name='message'><button type='submit' > Send </button></form>"
        );
        res.write("</html>");
        return res.end();
    }

    if (url === "/message" && method === "POST") {
        const body = [];
        req.on("data", (chunk) => {
            body.push(chunk);
        });

        // return req.on("end", () => {
        //     const parsedBody = Buffer.concat(body).toString();
        //     const message = parsedBody.split("=")[1];
        //     fs.writeFile("message.txt", message, (err) => {
        //         res.statusCode = 302;
        //         res.setHeader("Location", "/");
        //         return res.end();
        //     });
        // });

        return req.on("end", () => {
            let inputMessageBuffer = Buffer.concat(body).toString();
            let inputMessage = inputMessageBuffer.split("=")[1];
            fs.writeFile("message.txt", inputMessage, (err) => {
                // The below method can also be written in 2 lines by setting the status and headers indivisually
                res.writeHead(302, { Location: "/" });
                return res.end();
            });
        });
    }

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

/**
 * Node is Asynchronous in nature and it promotes the event driven architecture where we
 * give it callback functions which it dumps to the CPU, carries on with the execution of the rest
 * of the code, and then when the main stack is empty, it executes all the callback functions.
 *
 * Here, the code was changed from fs.writeFileSync() to fs.writeFile() because the Synchronous code is
 * generally avoided to prevent blocking of the thread.
 */
