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

export const loginUser = async (req, res) => {

  const { email, password } = req.body;

  try {
    // 1️⃣ Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2️⃣ Compare the password 
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3️⃣ Login successful
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};