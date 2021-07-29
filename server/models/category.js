const mongoose = require('mongoose')


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required',
        minlength: [3, 'too short'],
        maxlenght: [32, 'too long'],
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true,
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('Category', categorySchema)