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
const actualizarLibros = async (req, res) =>{
    
    const id = req.params.id;
    const uid = req.uid;

    try {       

        const libro = await Libro.findById(id);
        if( !libro ){
           return res.status(404).json({
                ok:false,
                msg:' el libro con ese id no existe '
                
            });
        }

        const cambiosLibro = {
            ...req.body,
            usuario: uid
        }

        

        const libroActualizado = await Libro.findByIdAndUpdate(id,cambiosLibro,{new:true});


        res.json({
            ok:true,
            msg:'actualizar libros',
            libro: libroActualizado
        });
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'hable con el administrador'
        });
    }
    
    

}

const borrarLibros = async (req, res) =>{
   
    const id = req.params.id;

    try {       

        const libro = await Libro.findById(id);
        if( !libro ){
           return res.status(404).json({
                ok:false,
                msg:' el libro con ese id no existe '
                
            });
        }

        await Libro.findByIdAndDelete(id);


        res.json({
            ok:true,
            msg:'libro borrado'           
        });
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'hable con el administrador'
        });
    }
}

module.exports = {
    getLibros,
    crearLibros,
    actualizarLibros,
    borrarLibros

}