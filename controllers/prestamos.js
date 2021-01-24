const { response } = require('express');

const  Prestamo = require('../models/prestamo');

const getPrestamos = async (req, res) =>{

    const prestamos = await Prestamo.find()
                            .populate('usuario','nombre')
                            .populate('libro', 'titulo');

    res.json({
        ok:true,
        prestamos
    });

}

const crearPrestamos = async (req, res=response) =>{
    
    const uid = req.uid;
    const prestamo = new Prestamo({
        usuario:uid,
        ...req.body
    });


    try {

        const prestamoDB= await prestamo.save();

        res.json({
            ok:true,
            prestamo: prestamoDB
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'hable con el admin'

        });
    }


}
const actualizarPrestamos = (req, res) =>{
    res.json({
        ok:true,
        msg:'cactualizar prestamo'
    });

}

const borrarPrestamos = (req, res) =>{
    res.json({
        ok:true,
        msg:'borrar prestamo'
    });

}

module.exports = {
    getPrestamos,
    crearPrestamos,
    actualizarPrestamos,
    borrarPrestamos

}