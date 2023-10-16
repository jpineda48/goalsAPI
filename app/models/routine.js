const mongoose = require('mongoose')

const routineSchema = new mongoose.Schema({
    task: {
        type: String
        
    },
    time_of_day:{
        type:String,
        enum:['Morning', 'Afternoon', 'Evening']

    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        
    },

    }, {timestamps:true})




module.exports = mongoose.model('Routine', routineSchema)