var path = require("path");

const app = require('./app.js');
require('./connection.js');

async function init() {
    await app.listen(3000);
    console.log('Server on Localhost:3000')
}

init();