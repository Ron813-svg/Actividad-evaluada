import express from 'express'
import clientControl from '../controllers/clientsControl.js'

const router = express.Router()

router.route('/').get(clientControl.get)
.post(clientControl.post)

router.route('/:id').delete(clientControl.delete)
.put(clientControl.put)

export default router
