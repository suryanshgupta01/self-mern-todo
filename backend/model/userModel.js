const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const UserSchema = new mongoose.Schema({
    name: {
        type: String, required: true
    },
    email: {
        type: String, required: true, unique: true
    },
    password: {
        type: String, required: true
    }
}, {
    timestamps: true
}, {
    collection: 'userdata1'
})

UserSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
UserSchema.methods.matchpassword = async function (enteredpass) {
    return await bcrypt.compare(enteredpass, this.password)
}

module.exports = mongoose.model('userdata', UserSchema)