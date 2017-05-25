import express from 'express';
const router = express.Router();

import Picture from '../models/Picture';

router.get('/', function(req, res){
	console.log('hi')
	Picture.find({}, function(err, result){
		res.json(result)
	})
})

export default router



