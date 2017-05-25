import express from 'express';
import User from '../models/User';
const router = express.Router();

import jwt from 'jsonwebtoken';

router.post('/', function(req, res){
	if(req.body.googleId){
		User.findOneAndUpdate({googleId: req.body.googleId}, {$set: req.body}, function(err, result){
			if(err) res.status(404)
			if(result){
				const token = jwt.sign(req.body, 'fcc')
				return res.send(token)
			}else{
				const newUser = new User(req.body)
				newUser.save().then(function(err){
					if(err) res.status(404)
					const token = jwt.sign(req.body, 'fcc')
					return res.send(token)
				})
			}
		})
	}else{
		res.status(404)
	}
})


export default router




