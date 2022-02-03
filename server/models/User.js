const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Введіть будь ласка ваше ім'я"]
    },
    email: {
        type: String,
        required: [true, "Введіть будь ласка ваш email"],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Введіть будь ласка коректний email"
        ]
    },
    password: {
        type: String,
        required: [true, "Додайте будь ласка пароль"]
    },
    role: {
        type: String,
        required: true
    }
})

UserSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

UserSchema.methods.matchPasswords = async function(password) {
    return await bcrypt.compare(password, this.password)
}

UserSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE})
}

const User = mongoose.model("User", UserSchema)

module.exports = User