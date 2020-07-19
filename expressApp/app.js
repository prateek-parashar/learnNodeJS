const http = require("http");

const server = http.createServer(requestHandler);

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
