const http = require("http");

const server = http.createServer((req, res) => {
    console.log(`The request URL is ${req.url} and the request method is ${req.method}`);
})

server.listen(3000);

/**
 * Comments - 
 * THIS IS SO COOL!
 * Coming from java, it always seemed impossible to create a server without a third party container (i.e Tomcat, Glassfish)
 * the fact that node has it inbuilt is freaking amazing 
 */