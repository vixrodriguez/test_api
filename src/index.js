const express = require('express');
const app = express();
const morgan = require('morgan');

// middlewares
app.use(express.json());
app.use(morgan('combined'));
app.use(express.urlencoded({extended: false}));

// Configuración y ejecución del servidor

app.set('port', process.env.PORT || 8069);
app.set('json spaces', 2);
app.listen(app.get('port'), () => {
	console.log(`Server running on port ${app.get('port')}`);
});

// routes
app.use(require('./routes/index.js'));
app.use('/books', require('./routes/books.js'));
app.use('/authors', require('./routes/authors.js'));

