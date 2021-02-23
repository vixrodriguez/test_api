const { Router } = require('express');
const router = Router();

const { getAuthors, createAuthor, updateAuthor, updatePartialAuthor, deleteAuthor} = require('../controllers/author.controller.js');

router.get('/', getAuthors);
router.post('/', createAuthor);
router.put('/:id', updateAuthor);
router.patch('/:id', updatePartialAuthor);
router.delete('/:id', deleteAuthor);

module.exports = router;