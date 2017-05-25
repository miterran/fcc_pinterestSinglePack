import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import config from './config.json';
import fetch from 'node-fetch';
import mongoose from 'mongoose';
import path from 'path';
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://test:test@ds149551.mlab.com:49551/fcc_pinterest');

import loginGoogle from './routes/loginGoogle';
import addPic from './routes/addPic';
import removePic from './routes/removePic';
import updatePictureState from './routes/updatePictureState';
import updateLikeStatus from './routes/updateLikeStatus';

const app = express();
app.server = http.createServer(app);

app.use(morgan('dev'));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use('/login-google', loginGoogle)
app.use('/add-a-pic', addPic)
app.use('/remove-a-pic', removePic)
app.use('/update-picture-state', updatePictureState)
app.use('/update-like-status', updateLikeStatus)

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});



app.server.listen(process.env.PORT || config.port, () => {
	console.log(`Started on port ${app.server.address().port}`);
});

export default app;


