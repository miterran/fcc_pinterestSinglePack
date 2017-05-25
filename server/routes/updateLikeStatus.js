import express from 'express';
const router = express.Router();

import Picture from '../models/Picture';
import jwtPass from '../middlewarePassport/jwtPass';
import passport from "passport";

passport.use(jwtPass);

router.post('/', passport.authenticate('jwt', {session: false}), function(req, res){
	if(req.body.like){
		Picture.findOneAndUpdate({_id: req.body.pic._id}, {$pull: {likes: req.user.googleId}}, {new: true}, function(err, result){
			res.json(result)
		})
	}else{
		Picture.findOneAndUpdate({_id: req.body.pic._id}, {$push: {likes: req.user.googleId}}, {new: true}, function(err, result){
			res.json(result)
		})
	}
})

export default router
