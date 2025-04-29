import * as db from "../models/index.cjs";

const { Usuarios } = db.default;

export class UsuariosControllers {

    static obtenerUsuarios = async(req, res, next) => {
        try {
            const usuarios = await Usuarios.findAll();
            return res.status(200).json(usuarios);
        } catch (error) {
            console.error(error);
            next(error);
        };
    };

    static obtenerUsuarioPorId = async(req, res, next) => {
        const id = req.params.id;
        try {
            const usuario = await Usuarios.findByPk(id);
            if(!usuario) return res.status(404).json({message: "Usuario No Encontrado"});

            return res.status(200).json(usuario);
        } catch (error) {
            console.error(error);
            next(error);
        };
    };

    static crearUsuario = async(req, res, next) => {
        const datos = req.body;
        try {
            if(!datos.email) return res.status(400).json({message: "Datos Faltantes"});
            if(!datos.password) return res.status(400).json({message: "Datos Faltantes"});

            const nuevoUsuario = await Usuarios.create(datos);
            return res.status(201).json({message: "Usuario Creado Correctamente"});
        } catch (error) {
            console.error(error);
            next(error);
        };
    };

    static actualizarUsuario = async(req, res, next) => {
        const nuevosDatos = req.body;
        const id = req.params.id;
        try {
            const usuario = await Usuarios.findByPk(id);  
            if (!usuario) return res.status(404).json({ message: "Usuario No Encontrado" });

            await Usuarios.update(nuevosDatos, { where: { id } });
            return res.status(200).json({message: "Usuario Actualizado"});
        } catch (error) {
            console.error(error);
            next(error);
        };
    };

    static eliminarUsuario = async(req, res, next) => {
        const id = req.params.id;
        try {
            const usuario = await Usuarios.destroy({where: {id}});
            if (!usuario) return res.status(404).json({ message: "Usuario No Encontrado" });

            return res.status(200).json({message: "Usuario Eliminado"});
        } catch (error) {
            console.error(error);
            next(error);
        };
    };

};