const logout = {}

logout.Logout = async (req, res) => {
    try {
        res.clearCookie('authToken')
        res.status(200).json({message: 'Logout successful'})
    } catch (error) {
        return res.status(500).json({message: 'Error logging out'})
    }
}

export default logout