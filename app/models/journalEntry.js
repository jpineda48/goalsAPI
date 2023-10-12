const mongoose = require('mongoose')

const journalEntrySchema = new mongoose.Schema({
    title: {
        type: String,
    },
    body:{
        type:String,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        
    },

    }, {timestamps:true})




module.exports = mongoose.model('Entry', journalEntrySchema)