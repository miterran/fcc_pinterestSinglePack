'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/', function (req, res) {
	if (req.body.googleId) {
		_User2.default.findOneAndUpdate({ googleId: req.body.googleId }, { $set: req.body }, function (err, result) {
			if (err) res.status(404);
			if (result) {
				var token = _jsonwebtoken2.default.sign(req.body, 'fcc');
				return res.send(token);
			} else {
				var newUser = new _User2.default(req.body);
				newUser.save().then(function (err) {
					if (err) res.status(404);
					var token = _jsonwebtoken2.default.sign(req.body, 'fcc');
					return res.send(token);
				});
			}
		});
	} else {
		res.status(404);
	}
});

exports.default = router;
//# sourceMappingURL=loginGoogle.js.map