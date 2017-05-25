'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Picture = require('../models/Picture');

var _Picture2 = _interopRequireDefault(_Picture);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (req, res) {
	console.log('hi');
	_Picture2.default.find({}, function (err, result) {
		res.json(result);
	});
});

exports.default = router;
//# sourceMappingURL=updatePictureState.js.map