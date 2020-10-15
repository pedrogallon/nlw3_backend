import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';
import orphanagesView from '../views/orphanages_view';
import * as Yup from 'yup'


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
        const images = requestImages.map(image => {
            return { path: image.filename }
        })
        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        }

        const schema = Yup.object().shape({ // para mensagem custom de erro: required("mensagem")
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            ),

        });

        await schema.validate(data,
            {
                abortEarly: false //passa por tudo pra depois falar todos os erros. true = para no primeiro
            });

        const orphanage = orphRespository.create(data);

        await orphRespository.save(orphanage);

        return res.status(201).json(orphanage);

    },

    async getAll(req: Request, res: Response) {
        const orphRespository = getRepository(Orphanage);

        const orphanages = await orphRespository.find({ relations: ['images'] });

        return res.json(orphanagesView.renderMany(orphanages));
    },

    async getOne(req: Request, res: Response) {
        const { id } = req.params;
        const orphRespository = getRepository(Orphanage);

        const orphanage = await orphRespository.findOneOrFail(id, { relations: ['images'] });

        return res.json(orphanagesView.render(orphanage));
    },

}  