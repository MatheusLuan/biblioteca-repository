
exports.up = function (knex) {
    return knex.schema.createTable('livro', table => {
      
    table
    .integer('autor_id')
    .notNullable()
    .references('id')
    .inTable('autor')
    .onUpdate('cascade')

      table.increments('id').primary()  
      table.string('nome').notNullable()  
      table.timestamp('dataCriacao').notNullable()  
      table.string('status').notNullable()
    })
  }
  
exports.down = function (knex) {
    return knex.schema.dropTable('livro')
  }