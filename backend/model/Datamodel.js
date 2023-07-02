const mongoose = require('mongoose')
// const userdata = require('./userModel')
const Schema = mongoose.Schema

const User = new Schema(
    {
        text: { type: String, required: true },
        description: { type: String, },
        iscomplete: { type: Boolean, default: false },
        author: {
            type: mongoose.Schema.Types.ObjectId, ref: 'userdata'
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Users', User)

