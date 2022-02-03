require('dotenv').config()

const usersData = require('./data/usersData')
const User = require('./models/User')
const connectDB = require('./config/db')

connectDB()

const importData = async () => {
    try {
        await User.deleteMany({})

        await User.create(usersData[0])
        await User.create(usersData[1])
        await User.create(usersData[2])

        console.log("Data imoprt SUCCESS")
        process.exit()
    } catch (error) {
        console.error("Error with data import");
        process.exit(1)
    }
}

importData()