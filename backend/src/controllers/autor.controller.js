
const connection = require('../database/connection')

module.exports = {

  async cadastrarAutor(request, response) {
    const { nome } = request.body
 
    const autor = {
      nome: nome.trim(),   
    }
    await connection('autor').insert(autor)
 
    return response.status(201).json(autor)
  },

  async editarAutor(request, response) {
    const id = request.params.id
    const autorData = request.body

    const guardarAutor = await connection('autor').where({ id }).first()

    if (!guardarAutor) return response.sendStatus(422)

    await connection('autor').where({ id }).update(autorData)

    return response.status(200).json(autorData)
  },

  async excluirAutor(request, response) {
    const id = request.params.id

    const guardarAutor = await connection('autor').where({ id }).delete()

    if (!guardarAutor) return response.sendStatus(422)

    return response.sendStatus(200)
  },
  async ListarAutores(request, response) {
    const autor = await connection('autor')

    return response.status(200).json(autor)
  },  
 
}