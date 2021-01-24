const { response } = require('express');

const Libro = require('../models/libro')

const getLibros = async (req, res) =>{

    const libros = await Libro.find()
                            .populate('usuario','nombre');

    res.json({
        ok:true,
        libros
    });

}

const crearLibros = async (req, res) =>{

    const uid = req.uid;

    const libro = new Libro({
        usuario:uid,
        ...req.body
    });


    try {

        const libroDB= await libro.save();

        res.json({
            ok:true,
            libro: libroDB
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'hable con el admin'

        });
    }

}
const actualizarLibros = (req, res) =>{
    res.json({
        ok:true,
        msg:'cactualizar libros'
    });

}

const borrarLibros = (req, res) =>{
    res.json({
        ok:true,
        msg:'borrar libros'
    });

}

module.exports = {
    getLibros,
    crearLibros,
    actualizarLibros,
    borrarLibros

}