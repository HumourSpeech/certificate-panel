import express from "express";
import multer from "multer";
import { getCertificate, uploadCertificate, updateCertificate, deleteCertificate } from '../controllers/certificateController.js'

const upload = multer({ dest: './uploads'});
const router = express.Router();


router.route('/')
    .get(getCertificate)

    .post(upload.single('certificate'),uploadCertificate)

    .patch(updateCertificate)

    .delete(deleteCertificate)

export { router as certificateRoutes, upload }