const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

//trim is if you write the name but start with a space by accident it will put it together for you
const subSchema = new mongoose.Schema({
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
    parent: {type: ObjectId, ref: "Category", required: true},
},
    {timestamps: true}
)

module.exports = mongoose.model('Sub', subSchema)