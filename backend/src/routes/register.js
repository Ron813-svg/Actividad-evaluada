import express from 'express'
import register from '../controllers/registerClientControl.js'

const router = express.Router()

router.route('/').post(register.registerClient)
router.route('/verify').post(register.verificationCode)

export default router