const Pool = require('pg').Pool
let pool = new Pool({
    database: 'coursework',
    port: 5432,
    host: 'localhost',
    user: '',
    password: '',
});


//helios
// let pool = new Pool({
//     database: 'studs',
//     port: 5678,
//     host: 'localhost',
//     user: '',
//     password: ''
// });

module.exports = pool;