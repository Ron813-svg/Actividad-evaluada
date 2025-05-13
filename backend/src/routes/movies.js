import express from 'express'
import movieControl from '../controllers/movieControl.js'
import multer from 'multer'

const router = express.Router()
const upload = multer({ dest: 'public/' })
router.route('/')
.get(movieControl.get)
.post(upload.single('image'), movieControl.post)
.delete(movieControl.delete)
.put(upload.single('image'), movieControl.put)

export default router