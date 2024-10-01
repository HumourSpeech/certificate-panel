// import joi from "joi";
import multer from "multer";
const upload = multer({ dest: './uploads/'});


const getCertificate = async (req, res) => {
    res.send(req.body);
}

const uploadCertificate = async (req, res) => {
    const file = req.file;

    if (file.originalname.endsWith('.pdf')) {
        return res.status(400).send('Invalid file type.');
      }
    res.status(200).send(file);
}

const updateCertificate = async (req, res) => {
    res.status(200);
}

const deleteCertificate = async (req, res) => {
    res.status(200);
}

export {getCertificate, uploadCertificate, updateCertificate, deleteCertificate}
