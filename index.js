import express from 'express';
import path, {dirname} from 'path';
import {fileURLToPath} from 'url';
import bodyParser from 'body-parser';
import {notesRoutes} from './routes/notesRoutes.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

function allowCrossDomain(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);

// serve html files from FE root folder
app.use(express.static(path.resolve('docs')));
app.use(bodyParser.json());
app.use('/notes', notesRoutes);

app.all('*', (req, res) => {
    res.status(404).sendFile(path.resolve('docs/error404.html'));
});

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Example app listening at http://localhost:${port}`);
});
