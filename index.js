import express from 'express';
import path, {dirname} from 'path';
import {fileURLToPath} from "url";


const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname + '/docs/')
const app = express();
const port = 3000;

// serve html files from FE root folder
app.use(express.static(path.resolve('docs')));

// display page for 404
app.all('*', (req, res) => {
    res.status(404).send('<h1>resource not found</h1>')
})

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Example app listening at http://localhost:${port}`);
});
