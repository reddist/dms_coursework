const Pool = require('pg').Pool
let pool = new Pool({
    database: 'coursework',
    port: 5432,
    host: 'localhost'
});

module.exports = pool;