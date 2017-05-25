import express from 'express';
const router = express.Router();

import Picture from '../models/Picture';
import jwtPass from '../middlewarePassport/jwtPass';
import passport from "passport";

passport.use(jwtPass);

router.post('/', passport.authenticate('jwt', {session: false}), function(req, res){
	Picture.findOneAndRemove({$and: [{_id: req.body.picId}, {'owner.googleId': req.user.googleId}]}, function(err, result){
		res.json(result)
	})
})

export default router