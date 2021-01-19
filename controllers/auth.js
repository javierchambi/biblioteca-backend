const {response } = require('express');

const Usuario = require('../models/usuario');
const  bcrypt  = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async( req, res= response) =>{

const { email, password} = req.body; 


try {

    //verificar email
    const usuarioDB = await Usuario.findOne({ email});

    if(!usuarioDB){
        return res.status(404).json({
            ok:false,
            msg: 'email no encontrado'
        });

    }

    //verificar contraseña
    const validpassword = bcrypt.compareSync(password, usuarioDB.password);
    if( !validpassword){
        return res.status(400).json({
            ok:false,
            msg:'contraseña no valida'
        });
    }

    //generar TOKEN JWT
    const token = await generarJWT( usuarioDB.id);


    res.json({
        ok: true,
        token
    });
    
} catch (error) {
    console.log(error);
    res.status(500).json({
        ok:false,
        msg: "hable con el admin"
    });
}

}


module.exports = {
    login
}