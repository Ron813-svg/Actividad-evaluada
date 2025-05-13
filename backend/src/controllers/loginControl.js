import employeeModel from '../models/Employee.js'
import clientModel from '../models/Clients.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {config} from '../config.js'

const login = {}

login.Login = async (req, res) => {
    const {email, password} = req.body
    try {
        let userFound
        let userType
        if(email === config.emailAdmin.email && password === config.emailAdmin.password) {
            userType = 'admin'
            userFound = {_id: 'admin'}
        }
        else{
            userFound = await employeeModel.findOne({email})
            userType = 'employee'
        }
        if(!userFound) {
            userFound = await clientModel.findOne({email})
            userType = 'client'
        }
        if(!userFound) {
            return res.status(401).json({message: 'Invalid email or password'})
        }
        if(userType !== 'admin') {
            const isMatch = await bcryptjs.compare(password, userFound.password)
            if(!isMatch) {
                return res.status(401).json({message: 'Invalid email or password'})
            }
        }
        jwt.sign(
            {user: userFound._id, userType},
            config.JWT.secret,
            {expiresIn: config.JWT.expiresIn},
            (err, token) => {
                if(error) return res.status(500).json({message: 'Error signing token'})

                res.cookie('authToken', token)
                res.status(200).json({message: 'Login successful',})
            }
        )
    } catch (error) {
        return res.status(500).json({message: 'Error logging in'})
    }
}
export default login