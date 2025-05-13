import express from 'express'
import cookieParser from 'cookie-parser'
import movieRoutes from './src/routes/movies.js'
import employeeRoutes from './src/routes/employee.js'
import clientRoutes from './src/routes/clients.js'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use('/api/movies', movieRoutes)
app.use('/api/employees', employeeRoutes)
app.use('/api/clients', clientRoutes)

export default app
