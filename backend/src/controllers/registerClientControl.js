import jsonwebtoken from 'jsonwebtoken'
import bcryptjdb from 'bcryptjs'
import crypto from 'crypto'
import clientModel from '../models/Clients.js'
import { config } from '../config.js'
import sendVerificationEmail from '../utils/verificationCode.js'

const register = {}

register.registerClient = async (req, res) => {
    const { name, email, password, phone, address, Active } = req.body
    try {
        const existingClient = await clientModel.findOne({ email })
        if (existingClient) {
            return res.status(400).json({ message: 'Email already exists' })
        }
        const passwordHash = await bcryptjdb.hash(password, 10)
        const newProfile = new clientModel({ name, email, password: passwordHash, phone, address, Active })
        await newProfile.save()
        
        const verificationCode = crypto.randomBytes(6).toString('hex')
        console.log('Generated verification code: ', verificationCode)

        const token = jsonwebtoken.sign
        ({ email, verificationCode }, 
            config.JWT.secret, 
            { expiresIn: '2h' })

        res.cookie('VerificationCode', token, { maxAge: 2*60*60*1000, httpOnly: true })

        await sendVerificationEmail(email, verificationCode)

        res.json({message : 'Client Created, please verify your email with the code sent to you'})

    } catch (error) {
        console.log('Error'+ error)
        res.status(500).json({ message: error.message })
    }
}
register.verificationCode = async (req, res) => {   
    const { code } = req.body
    const token = req.cookies.VerificationCode
    try {

        console.log("JWT Secret:", config.JWT.secret);
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)
        const {email, verificationCode: storedCode} = decoded;

        if(code !== storedCode){
            return res.json ({message: "Invalid code"})
        }
        const client = await clientModel.findOne({email})
        client.isVerified = true;
        await client.save()

        res.clearCookie("verificationToken")

        res.json({message: "Email verified Successfuly"})


    } catch (error) {
        console.log("Error: " + error)
    }

}
export default register