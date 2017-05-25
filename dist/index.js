'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _config = require('./config.json');

var _config2 = _interopRequireDefault(_config);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _loginGoogle = require('./routes/loginGoogle');

var _loginGoogle2 = _interopRequireDefault(_loginGoogle);

var _addPic = require('./routes/addPic');

var _addPic2 = _interopRequireDefault(_addPic);

var _removePic = require('./routes/removePic');

var _removePic2 = _interopRequireDefault(_removePic);

var _updatePictureState = require('./routes/updatePictureState');

var _updatePictureState2 = _interopRequireDefault(_updatePictureState);

var _updateLikeStatus = require('./routes/updateLikeStatus');

var _updateLikeStatus2 = _interopRequireDefault(_updateLikeStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect('mongodb://test:test@ds149551.mlab.com:49551/fcc_pinterest');

var app = (0, _express2.default)();
app.server = _http2.default.createServer(app);

app.use((0, _morgan2.default)('dev'));
app.use((0, _cors2.default)());

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.use(_express2.default.static(_path2.default.resolve(__dirname, '../client/build')));

app.use('/login-google', _loginGoogle2.default);
app.use('/add-a-pic', _addPic2.default);
app.use('/remove-a-pic', _removePic2.default);
app.use('/update-picture-state', _updatePictureState2.default);
app.use('/update-like-status', _updateLikeStatus2.default);

app.get('*', function (request, response) {
  response.sendFile(_path2.default.resolve(__dirname, '../client/build', 'index.html'));
});

app.server.listen(process.env.PORT || _config2.default.port, function () {
  console.log('Started on port ' + app.server.address().port);
});

exports.default = app;
//# sourceMappingURL=index.js.map