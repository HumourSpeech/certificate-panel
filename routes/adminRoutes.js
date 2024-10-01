import express from "express";
import { adminLogin, adminRegister } from '../controllers/adminController.js';

const router = express.Router();

router.route('/register')
    .post(adminRegister)

router.route('/login')
    .post(adminLogin)

export {router as adminRoutes}

