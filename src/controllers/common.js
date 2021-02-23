// Conexión a base de datos Postgres
const getConfigDb = {
	host: 'localhost',
	user: 'postgres',
	password: 'postgres',
	database: 'library',
	port: '5432'
};


const getQueryValues = (table, pkName, cols) => {
	const updatedAt = new Date();
	var keys = []; // Atributos a actualizar
	var values = []; // Valores de atributos a actualizar
	var index = 0;
	var query = [`UPDATE ${table} SET`]; // 

	// Se elimina columnas no permitidas de actualizar
	delete cols['updated_at'];
	delete cols['created_at'];

	// Se crea la estructura del query que define los campos a actualizar 
	Object.keys(cols).forEach((key, i) => {
		index = i+1;
		keys.push(`${key} = $${index}`);
		values.push(cols[key]);
	});

	// Se añade campo de registro actualizado
	keys.push(`updated_at = $${++index}`);
	query.push(keys.join(', '));
	
	// Se añade condicional 
	query.push(`WHERE ${pkName} = $${++index}`);

	// Se agrega valor de tiempo de actualización
	values.push(updatedAt);

	// Se devuelva un diccionario compuesto por el query formado y sus respectivos valores
	return { query: query.join(" "), values: values};	
}

module.exports = { getQueryValues, getConfigDb };
