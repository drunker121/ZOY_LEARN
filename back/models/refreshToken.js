const mongoose = require('mongoose')
const Schema = mongoose.Schema

const refreshSchema = new Schema({
    token: {
        required: true,
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model('Refresh',refreshSchema)