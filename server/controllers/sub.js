const Sub = require('../models/sub')
const slugify = require('slugify')


exports.create = async (req, res) => {
    try {
        const {name, parent} = req.body
        const category = await new Sub({name, parent, slug: slugify(name)}).save()
        res.json(category
            )
    } catch(err) {
        console.log('sub create error', err)
        res.status(400).send('create subcategory failed')
    }
}

exports.read = async (req, res) => {
    let sub = await Sub.findOne({slug: req.params.slug}).exec()
    res.json(sub)
}

exports.update = async (req, res) => {
    const {name, parent} = req.body
    try {
        const updated = await Sub.findOneAndUpdate(
            { slug: req.params.slug}, 
            {name,parent, slug: slugify(name)},
            {new: true}
            )
            res.json(updated)
    } catch(err) {
        res.status(400).send('SubCategory update failed')

    }

}

exports.remove  = async(req, res) => {
    try {
        const deleted = await Sub.findOneAndDelete({slug: req.params.slug})
        res.json(deleted)
    } catch (err) {
        res.status(400).send('Subcategory delete failed')
    }
}

exports.list = async (req, res) => {
    res.json(await Sub.find({}).sort({ createdAt: -1}).exec())
}