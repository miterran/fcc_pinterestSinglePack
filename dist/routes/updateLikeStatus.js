'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Picture = require('../models/Picture');

var _Picture2 = _interopRequireDefault(_Picture);

var _jwtPass = require('../middlewarePassport/jwtPass');

var _jwtPass2 = _interopRequireDefault(_jwtPass);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

_passport2.default.use(_jwtPass2.default);

router.post('/', _passport2.default.authenticate('jwt', { session: false }), function (req, res) {
	if (req.body.like) {
		_Picture2.default.findOneAndUpdate({ _id: req.body.pic._id }, { $pull: { likes: req.user.googleId } }, { new: true }, function (err, result) {
			res.json(result);
		});
	} else {
		_Picture2.default.findOneAndUpdate({ _id: req.body.pic._id }, { $push: { likes: req.user.googleId } }, { new: true }, function (err, result) {
			res.json(result);
		});
	}
});

exports.default = router;
//# sourceMappingURL=updateLikeStatus.js.map