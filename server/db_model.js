const Pool = require('pg').Pool
// let pool = new Pool({
//     database: 'coursework',
//     port: 5432,
//     host: 'localhost'
// });


//helios
let pool = new Pool({
    database: 'studs',
    port: 5678,
    host: 'localhost',
    user: 's265058',
    password: 'wnz862'
});

module.exports = pool;