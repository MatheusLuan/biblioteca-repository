const router = require('express').Router()

const AutorController = require('./controllers/autor.controller')
const LivroController = require('./controllers/livro.controller')


router.post('/autor', AutorController.cadastrarAutor)
router.put('/autor/:id', AutorController.editarAutor)
router.delete('/autor/:id', AutorController.excluirAutor)
router.get('/autor',  AutorController.ListarAutores)

router.post('/livro',  LivroController.cadastrarLivro)
router.put('/livro/:id',  LivroController.EditarLivro)
router.delete('/livro/:id',  LivroController.ExcluirLivro)
router.get('/livro',  LivroController.ListarLivros)

module.exports = router