import multer from 'multer';
import path from 'path';

export default{
    // Pode utilizar um CDN como Amazon S3, Google Cloud Storage
    storage: multer.diskStorage({
        destination: path.join(__dirname, '..','..','uploads'),
        filename: (request, file, cb) =>{
            const fileName = `${Date.now()}=${file.originalname}`;
        
            // null = erro
            cb(null, fileName);
        }
    })
}