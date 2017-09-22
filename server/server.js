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

router.get('/airports', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const searchString = req.query.searchString.toLowerCase();

    const result = db.get('airports').filter((element) => {
        return element.code.toLowerCase().indexOf(searchString) > -1 ||
            element.city.toLowerCase().indexOf(searchString) > -1
    });

    res.send(JSON.stringify(result.take(10).value()));
})

router.post('/trips/search', (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    const cacheKey = JSON.stringify(req.body);
    if (cache.get(cacheKey)) {
        res.send(cache.get(cacheKey))
        return;
    }

    const key = getApiKey();

    if (!key) {
        res.status(500).send('Invalid api key!')
        return;
    }

    request
        .post(`${apiUrl}/trips/search?key=${key.apiKey}`)
        .send(req.body)
        .set('Accept', 'application/json')
        .end(function (err, response) {

            //cache result for 1 hour
            const result = JSON.parse(response.text);
            cache.put(cacheKey, result, 60 * 60 * 1000);

            incrementApiKeyUsageCount(key);

            res.send(result)
        });
})

const getApiKey = () => {
    const keys = db.get('keys').filter((element) =>
        !element.lastAccess || element.usageCount < 50 || hasOneDayPassed(element.lastAccess)
    ).value();

    if (keys.length) {
        return keys[0];
    }

    return "";
}

const incrementApiKeyUsageCount = (key) => {
    const now = new Date();

    db.get('keys')
        .find({ apiKey: key.apiKey })
        .assign({
            apiKey: key.apiKey,
            usageCount: hasOneDayPassed(key.lastAccess) ? 1 : key.usageCount + 1,
            lastAccess: now
        })
        .write()
}

const hasOneDayPassed = (lastAccess) => {
    return (Math.abs(new Date() - new Date(lastAccess)) / 36e5) > 24
}

app.use(express.static(path.join(__dirname, '/../build')));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '/../build', 'index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server is listening on ' + port))