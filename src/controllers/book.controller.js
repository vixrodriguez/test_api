const { Pool } = require('pg');
const { getQueryValues, getConfigDb } = require('./common.js');

const pool = new Pool(getConfigDb);

// CRUD

const existBook = (book_id) => {
	const response = pool.query("SELECT * FROM books WHERE book_id = $1", [book_id]);
	return response['rowCount'] > 0;
}

const getBooks = async (req, res) => {
	const response = await pool.query("SELECT * FROM books");
	res.status(200).json(response.rows);
};

const createBook = async (req, res) => {
	const {title, isbn} = req.body; 
	const createdAt = new Date();
	const updatedAt = new Date();
	try {
		await pool.query('INSERT INTO books (title, isbn, created_at, updated_at) VALUES ($1, $2, $3, $4)', 
			[title, isbn, createdAt, updatedAt]);
		console.log(req.body);
		res.send("Book created");
	} catch(e){
		console.log(e);
		res.status(502).send("Error while creating the book");
	}
};

const updateBook = async (req, res) => {
	const bookId = req.params.id;
	const updatedAt = new Date();
	try{
		if(!existBook(bookId))
			throw new Error('Not exist book');

		const {title, isbn} = req.body;
		const response = await pool.query('UPDATE books SET title = $1, isbn = $2, updated_at = $3 WHERE book_id = $4', 
		[title, isbn, updatedAt, bookId]);
		console.log(response);
		res.send('Book updated');
	}catch(e){
		console.log(e);
		res.status(502).send("Error while updating book");
	}
}

const updatePartialBook = async (req, res) => {
	const bookId = req.params.id;
	const cols = req.body;
	try{
		if(!existBook(bookId))
			throw new Error('Not exist book');

		const { query, values} = getQueryValues("books", "book_id", cols);
		values.push(bookId);
		const response = await pool.query(query, values);
		console.log(response);
		res.send('Book updated');
	}catch(e){
		console.log(e);
		res.status(502).send("Error while updating book");
	}
}

const deleteBook = async (req, res) => {
	const bookId = req.params.id;
	const response = await pool.query('DELETE FROM books WHERE book_id = $1', [bookId]);
	console.log(response);
	res.json(`Book ${bookId} deleted`);
}

// Se exportan los métodos del controlador
module.exports = {
	getBooks,
	createBook,
	updateBook,
	updatePartialBook,
	deleteBook
};
