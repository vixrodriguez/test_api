const { Pool } = require('pg');
const { getQueryValues, getConfigDb } = require('./common.js');

const pool = new Pool(getConfigDb);

// CRUD

const existAuthor = (author_id) => {
	const response = pool.query("SELECT * FROM authors WHERE author_id = $1", [author_id]);
	return response['rowCount'] > 0;
}

const getAuthors = async (req, res) => {
	const response = await pool.query("SELECT * FROM authors");
	res.status(200).json(response.rows);
};

const createAuthor = async (req, res) => {
	const {name, birthday, perishDate} = req.body; 
	const createdAt = new Date();
	const updatedAt = new Date();
	try {
		await pool.query('INSERT INTO authors (name, birthday, perish_date, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)', 
			[name, birthday, perishDate, createdAt, updatedAt]);
		console.log(req.body);
		res.json('Author created');
	} catch(e){
		console.log(e);
		res.status(502).send("Error while creating the author");
	}
};

const updateAuthor = async (req, res) => {
	const authorId = req.params.id;
	const updatedAt = new Date();
	try{
		if(!existAuthor(authorId))
			throw new Error('Not exist author');

		const {name, birthday, perishDate} = req.body;
		const response = await pool.query('UPDATE authors SET name = $1, birthday = $2, perish_date = $3, updated_at = $4 WHERE author_id = $5', 
		[name, birthday, perishDate, updatedAt, authorId]);
		console.log(response);
		res.send('Author updated');
	}catch(e){
		console.log(e);
		res.status(502).send("Error while updating author");
	}
}

const updatePartialAuthor = async (req, res) => {
	const authorId = req.params.id;
	const cols = req.body;
	try{
		if(!existAuthor(authorId))
			throw new Error('Not exist author');

		const { query, values} = getQueryValues("authors", "author_id", cols);
		values.push(authorId);
		const response = await pool.query(query, values);
		console.log(response);
		res.send('Author updated');
	}catch(e){
		console.log(e);
		res.status(502).send("Error while updating author");
	}
}

const deleteAuthor = async (req, res) => {
	const authorId = req.params.id;
	const response = await pool.query('DELETE FROM authors WHERE author_id = $1', [authorId]);
	console.log(response);
	res.json(`Author ${authorId} deleted`);
}

// Se exportan los métodos del controlador
module.exports = {
	getAuthors,
	createAuthor,
	updateAuthor,
	updatePartialAuthor,
	deleteAuthor
};
