const mongoose = require('mongoose')

const actionSchema = new mongoose.Schema({
    action: {
        type: String,
        required: true
    },
    frequency:{
        type: String,
        required: true
    }
}, {timstamps:true})

module.exports = actionSchema