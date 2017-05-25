'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;
var findOrCreate = require('mongoose-find-or-create');
var Schema = _mongoose2.default.Schema;

var PictureSchema = _mongoose2.default.Schema({
	title: String,
	url: String,
	owner: Object,
	time: String,
	likes: Array
});

PictureSchema.plugin(findOrCreate);

var Picture = _mongoose2.default.model('picture', PictureSchema);

exports.default = Picture;
//# sourceMappingURL=Picture.js.map