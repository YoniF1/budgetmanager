const knex = require('knex');
require('dotenv').config()

const { connectionString } = process.env;

module.exports = {
    client: 'pg',
    connection: connectionString,
    seeds: {
        directory: './seeds'
    }
}
