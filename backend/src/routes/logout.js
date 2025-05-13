import express from 'express'
import logout from '../controllers/logoutControl.js'

const router = express.Router()

router.route('/').post(logout.Logout)

export default router