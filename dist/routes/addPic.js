'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _Picture = require('../models/Picture');

var _Picture2 = _interopRequireDefault(_Picture);

var _jwtPass = require('../middlewarePassport/jwtPass');

var _jwtPass2 = _interopRequireDefault(_jwtPass);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

_passport2.default.use(_jwtPass2.default);

router.post('/', _passport2.default.authenticate('jwt', { session: false }), function (req, res) {
	(0, _nodeFetch2.default)(req.body.imageUrl).then(function (result) {
		if (result.status === 200) {
			var newPicture = new _Picture2.default({
				title: req.body.imageTitle,
				url: req.body.imageUrl,
				time: (0, _moment2.default)().format('X'),
				owner: req.user,
				likes: []
			});
			newPicture.save().then(function (result) {
				res.send('picture saved');
			});
		} else {
			res.status(404);
		}
	});
});

exports.default = router;
//# sourceMappingURL=addPic.js.map