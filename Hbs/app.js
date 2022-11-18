const express = require('express');
const app = express();
const Contenedor = require('./container.js');
const Productos = new Contenedor('productos.txt');
const Chats = new Contenedor('chat.txt');
const { engine } = require('express-handlebars');
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);
const port = process.env.port || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'hbs');
app.set('views', './views');
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
  })
);

httpServer.listen(port, () => console.log('SERVER ON http://localhost:' + port));

app.get('/', async (req, res) => {
  res.render('home');
});

io.on('connection', async (socket) => {
  const products = await Productos.getAll();
  socket.emit('allProducts', products);
  socket.on('msg', async (data) => {
    await Chats.save({ hora: Date(), ...data });
    io.sockets.emit('msg-list', await Chats.getAll());
  });

  socket.on('productoEnviado', saveProduct);
});

async function saveProduct(data) {
  await Productos.save(data);
  Productos.getAll().then((element) => io.sockets.emit('allProducts', element));
}
