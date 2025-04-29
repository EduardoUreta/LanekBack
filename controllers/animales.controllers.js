import * as db from "../models/index.cjs";

const { Animales } = db.default;

export class AnimalesControllers {

    static obtenerAnimales = async(req, res, next) => {
        try {
            const animales = await Animales.findAll();
            return res.status(200).json(animales);
        } catch (error) {
            console.error(error);
            next(error);
        };
    };

    static obtenerAnimalPorId = async(req, res, next) => {
        const id = req.params.id;
        try {
            const animal = await Animales.findByPk(id);
            if(!animal) return res.status(404).json({message: "Animales No Encontrado"});

            return res.status(200).json(animal);
        } catch (error) {
            console.error(error);
            next(error);
        };
    };

    static crearAnimal = async(req, res, next) => {
        const datos = req.body;
        try {
            if(!datos.animal_favorito) return res.status(400).json({message: "Datos Faltantes"});
            if(!datos.imagen_url) return res.status(400).json({message: "Datos Faltantes"});

            const nuevoAnimal = await Animales.create(datos);
            return res.status(201).json({message: "Animal Creado Correctamente"});
        } catch (error) {
            console.error(error);
            next(error);
        };
    };

    static actualizarAnimal = async(req, res, next) => {
        const nuevosDatos = req.body;
        const id = req.params.id;
        try {
            const animal = await Animales.findByPk(id);  
            if (!animal) return res.status(404).json({ message: "Animal No Encontrado" });

            await Animales.update(nuevosDatos, { where: { id } });
            return res.status(200).json(animal);
        } catch (error) {
            console.error(error);
            next(error);
        };
    };

    static eliminarAnimal = async(req, res, next) => {
        const id = req.params.id;
        try {
            const animal = await Animales.destroy({where: {id}});
            if (!animal) return res.status(404).json({ message: "Animal No Encontrado" });

            return res.status(200).json({message: "Animal Eliminado"});
        } catch (error) {
            console.error(error);
            next(error);
        };
    };

};