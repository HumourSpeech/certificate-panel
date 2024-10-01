import joi from 'joi';
import bcrypt from 'bcryptjs';
import {Admin, Email} from '../models/adminModel.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config.js';

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET_KEY, { expiresIn: "10d" });
}

const adminRegister = async (req, res) => {
    //Credential validation
    const { error } = credentialValidation(req.body);
    if ( error ) return res.status(400).json({ error: error.details[0].message});

    const { email, password} = req.body;

    //validating email from predefined email
    const exist = await Email.findOne({email})
    if( !exist || exist.used===true){
        return res.status(400).json({error: "Email is not valid or already taken"})
    }
    // Hashing using bcrypt 
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password, salt);

    try {
        //creating admin id
        const admin = await Admin.create({email, password: hashed});

        //setting predefined mail to true
        await Email.findOneAndUpdate({email}, {used: true});
        
        //Creating json web token
        const token = createToken(admin._id);

        // sending cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            maxAge: 86400000, // 1 day
        });

        res.status(200).json({email: admin.email, admin_id: admin._id, token});
          

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const adminLogin = async (req, res) => {
    //Credential validation
    const { error } = credentialValidation(req.body);
    if ( error ) return res.status(400).json({ error: error.details[0].message});

    const { email, password} = req.body;

    //checking for user in amdin schema
    const admin = await Admin.findOne({ email });
    if(!admin){
        return res.status(400).json({error: "Invalid email or Admin is not registered"});
    }
    // console.log(admin.password);

    try {
        //checking password
        const match = await bcrypt.compare(password,admin.password);
        if (!match){
        return res.status(400).json({error: "Incorrect Password"})
        }

        // creating json web token
        const token = createToken(admin._id);

        // sending cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            maxAge: 86400000, // 1 day
        });

        res.status(400).json({email, admin_id:admin._id, token});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

function credentialValidation(cred){
    const admin = joi.object({
        email: joi.string().required().email(),
        password: joi.string().min(4).required()
    })
    return admin.validate(cred);
}

export {adminLogin, adminRegister}