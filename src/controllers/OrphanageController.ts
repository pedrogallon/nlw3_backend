import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';


export default {
    async create(req: Request, res: Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = req.body;

        const orphRespository = getRepository(Orphanage);

        const requestImages = req.files as Express.Multer.File[];
        const images = requestImages.map(image =>{
            return { path: image.filename}
        })

        const orphanage = orphRespository.create({
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        });

        await orphRespository.save(orphanage);

        return res.status(201).json(orphanage);

    },

    async getAll(req: Request, res: Response) {
        const orphRespository = getRepository(Orphanage);

        const orphanages = await orphRespository.find();

        return res.json(orphanages);
    },

    async getOne(req: Request, res: Response) {
        const { id } = req.params;
        const orphRespository = getRepository(Orphanage);

        const orphanage = await orphRespository.findOneOrFail(id);

        return res.json(orphanage);
    },

}  