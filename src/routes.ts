import { Router } from 'express'
import multer from 'multer'
import OrphanageController from './controllers/OrphanageController'


import uploadConfig from './config/upoload'


const routes = Router();
const upload = multer(uploadConfig);
    // pode usar upload.single para um unico
    // para arquivos não é possível usar json no body
routes.post("/orphanages", upload.array('images') , OrphanageController.create);

routes.get("/orphanages", OrphanageController.getAll);
routes.get("/orphanages/:id", OrphanageController.getOne)

export default routes;