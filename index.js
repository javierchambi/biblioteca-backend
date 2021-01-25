const express = require('express');
require('dotenv').config();
const cors = require('cors');


const { dbConnection } = require('./database/config')

// crear el servidor de express
const app = express();
//configurar cors
app.use( cors() );

//lectura y parseo del body
app.use( express.json() );

//base de datos
dbConnection();

//directorio publico
app.use(express.static('public'));

//rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/prestamos', require('./routes/prestamos'));
app.use('/api/libros', require('./routes/libros'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto '+ process.env.PORT);
});