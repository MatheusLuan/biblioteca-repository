const moment = require('moment')
const connection = require('../database/connection')

module.exports = {
  async cadastrarLivro(request, response) {
    const { nome, dataCriacao, status, autor_id } = request.body

    const livro = {
      nome,
      status,
      autor_id,
      dataCriacao: moment().format('YYYY-MM-DD HH:mm:ss'),
    }

    await connection('livro').insert(livro)

    return response.status(201).json(livro)
  },

  async EditarLivro(request, response) {
    const id = request.params.id
    const livroData = request.body

    const storedLivro = await connection('livro').where({ id }).first()

    if (!storedLivro) return response.sendStatus(422) 

    await connection('livro').where({ id }).update(livroData)

    return response.status(200).json(livroData)
  },

  async ExcluirLivro(request, response) {
    const id = request.params.id

    const storedLivro = await connection('livro').where({ id}).delete()

    if (!storedLivro) return response.sendStatus(422)

    return response.sendStatus(200)
  },

  async ListarLivros(request, response) {
    const livro = await connection('livro')    
    .join('autor', 'autor_id', '=', 'autor.id')    
    .select('livro.id','livro.nome', 'autor.nome as nomeAutor', 'livro.status')
    return response.status(200).json(livro)
  },

 
}