import { Schema, model } from "mongoose";

const employeeSchema = new Schema ({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    position:{ 
        type: String, 
        required: true
    },
    hiringDate:{
        type: Date,
        required: true
    },
    salary:{
        type: Number,
        required: true
    },
    Active:{
        type: Boolean,
        required: true
    }
}, {
    timestamps: true,
    strict: false
})

export default model('Employee', employeeSchema)