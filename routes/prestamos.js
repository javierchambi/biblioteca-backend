/*
        prestamos
        ruta: '/api/prestamos'
*/

  const { Router } = require('express');
  const { check } = require('express-validator');
  const { validarCampos } = require('../middlewares/validar-campos');
  
  const { validarJWT } = require('../middlewares/validar-jwt');
  
  const {
    getPrestamos,
    crearPrestamos,
    actualizarPrestamos,
    borrarPrestamos

    } = require('../controllers/prestamos')

  const router = Router();
  
  router.get('/' ,    getPrestamos,
  );
  
  router.post('/', 
                 [
                  validarJWT,
                  check('fechaDevolucion', 'el la fecha de entrega es necesaria').not().isEmpty(),
                  check('libro', 'el id del libro debe ser valido').isMongoId(),

                  validarCampos
                 ] ,
                 crearPrestamos );
  
  router.put('/:id', 
  [
    validarJWT,
    check('fechaDevolucion','debe ingresar la nueva fecha de devolucion').not().isEmpty(),
    check('libro', 'el id del libro debe ser valido').isMongoId(),
   validarCampos
  ],
  actualizarPrestamos );
  
  router.delete('/:id',
  validarJWT,
  borrarPrestamos );
  
  
  module.exports =  router;