/*
        prestamos
        ruta: '/api/libros'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getLibros,
    crearLibros,
    actualizarLibros,
    borrarLibros

  } = require('../controllers/libros')

const router = Router();

router.get('/' ,    getLibros,
);

router.post('/', 
               [                
                validarJWT,
                check('titulo', 'el titulo es obligatorio').not().isEmpty(),
                validarCampos
               ] ,
               crearLibros );

router.put('/:id', 
[
   
],
actualizarLibros );

router.delete('/:id',
borrarLibros );


module.exports =  router;