const mongoose = require('mongoose')

const ImageDetailSchema = new mongoose.Schema({
    image: {
        type:String
    }
})

mongoose.model('ImageDetail', ImageDetailSchema)