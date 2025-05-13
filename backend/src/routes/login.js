import express from 'express'
import  login  from '../controllers/loginControl.js'

const router = express.Router()

router.route('/').post(login.Login)

export default router