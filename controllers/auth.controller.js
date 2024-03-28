const User = require('./../modules/User.schema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body

    // Check if the user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    })

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Check if the user exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    res.status(200).json({ message: 'Login successful', user })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' })
  }
}

exports.authenticateToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization')
    if (!token) return res.status(401).json({ message: 'Unauthorized' })

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.userId)
    next()
  } catch (error) {
    console.error(error)
    res.status(403).json({ message: 'Forbidden' })
  }
};