const {response } = require('express');

const Usuario = require('../models/usuario');
const  bcrypt  = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify} = require('../helpers/google-verify');

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

const googleSignIn = async(req,res=response) =>{

    const googleToken = req.body.token;

    try {
        const { name, email, picture} =  await googleVerify(googleToken);
        
        const usuarioDB = await Usuario.findOne({ email});
        let usuario;

        if( !usuarioDB){
            //si no existe el usuario
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        }else{
            //eciste usuario
            usuario = usuarioDB;
            usuario.google = true;
        }
        //guardar en la DB
        await usuario.save();

        //generar TOKEN JWT
        const token = await generarJWT( usuario.id);


        res.json({
            ok:true,
            msg: 'google signin',
            token
        });
        
    } catch (error) {
        res.status(401).json({
            ok:false,
            msg:'token no es correcto'
        });
    }
    
}


module.exports = {
    login,
    googleSignIn
}