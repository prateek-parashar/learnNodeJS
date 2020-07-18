const http = require("http");

const server = http.createServer((req, res) => {
    console.log(req);
})

server.listen(3000);

/**
 * Comments - 
 * THIS IS SO COOL!
 * Coming from java, it always seemed impossible to create a server without a third party container (i.e Tomcat, Glassfish)
 * the fact that node has it inbuilt is freaking amazing 
 */