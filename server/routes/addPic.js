import express from 'express';
const router = express.Router();

import moment from 'moment';
import Picture from '../models/Picture';
import jwtPass from '../middlewarePassport/jwtPass';
import passport from "passport";
import fetch from 'node-fetch';
passport.use(jwtPass);

router.post('/', passport.authenticate('jwt', {session: false}), function(req, res){
	fetch(req.body.imageUrl).then(function(result){
		if(result.status === 200){
			const newPicture = new Picture({
				title: req.body.imageTitle,
				url: req.body.imageUrl,
				time: moment().format('X'),
				owner: req.user,
				likes: []
			})
			newPicture.save().then(function(result){
				res.send('picture saved')
			})
		}else{
			res.status(404)
		}
	})
})

export default router

