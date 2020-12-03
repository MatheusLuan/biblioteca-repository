const knex = require('knex')

const config = require('./config')

const connection = knex(config)

module.exports = connection