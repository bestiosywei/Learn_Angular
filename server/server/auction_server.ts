import * as express from 'express';
import * as path from 'path';
import { Server} from 'ws';
const app = express();

// 商品数据
export class Product {
  constructor(
    public id:number,
    public title:string,
    public price:number,
    public rating:number,
    public desc:string,
    public categories:Array<string>
  ) {}
}

const products: Product[] = [
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
export class Comment {
  constructor(
    public id: number,
    public productId: number,
    public timestamp: string,
    public username: string,
    public rating: number,
    public content: string
  ){}
}

const comments: Comment[] = [
    new Comment(1, 1, '2017-03-12 22:22:22', '小名', 3.6, '东西不错'),
    new Comment(2, 1, '2017-01-22 10:22:22', '张三', 4, '东西不错'),
    new Comment(3, 1, '2017-02-12 9:22:22', '李四', 5, '东西不错'),
    new Comment(4, 2, '2017-04-10 2:22:22', '王五', 1, '东西不错')
  ];

app.use('/', express.static(path.join(__dirname, '..', 'public')));
app.get('/api/products', (req, res) => {
  // res.json(products);
  let result = products;
  let params = req.query; //前台传上传的查询参数的值---这是一个对象
  if(params.title) {
    result = result.filter((p) => p.title.indexOf(params.title) !== -1);
  }

  if(params.price && result.length > 0) {
    result = result.filter((p) => p.price <= parseInt(params.price));
  }

  if(params.category !== '-1' && params.category && result.length > 0 ) {
    result = result.filter((p) => p.categories.indexOf(params.category) !== -1);
  }
   res.json(result);
});

app.get('/api/product/:id', (req, res) =>{
  res.json(products.find((product) => 
    product.id == req.params.id
  ));
});

app.get('/api/product/:id/comments', (req, res) => {
  res.json(comments.filter((comment: Comment) => 
    comment.productId == req.params.id
  ));
});

const server = app.listen(8000, 'localhost', () => {
  console.log('服务器已启动，地址是http://localhost:8000');
});

const subscriptions = new Map<any, number[]>();

//websocket
const wsServer = new Server({port: 8085});

//websocket连接时，向客户端推送消息
wsServer.on('connection', websocket => {
  // websocket.send('这个消息是服务器主动推送的');
  // 对客户端的发送的消息进行响应
  websocket.on('message', message => {
    // 接受到客户端的消息
    let messageObj = JSON.parse(message);
    // 连接websocket的时候，客户端会产生唯一的token,即这个map的唯一的key
    let productIds = subscriptions.get(websocket) || [];
    subscriptions.set(websocket, [...productIds, messageObj.productId]);
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

const currentBids = new Map<number, number>()

// 向客户端推送报价
setInterval(() => {
  products.forEach( p => {
    let currentBid = currentBids.get(p.id) || p.price;
    let newBid = currentBid + Math.random() * 5;
    currentBids.set(p.id, newBid);
  });

  subscriptions.forEach((productIds: number[], ws) => {
    if(ws.readyState === 1) {
      //由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象
      // 必须在对象外面加上括号
      let newBids = productIds.map( pid => ({
        productId: pid,
        bid: currentBids.get(pid)
      }));
      // 把最新的价格推送给客户端
      ws.send(JSON.stringify(newBids));
    }else {
      subscriptions.delete(ws);
    }
  });
}, 2000);