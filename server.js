require('dotenv').config()
const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const authRoutes =  require('./routes/auth.route')

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

const mongodbUrl = process.env.MONGODB_URL

// MongoDB setup
mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', () => {
  console.log('Connected to MongoDB')
})

// Socket.IO setup
io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

// Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(bodyParser.json())

// Express routes
app.use('/api/auth', authRoutes)
app.get('/', (req, res) => {
  res.send('Chat App API')
})


// Start the server
const PORT = process.env.PORT
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
