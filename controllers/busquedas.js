
//gettodo

const { response } = require('express');

const Usuario = require('../models/usuario');
const Libro = require('../models/libro');
const Prestamo = require('../models/prestamo');


const getTodo = async (req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i');
    

    const [usuarios, libros, prestamos]= await Promise.all([
        Usuario.find({ nombre: regex}),
        Libro.find({ titulo: regex}),
        Prestamo.find({ fechaDevolucion: regex})
    ]);

    try {
            res.json({
            ok: true,
            usuarios,
            libros,
            prestamos
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado..'
        });
    }

    
}


const getDocumentosColeccion = async (req, res = response) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i');
    
    let data = [];

    switch (tabla) {

        case 'libros':
            data = await Libro.find({ titulo: regex})
                            .populate('libro','titulo img');
            
        break;

        case 'prestamos':
            data = await Prestamo.find({ fechaDevolucion: regex})
                            .populate('usuario','nombre img')
                            .populate('libro','titulo img');
            
        break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regex});
        break;
    
        default:
           return res.status(400).json({
                ok:false,
                msg: ' la tabla tiene que ser usuarios/prestamos/libros'
            });
            
    }

    res.json({
        ok:true,
        resultados:data
    })

    
}

module.exports = {
    getTodo,
    getDocumentosColeccion
}