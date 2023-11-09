const http = require("http");
const app = require(`./app`);

app.set(`port`, process.env.PORT || 3000);

const serveur = http.createServer(app);

serveur.listen(process.env.PORT || 3000);
