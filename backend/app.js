import express from 'express'
import cookieParser from 'cookie-parser'
import movieRoutes from './src/routes/movies.js'
import employeeRoutes from './src/routes/employee.js'
import clientRoutes from './src/routes/clients.js'
import loginRoutes from './src/routes/login.js'
import logoutRoutes from './src/routes/logout.js'
import registerRoutes from './src/routes/register.js'
import registerRoutes2 from './src/routes/registerEm.js'
import passRecovRoutes from './src/routes/passRecov.js'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use('/api/movies', movieRoutes)
app.use('/api/employees', employeeRoutes)
app.use('/api/clients', clientRoutes)
app.use('/api/login', loginRoutes)
app.use('/api/logout', logoutRoutes)
app.use('/api/register', registerRoutes)
app.use('/api/registerEm', registerRoutes2)
app.use('/api/passRecov', passRecovRoutes)


export default app
