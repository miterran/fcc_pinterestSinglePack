import User from '../models/User';
import passport from "passport";
import passportJWT from "passport-jwt";
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;


let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'fcc';

let jwtPass = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
	  User.findOne({googldId: jwt_payload.googldId}, function(err, user){
	    if(user){
	      next(null, user);
	    }else{
	      next(null, false)
	    }
	  })
});

export default jwtPass
