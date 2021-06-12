import express from 'express';
import path, {dirname} from 'path';
import { notesRoutes } from './routes/notesRoutes.js';
import {fileURLToPath} from "url";


const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname + '/docs/')
const app = express();
const port = 3000;

const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};
app.use(allowCrossDomain);

// serve html files from FE root folder
app.use(express.static(path.resolve('docs')));

// serve index.html on default route
app.get("/", function (req, res) {
    res.sendFile("/docs/index.html", {root: __dirname + '/docs/'});
});

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Example app listening at http://localhost:${port}`);
});
