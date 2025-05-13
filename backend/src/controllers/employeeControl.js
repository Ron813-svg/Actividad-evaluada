import modelEmployee from '../models/Employee.js'

const employeeControl = {}

employeeControl.get = async (req, res) => {
    try {
        const employees = await modelEmployee.find()
        res.json(employees)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
employeeControl.post = async (req, res) => {
    const employee = new modelEmployee({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        position: req.body.position,
        hiringDate: req.body.hiringDate,
        salary: req.body.salary,
        Active: req.body.Active
    })
    try {
        const newEmployee = await employee.save()
        res.status(201).json(newEmployee)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
employeeControl.delete = async (req, res) => {
    try {
        const employee = await modelEmployee.findByIdAndDelete(req.params.id)
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' })
        }
        res.json({ message: 'Employee deleted' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
employeeControl.put = async (req, res) => {
    const { name, email, password, phone, position, hiringDate, salary, Active } = req.body
    try {
        const employee = await modelEmployee.findByIdAndUpdate(
            req.params.id,
            { name, email, password, phone, position, hiringDate, salary, Active },
            { new: true }
        )
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' })
        }
        res.json(employee)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export default employeeControl