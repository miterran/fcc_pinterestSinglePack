import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
const findOrCreate = require('mongoose-find-or-create')
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
	googleId: String,
	imageUrl: String,
	email: String,
	name: String,
	givenName: String,
	familyName: String
});

UserSchema.plugin(findOrCreate)
const User = mongoose.model('user', UserSchema);



export default User;



