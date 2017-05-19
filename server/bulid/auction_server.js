"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var ws_1 = require("ws");
var app = express();
// 商品数据
var Product = (function () {
    function Product(id, title, price, rating, desc, categories) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.rating = rating;
        this.desc = desc;
        this.categories = categories;
    }
    return Product;
}());
exports.Product = Product;
var products = [
    new Product(1, '第一个商品', 123, 3.5, '这个是商品的描述的描述', ['食物', '电子产品']),
    new Product(2, '第二个商品', 123, 4.5, '这个是商品的描述的描述', ['食物']),
    new Product(3, '第三个商品', 123, 2.5, '这个是商品的描述的描述', ['电子产品']),
    new Product(4, '第四个商品', 123, 5, '这个是商品的描述的描述', ['食物', '图书']),
    new Product(5, '第五个商品', 123, 1.5, '这个是商品的描述的描述', ['食物', '图书']),
    new Product(6, '第六个商品', 123, 3.5, '这个是商品的描述的描述', ['电子产品', '图书']),
    new Product(7, '第七个商品', 123, 2.5, '这个是商品的描述的描述', ['图书']),
    new Product(8, '第八个商品', 123, 4.5, '这个是商品的描述的描述', ['食物', '图书'])
];
// 评论数据
var Comment = (function () {
    function Comment(id, productId, timestamp, username, rating, content) {
        this.id = id;
        this.productId = productId;
        this.timestamp = timestamp;
        this.username = username;
        this.rating = rating;
        this.content = content;
    }
    return Comment;
}());
exports.Comment = Comment;
var comments = [
    new Comment(1, 1, '2017-03-12 22:22:22', '小名', 3.6, '东西不错'),
    new Comment(2, 1, '2017-01-22 10:22:22', '张三', 4, '东西不错'),
    new Comment(3, 1, '2017-02-12 9:22:22', '李四', 5, '东西不错'),
    new Comment(4, 2, '2017-04-10 2:22:22', '王五', 1, '东西不错')
];
app.use('/', express.static(path.join(__dirname, '..', 'public')));
app.get('/api/products', function (req, res) {
    // res.json(products);
    var result = products;
    var params = req.query; //前台传上传的查询参数的值---这是一个对象
    if (params.title) {
        result = result.filter(function (p) { return p.title.indexOf(params.title) !== -1; });
    }
    if (params.price && result.length > 0) {
        result = result.filter(function (p) { return p.price <= parseInt(params.price); });
    }
    if (params.category !== '-1' && params.category && result.length > 0) {
        result = result.filter(function (p) { return p.categories.indexOf(params.category) !== -1; });
    }
    res.json(result);
});
app.get('/api/product/:id', function (req, res) {
    res.json(products.find(function (product) {
        return product.id == req.params.id;
    }));
});
app.get('/api/product/:id/comments', function (req, res) {
    res.json(comments.filter(function (comment) {
        return comment.productId == req.params.id;
    }));
});
var server = app.listen(8000, 'localhost', function () {
    console.log('服务器已启动，地址是http://localhost:8000');
});
var subscriptions = new Map();
//websocket
var wsServer = new ws_1.Server({ port: 8085 });
//websocket连接时，向客户端推送消息
wsServer.on('connection', function (websocket) {
    // websocket.send('这个消息是服务器主动推送的');
    // 对客户端的发送的消息进行响应
    websocket.on('message', function (message) {
        // 接受到客户端的消息
        var messageObj = JSON.parse(message);
        // 连接websocket的时候，客户端会产生唯一的token,即这个map的唯一的key
        var productIds = subscriptions.get(websocket) || [];
        subscriptions.set(websocket, productIds.concat([messageObj.productId]));
    });
});
// 定时向客户端推送消息
// setInterval(() => {
//   if(wsServer.clients) {
//     wsServer.clients.forEach(client => {
//       client.send('这是服务器定时推送到客户端的的消息');
//     })
//   }
// }, 5000);
var currentBids = new Map();
// 向客户端推送报价
setInterval(function () {
    products.forEach(function (p) {
        var currentBid = currentBids.get(p.id) || p.price;
        var newBid = currentBid + Math.random() * 5;
        currentBids.set(p.id, newBid);
    });
    subscriptions.forEach(function (productIds, ws) {
        if (ws.readyState === 1) {
            //由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象
            // 必须在对象外面加上括号
            var newBids = productIds.map(function (pid) { return ({
                productId: pid,
                bid: currentBids.get(pid)
            }); });
            // 把最新的价格推送给客户端
            ws.send(JSON.stringify(newBids));
        }
        else {
            subscriptions.delete(ws);
        }
    });
}, 2000);
