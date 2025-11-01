import User from '../models/User.js'

export const addUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const newUser = new User({ email, password })
        await newUser.save()
        res.status(200).json({ message: 'User registered successfully' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
} 