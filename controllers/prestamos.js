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
const actualizarPrestamos = async (req, res = response) =>{
    const id = req.params.id;
    const uid = req.uid;
    
    try {      

        const prestamo = await Prestamo.findById(id);
        if( !prestamo ){
           return res.status(404).json({
                ok:false,
                msg:' el prestamo con ese id no existe '
                
            });
        }

        const cambiosPrestamo = {
            ...req.body,
            usuario: uid
            
            
        }        

        const prestamoActualizado = await Prestamo.findByIdAndUpdate(id,cambiosPrestamo,{new:true});


        res.json({
            ok:true,
            msg:'prestamo actualizado',
            prestamo: prestamoActualizado
        });
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'hable con el administrador'
        });
    }

}

const borrarPrestamos = async (req, res) =>{
   
    const id = req.params.id;

    try {       

        const prestamo = await Prestamo.findById(id);
        if( !prestamo ){
           return res.status(404).json({
                ok:false,
                msg:' el prestamo con ese id no existe '
                
            });
        }

        await Prestamo.findByIdAndDelete(id);


        res.json({
            ok:true,
            msg:'prestamo borrado'           
        });
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'hable con el administrador'
        });
    }

}

module.exports = {
    getPrestamos,
    crearPrestamos,
    actualizarPrestamos,
    borrarPrestamos

}