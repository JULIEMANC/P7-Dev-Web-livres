Le projet a été testé sur node 19.

1- Clone du dépot sur github Desktop

2-J'initialise le projet ( backend )
J'ai créer un fichier backend dans visual studio code et j'ai mis tout le front dans un fichier appelé Frontend.
Le dossier caché .git je l'ai laisser hors dossier.
Dans le GitBash - je suis aller dans le Backend, j'ai fais la commande : npm init pour créer grace a cette commande le fichier Json.

Ensuite j'ai verifier dans mon dossier si ce fichier etait bien présent avec ce résultat ({
"name": "backend",
"version": "1.0.0",
"description": "",
"main": "index.js",
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1"
},
"author": "",
"license": "ISC"
}
)

3- Ensuite je fais un dossier index.js dans le backend
et .gitignore

4-Dans le fichier backend / index.js initialisation du serveur grace à (const http = require('http');
const serveur = http.createServer((req, res)=> {
res.end('Voilà la réponse du serveur !');
});

serveur.listen(process.env.PORT || 3000);
)
5- Normalement le nodeModule devrait apparaitre avec le l'initialisation du fichier Json ( npm install) mais j'ai rencontrer un problème car je n'avais pas de dépendance ( fichier package.json : "dependencies": {
"express": "^4.18.2"
}) donc j'ai du faire la commande sur GitBash "npm i express " & un fichier node_module s'est crée.

6- Pour lancer le serveur avec git bash avec la commande : node index.js ou nodemon

7- Un probleme se pose, à chaque modification, le serveur va s'arreter donc nous allons installer "Nodemon" qui relance le serveur automatiquement, dans gitbash faire la cmde "npm install -g nodemon" ensuite taper "nodemon start " dans gitbash.

8- Ajout d'express dans le backend avec la commande "npm install express"



9-Créer un fichier app.js et on placera l'application Express :
const express = require('express');
const app = express();
module.exports = app;

----------------------------------------------

Ensuite revenir a server.js :
const http = require('http');
const app = require('./app');

app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);

server.listen(process.env.PORT || 3000);

& modifier ds app.js : const express = require('express');

const app = express();

app.use((req, res) => {
res.json({ message: 'Votre requête a bien été reçue !' });
});

## module.exports = app;
-------------------------------------------------

10-Une application Express est fondamentalement une série de fonctions appelées middleware. Chaque élément de middleware reçoit les objets request et response , peut les lire, les analyser et les manipuler, le cas échéant. Le middleware Express reçoit également la méthode next , qui permet à chaque middleware de passer l'exécution au middleware suivant. Voyons comment tout cela fonctionne.

copiez ce code ds app.js :
const express = require('express');

const app = express();

app.use((req, res, next) => {
console.log('Requête reçue !');
next();
});

app.use((req, res, next) => {
res.status(201);
next();
});

## module.exports = app;

--------------------------------------------------

11-Avant d'aller plus loin dans le cours, apportons quelques améliorations à notre fichier server.js, pour le rendre plus stable et approprié pour le déploiement :

const http = require('http');
const app = require('./app');

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

---------------------------------------------------

12-Dans votre fichier app.js , remplacez tout le middleware par le suivant :

app.use('/api/stuff', (req, res, next) => {
const stuff = [
{
_id: 'oeihfzeoi',
title: 'Mon premier objet',
description: 'Les infos de mon premier objet',
imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
price: 4900,
userId: 'qsomihvqios',
},
{
_id: 'oeihfzeomoihi',
title: 'Mon deuxième objet',
description: 'Les infos de mon deuxième objet',
imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
price: 2900,
userId: 'qsomihvqios',
},
];
res.status(200).json(stuff);
});

(Le tbleau est un exemple)
La première différence que vous remarquerez est l'argument supplémentaire passé à la méthode use : nous lui passons un string, correspondant à la route pour laquelle nous souhaitons enregistrer cet élément de middleware. Dans ce cas, cette route serahttp://localhost:3000/api/stuff , car il s'agit de l'URL demandée par l'application front-end.

TOUJOURS FAIRE UN NPM I QUAND ON RECUPERE UN DEPOT react (framework js) SUR GITHUB
LANCER NOTRE SERVEUR AVEC NODEMON / GITBASH > NPM START

13-De retour au fichier app.js , ajoutez le middleware suivant avant la route d'API :

app.use((req, res, next) => {
res.setHeader('Access-Control-Allow-Origin', '\*');
res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
next();
});

14-Je créer une base de donnée dans MongoDB 
( MongoDB> s'inscrire> database > create)

Puis dans bash faire la commande : npm install mongoose
Puis mettre cette constante ds App.js (const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://juliemancino38:fQt84NzPLEkHrxp@clusterbook.
nrx9bqn.mongodb.net/?retryWrites=true&w=majority`)
) = cette phrase on peut la retrouver dans mon compte mongoDB > database > connect 

15- création de nouveau dossier dans le  backend : 
-models : book.js et users.js

16-Installation de Dotenv sur le terminal > backend
(Pour les informations confidentielles à cacher de Github (par exemple)car projet public )

17-Intsallation de package jsonwebtoken : "npm install jsonwebtoken" et l'importer dans le dossier que j'utilise "const jwt =require(`jsonwebtoken`);"

18-Installation multer sur le terminal "npm install multer"

19-Installation de sharp pour la compression des images "npm install express multer sharp"