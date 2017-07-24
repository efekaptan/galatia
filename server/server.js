const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const low = require('lowdb')
const fileAsync = require('lowdb/lib/storages/file-async')
const request = require('superagent');

const app = express();

app.use(express.static(path.join(__dirname, '/../build')));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const router = express.Router();
app.use('/api', router);
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const db = low('db.json', {
    storage: fileAsync
})

const apiUrl = db.get('apiUrl').value();

router.post('/trips/search', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const key = db.get('keys').first().value();

    request
        .post(`${apiUrl}/trips/search?key=${key.apiKey}`)
        .send(req.body)
        .set('Accept', 'application/json')
        .end(function (err, response) {
            updateKey(key);
            res.send(JSON.stringify(response.text))
        });
})

router.get('/airports', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const searchString = req.query.searchString.toLowerCase();

    const result = db.get('airports').filter((element) => {
        return element.code.toLowerCase().indexOf(searchString) > -1 ||
            element.city.toLowerCase().indexOf(searchString) > -1 ||
            element.country.toLowerCase().indexOf(searchString) > -1;
    });

    res.send(JSON.stringify(result.take(10).value()));
})

const updateKey = (key) => {
    db.get('keys')
        .find({ apiKey: key.apiKey })
        .assign({
            apiKey: key.apiKey,
            remaining: key.remaining - 1,
            lastAccess: new Date()
        })
        .write()
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server is listening on ' + port))