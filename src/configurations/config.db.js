const { Pool } = require('pg');

const pgConfig = {
    host: 'localhost',
    user: 'postgres',
    password: 'Cris2019',
    database: 'node',
    port: '5432'
}

module.exports = new Pool(pgConfig);