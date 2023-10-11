const mongoose = require('mongoose')

const actionSchema = new mongoose.Schema({
    action: {
        type: String,
        required: true
    },
    purpose:{
        type:String,
    },
    priority:{
        type: String,
		enum: ['High', 'Med', 'Low']
    },
    frequency:{
        type: String,
		enum: ['Daily', 'Weekly', 'Monthly', 'Yearly']
    }
}, {timestamps:true})

module.exports = actionSchema