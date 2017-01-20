var express = require('express');
var config = require('./config/index');
var opn = require('opn');

var port = process.env.PORT || config.build.port;

var app = express();

var router = express.Router();

router.get('/', function (req, res, next) {
	req.url = 'index.html';
	next();
});

app.use(router);

// 获取数据
var appData = require('./data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

// 新建路由器
var apiRoutes = express.Router();
apiRoutes.get('/seller', function (req,res) {
  res.json({
    errno: 0,
    data: seller
  });
});

apiRoutes.get('/goods', function (req,res) {
  res.json({
    errno: 0,
    data: goods
  });
});

apiRoutes.get('/ratings', function (req,res) {
  res.json({
    errno: 0,
    data: ratings
  });
});

// 启动路由器
app.use('/api', apiRoutes);

app.use(express.static('./dist'));

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  var uri = 'http://localhost:' + port +"/index.html?id=123"
  // when env is testing, don't need open it
  if (process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
});