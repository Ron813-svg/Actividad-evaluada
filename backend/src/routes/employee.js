import express from 'express'
import employeeControl from '../controllers/employeeControl.js'

const router = express.Router()

router.route('/').get(employeeControl.get)
.post(employeeControl.post)

router.route('/:id').delete(employeeControl.delete)
.put(employeeControl.put)

export default router