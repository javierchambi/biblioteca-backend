
const fs = require('fs');
const Usuario  = require('../models/usuario');
const Libro  = require('../models/libro');
const Prestamo  = require('../models/prestamo');

const borrarImagen =(path)=>{
            
        if(fs.existsSync( path)){
                //borrar la imagen anterior
                fs.unlinkSync( path);
            }

}

const actualizarImagen = async (tipo, id,nombreArchivo)=>{

    let pathViejo = '';

    switch (tipo) {
        case 'libros':
            const libro = await Libro.findById(id);
            if(!libro){
                console.log('no es un libro por id');
                return false;
            }

            pathViejo = `./uploads/libros/${ libro.img}`;
            borrarImagen(pathViejo);

            libro.img = nombreArchivo;

            await libro.save();
            return true;

        break;

        case 'prestamos':
            const prestamo = await Prestamo.findById(id);
            if(!prestamo){
                console.log('no es un prestamo por id');
                return false;
            }

            pathViejo = `./uploads/prestamos/${ prestamo.img}`;
            borrarImagen(pathViejo);

            prestamo.img = nombreArchivo;

            await prestamo.save();
            return true;

        break;
    
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if(!usuario){
                console.log('no es un usuario por id');
                return false;
            }

            pathViejo = `./uploads/usuarios/${ usuario.img}`;
            borrarImagen(pathViejo);

            usuario.img = nombreArchivo;

            await usuario.save();
            return true;
            
        break;

    }

}

'libros','prestamos','usuarios'



module.exports={
    actualizarImagen
}