import mongoose from "mongoose";

const PreDefinedEmail = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    used: {
        type: Boolean,
        default: false
    }
})

const AdminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Admin = mongoose.model('Admin', AdminSchema)
const Email = mongoose.model('Pre defined email', PreDefinedEmail)

export  { Admin, Email }