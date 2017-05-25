import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
const findOrCreate = require('mongoose-find-or-create')
const Schema = mongoose.Schema;

const PictureSchema = mongoose.Schema({
	title: String,
	url: String,
	owner: Object,
	time: String,
	likes: Array
});

PictureSchema.plugin(findOrCreate)

const Picture = mongoose.model('picture', PictureSchema);



export default Picture;



