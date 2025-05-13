import employeeModel from '../models/Employee.js'
import bcryptjs from 'bcryptjs'
import jsonwebtoken from 'jsonwebtoken'
import {config} from '../config.js'

const register = {}

register.Register = async (req, res) => {
    const { name, email, password, phone, position, hiringDate, salary, Active } = req.body
    try {
        const existEmployee = await employeeModel.findOne({email})
        if (existEmployee) {
            return res.status(400).json({ message: 'Email already exists' })
        }

        const passwordHash = await bcryptjs.hash(password, 10)
        const newEmployee = new employeeModel({
            name,
            email,
            password: passwordHash,
            phone,
            position,
            hiringDate,
            salary,
            Active
        })
        await newEmployee.save()

        jsonwebtoken.sign(
            {id: newEmployee._id},
            config.JWT.secret,
            {expiresIn: config.JWT.expiresIn},

            (err, token) => {
                if (err) console.log({ message: 'Error generating token '+ err })
                res.cookie('authtoken', token)


                return res.status(200).json({
                    message: 'Employee registered successfully',
                })
            }
        )


    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

export default register