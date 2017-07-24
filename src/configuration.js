const configuration = {};

if (process.env.NODE_ENV === 'production') {
    configuration.apiUrl = 'https://arcane-caverns-50573.herokuapp.com/api';
} else {
    configuration.apiUrl = 'http://localhost:3000/api';
}

export default configuration;