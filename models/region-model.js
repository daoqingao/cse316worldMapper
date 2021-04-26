const { model, Schema, ObjectId } = require('mongoose');
const Item = require('./item-model').schema;

const regionSchema = new Schema(
	{
		_id: {
			type: ObjectId,
			required: true
		},

		name: {
			type: String,
			required: true
		},
		owner: {
			type: String,
			required: true
		},
		items: [Item],
		sortRule: {
			type: String, 
			required: true
		},
		sortDirection: {
			type: Number, 
			required: true
		}
	},
	{ timestamps: true }
);

const Region = model('Region', regionSchema);
module.exports = Region;