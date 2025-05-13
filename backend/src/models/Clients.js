import {Schema, model} from 'mongoose'

const clientSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    Active: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true,
    strict: false
})

export default model('Client', clientSchema)   