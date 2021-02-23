const { Router } = require('express');
const router = Router();

const { getBooks, createBook, updateBook, updatePartialBook, deleteBook} = require('../controllers/book.controller.js');

router.get('/', getBooks);
router.post('/', createBook);
router.put('/:id', updateBook);
router.patch('/:id', updatePartialBook);
router.delete('/:id', deleteBook);

module.exports = router;