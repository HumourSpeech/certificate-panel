import express from 'express';
import mongoose from "mongoose";
import { adminRoutes } from './routes/adminRoutes.js';
import { certificateRoutes } from './routes/certificateRoutes.js'
import 'dotenv/config.js';

const app = express();

app.use(express.json());

app.use('/api/admin', adminRoutes);
app.use('/api/certificate', certificateRoutes);

const PORT =  process.env.PORT || 4400;
mongoose.connect("mongodb://localhost:27017", { dbName: 'CertificatePanel' })
    .then(() => {
        console.log("Connect to DB successfully");
        app.listen(PORT, 'localhost', () => console.log(`Listening to port ${PORT}`) )
    })
    .catch((err) => console.log(err.message));
