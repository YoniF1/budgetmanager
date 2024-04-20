const knex = require('knex');
const path = require('path');
// require('dotenv').config(({ path: path.resolve(__dirname, '../.env') });)

const { connectionString } = process.env;

// const db = knex({
//     client: 'pg',
//     connection: connectionString,
//     seeds: {
//         directory: path.resolve(__dirname, '../seeds')
//     }
// });

const db = knex({
    client: 'pg',
    connection: {
        connectionString: connectionString
}});



module.exports = {
    db
}
