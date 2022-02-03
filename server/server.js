require('dotenv').config()
const express = require('express');
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error')

connectDB()

const app = express()

app.use(express.json())

app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/private', require('./routes/privateRoutes'))

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server has been started on port ${PORT}...`))