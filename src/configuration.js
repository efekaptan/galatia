const configuration = {};

if (process.env.NODE_ENV === 'production') {
    configuration.apiUrl = 'https://galatia.herokuapp.com/api';
} else {
    configuration.apiUrl = 'http://localhost:3000/api';
}

export default configuration;