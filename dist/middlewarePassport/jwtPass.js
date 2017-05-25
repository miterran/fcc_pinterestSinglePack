"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _User = require("../models/User");

var _User2 = _interopRequireDefault(_User);

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _passportJwt = require("passport-jwt");

var _passportJwt2 = _interopRequireDefault(_passportJwt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ExtractJwt = _passportJwt2.default.ExtractJwt;
var JwtStrategy = _passportJwt2.default.Strategy;

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'fcc';

var jwtPass = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
	_User2.default.findOne({ googldId: jwt_payload.googldId }, function (err, user) {
		if (user) {
			next(null, user);
		} else {
			next(null, false);
		}
	});
});

exports.default = jwtPass;
//# sourceMappingURL=jwtPass.js.map