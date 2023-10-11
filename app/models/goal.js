const mongoose = require('mongoose')

const actionSchema = require('./action')

const goalSchema = new mongoose.Schema(
	{
		catagory: {
			type: String,
			enum:['Personal', 'Financial','Learning','Leisure', 'Health', 'Family', 'Relationship', 'Lifestyle', 'Other'],
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		progress_measurement:{
			type:String,
		},
		description: {
			type: String
		},
		status: {
			type: String,
			enum: ['Not Started', 'In Progress', 'Finished']
		},
		actions: [actionSchema],
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
			
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Goal', goalSchema)
