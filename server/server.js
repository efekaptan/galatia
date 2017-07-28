const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const low = require('lowdb')
const fileAsync = require('lowdb/lib/storages/file-async')
const request = require('superagent');
const cache = require('memory-cache');

const app = express();

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

    const cacheKey = JSON.stringify(req.body);
    if (cache.get(cacheKey)) {
        res.send(cache.get(cacheKey))
        return;
    }

    request
        .post(`${apiUrl}/trips/search?key=${key.apiKey}`)
        .send(req.body)
        .set('Accept', 'application/json')
        .end(function (err, response) {
            const result = JSON.stringify(response.text);
            //cache result for 1 hour
            cache.put(cacheKey, result, 60 * 60 * 1000);
            res.send(result)
        });
})

router.get('/airports', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const searchString = req.query.searchString.toLowerCase();

    const result = db.get('airports').filter((element) => {
        return element.code.toLowerCase().indexOf(searchString) > -1 ||
            element.city.toLowerCase().indexOf(searchString) > -1
    });

    res.send(JSON.stringify(result.take(10).value()));
})

app.use(express.static(path.join(__dirname, '/../build')));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '/../build', 'index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server is listening on ' + port))