const configuration = {};

if (process.env.NODE_ENV === 'production') {
    configuration.apiUrl = 'http://galatia.reactjs.world/api';
} else {
    configuration.apiUrl = 'http://localhost:3000/api';
}

export default configuration;