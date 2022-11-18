const express = require('express');
const app = express();
const Contenedor = require('./container.js');
const Productos = new Contenedor('productos.txt');
const Chats = new Contenedor('chat.txt');
const { engine } = require('express-handlebars');
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public/'));
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
httpServer.listen(8000, () => console.log('SERVER ON http://localhost:' + 8000));

app.get('/form', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/form', (req, res) => {
  const { body } = req;
  Productos.save(body);
  // res.json('Producto agregado');
  console.log(body);
});

app.get('/productos', async (req, res) => {
  const products = await Productos.getAll();
  res.render('productslist', { products, productsExist: true });
});

app.get('/', async (req, res) => {
  const products = await Productos.getAll();
  res.render('home', { products, productsExist: true });
});

io.on('connection', (socket) => {
  console.log('usuario conectado');

  socket.on('msg', async (data) => {
    console.log(data);
    await Chats.save({ hora: Date(), ...data });
    io.sockets.emit('msg-list', await Chats.getAll());
  });

  // socket.on('productos', async (data) => {
  //   console.log(data);
  //   const products = await Productos.getAll();
  //   io.sockets.emit('listaProductos', products);
  // });
});
