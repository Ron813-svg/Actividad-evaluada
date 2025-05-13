import clientModel from '../models/Clients.js'

const clientControl = {}

clientControl.get = async (req, res) => {
    try {
        const clients = await clientModel.find()
        res.status(200).json(clients)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
clientControl.post = async (req, res) => {
    try {
        const { name, email, password, phone, address, Active } = req.body
        const newClient = new clientModel({ name, email, password, phone, address, Active })
        await newClient.save()
        res.status(201).json({ message: "Client Created" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
clientControl.delete = async (req, res) => {
    try {
        const client = await clientModel.findByIdAndDelete(req.params.id)
        if (!client) {
            return res.status(404).json({ message: 'Client not found' })
        }
        res.status(200).json({ message: 'Client deleted' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
clientControl.put = async (req, res) => {
    const { name, email, phone, address, Active } = req.body
    try {
        const client = await clientModel.findByIdAndUpdate(
            req.params.id,
            { name, email, phone, address, Active },
            { new: true }
        )
        if (!client) {
            return res.status(404).json({ message: 'Client not found' })
        }
        res.status(200).json(client)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export default clientControl