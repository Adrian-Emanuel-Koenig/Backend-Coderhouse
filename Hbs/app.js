const express = require('express');
const { Router } = express;
const router = Router();
const app = express();
const port = process.env.PORT || 8080;
const Contenedor = require('./container.js');
const Productos = new Contenedor('productos.txt');
const { engine } = require('express-handlebars');

app.use('/api/productos', router);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public/'));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

app.get('/form', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/form', (req, res) => {
  const { body } = req;
  Productos.save(body);
  res.json('Producto agregado');
  console.log(body);
});

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

app.get('/productos', async (req, res) => {
  const products = await Productos.getAll();
  res.render('productslist', {products, productsExist: true });
});

app.get('/', (req, res)=>{
  res.render('form')
})

