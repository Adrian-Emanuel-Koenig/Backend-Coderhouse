const express = require('express');
const { Router } = express;
const router = Router();
const app = express();
const port = process.env.PORT || 8080;
const Contenedor = require('./container.js');
const Productos = new Contenedor('productos.txt');

app.use('/api/productos', router);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public/'));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

app.post('/form', (req, res) => {
  const { body } = req;
  Productos.save(body);
  res.json('Producto agregado');
  console.log(body);
});

app.set('view engine', 'ejs');
app.get('/products', async (req, res) => {
  const products = await Productos.getAll();
  res.render('pages/index', { title: 'listado de productos', products });
});

app.get('/', (req, res) => {
  res.render('pages/form');
});

