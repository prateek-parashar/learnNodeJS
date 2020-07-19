const http = require("http");

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === "/") {
        res.write("<html>");
        res.write("<head> <title>Welcome</title></head>");
        res.write("<body><h2> Welcome to the landing page! </h2></body>");
        res.write("</html>");

        return res.end();
    }

    if (url === "/users" && method === "POST") {
        res.write("<html>");
        res.write("<head> <title>User List</title></head>");
        res.write(
            "<body><ul><li>Leslie</li> <li>Ron</li> <li>Chris</li> </ul></body>"
        );
        res.write("</html>");

        return res.end();
    }
});

server.listen(3000);
