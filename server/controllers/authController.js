const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')

exports.login = async (req, res, next) => {
    const {email, password} = req.body

    if(!email || !password) { 
        return next(new ErrorResponse("Введіть будь ласка email і пароль", 400))
    }

    try {
        const user = await User.findOne({email}).select("+password")

        if(!user) {
            return next(new ErrorResponse("Недійсні дані облікового запису", 404))
        }

        const isMatch = await user.matchPasswords(password)

        if(!isMatch) {
            return next(new ErrorResponse("Недійсні дані облікового запису", 401))
        }

        sendToken(user, 200, res)

    } catch (error) {
        return next(new ErrorResponse(error.message, 500))
    }
}

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedJwtToken()

    res.status(statusCode).json({
        success: true,
        token
    })
}