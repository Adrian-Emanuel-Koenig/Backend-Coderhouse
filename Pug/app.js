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
  res.render('return.pug');
  console.log(body);
});


app.set('views', './views');
app.set('view engine', 'pug');
app.get('/productos', async (req, res) => {
  const products = await Productos.getAll();
  const productsExist = products.length > 0
  res.render('productos.pug', { mensaje: 'Vista de Productos', productos: products, productsExist});
});


app.get('/', (req, res) => {
  res.render("form.pug")
});

