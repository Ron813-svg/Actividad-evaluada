import employeeModel from '../models/Employee.js';
import clientModel from '../models/Clients.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';

const login = {};

login.Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let userFound = null;
        let userType = null;

        if (email === config.emailAdmin.email && password === config.emailAdmin.password) {
            userType = 'admin';
            userFound = { _id: 'admin' };
        } else {
            userFound = await employeeModel.findOne({ email });
            if (userFound) {
                userType = 'employee';
            } else {
                userFound = await clientModel.findOne({ email });
                if (userFound) {
                    userType = 'client';
                }
            }
        }

        if (!userFound) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        if (userType !== 'admin') {
            const isMatch = await bcryptjs.compare(password, userFound.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
        }

        const token = jwt.sign(
            { user: userFound._id, userType },
            config.JWT.secret,
            { expiresIn: config.JWT.expiresIn }
        );

        res.cookie('authToken', token);
        res.status(200).json({ message: 'Login successful'});

    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

export default login;
