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

        req.on("close", () => {
            let inputMessageBuffer = Buffer.concat(body).toString();
            let inputMessage = inputMessageBuffer.split("=")[1];
            fs.writeFileSync("message.txt", inputMessage);
        });

        // The below method can also be written in 2 lines by setting the status and headers indivisually
        res.writeHead(302, { Location: "/" });
        return res.end();
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
