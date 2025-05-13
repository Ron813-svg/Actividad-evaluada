import movieModels from '../models/Movies.js'
import {v2 as cloudinary} from 'cloudinary'
import { config } from "../config.js"

const movieControl = {}

cloudinary.config({
    cloud_name:  config.cloudinary.cloudinary_name,
    api_key: config.cloudinary.cloudinary_api_key,
    api_secret: config.cloudinary.cloudinary_api_secret
})

movieControl.get = async (req, res) => {
  try {
    const movies = await movieModels.find()
    res.status(200).json(movies)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
movieControl.post = async (req, res) => {
    try {
        const { title, description, director, genre, year, duration } = req.body
        let imgUrl = ""

    if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {folder: 'public', allowed_formats:['jpg', 'png', 'jpeg']})
        imgUrl = result.secure_url
    }

    const newMovie = new movieModels({title,description,director,genre,year,duration,image: imgUrl})
    newMovie.save()

    res.json({message: "Movie Created"})

    } catch (error) {
        console.log('error'+ error)
    }
}
movieControl.delete = async (req, res) => {
    try {
        const { id } = req.params
        const movie = await movieModels.findByIdAndDelete(id)
        res.status(200).json({message: "Movie Deleted", data: movie})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
movieControl.put = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description, director, genre, year, duration } = req.body
        let imgUrl = ""

        if (req.files) {
            const result = await cloudinary.uploader.upload(req.file.path, {folder: 'public', allowed_formats:['jpg', 'png', 'jpeg']})
            imgUrl = result.secure_url
        }

        const updatedMovie = await movieModels.findByIdAndUpdate(id, {title,description,director,genre,year,duration,image: imgUrl}, {new: true})
        res.status(200).json({message: "Movie Updated", data: updatedMovie})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export default movieControl