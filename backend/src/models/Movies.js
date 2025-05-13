import { Schema, model } from "mongoose";

const movieSchema = new Schema({
    title: {
        type: String,
    
    },
    description: {
        type: String,
        
    },
    director: {
        type: String,
        
    },
    genre: {
        type: String,
       
    },
    year: {
        type: Number,
        
    },
    duration:{
        type: Number,
       
    },
    image: {
        type: String,
       
    },
}, {
    timestamps: true,
    strict: false
})

export default model("Movie", movieSchema)