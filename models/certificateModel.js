import mongoose, { SchemaTypeOptions } from "mongoose";

const certificateSchema = new mongoose.Schema({
    editedBy: {
        types: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Admin'
    },
    url: {
        type: String,
    },
    valid: {
        type: Boolean,
        default: true,
    }
},{timestamps:true},)

const certificate = mongoose.model('certificate', certificateSchema)