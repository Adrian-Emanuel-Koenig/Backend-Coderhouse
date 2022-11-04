const express = require('express');
const { Router } = express;
const router = Router();
const app = express();
const port = process.env.PORT || 8080;
const Contenedor = require('./container.js');
const contenedor = new Contenedor();

app.use('/api/productos', router);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

app.get('/form', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/form', (req, res, next) => {
  const { body } = req;
  contenedor.save(body);
  res.json('Producto agregado');
});

  const Productos = new Contenedor('productos.txt');

  /* -------------------------------------------------------------------------- */
  /*                                     GET                                    */
  /* -------------------------------------------------------------------------- */
  app.get('/', (req, res) => {
    res.send('<h1>CODERHOUSE - BACKEND</h1>');
  });
  router.get('/', async(req, res) => {
    const products = await Productos.getAll();
    const { query } = req;
    console.log(query);
    if (query?.title) {
      const productosFiltrados = products.filter((e) => e.title == query.title);

      return res.json(productosFiltrados);
    }
    res.json(products);
  });

  /* ------------------------------- GET RANDOM ------------------------------- */

  router.get('/Random', async(req, res) => {
    const products = await Productos.getAll();
    const random = Math.floor(Math.random() * products.length + 1);
    const randomProduct = products.find((el) => el.id === random);
    res.json(randomProduct);
  });

  /* --------------------------------- GET ID --------------------------------- */

  router.get('/:id', async(req, res) => {
    const products = await Productos.getAll();
    const { id } = req.params;
    const productoId = products.find((e) => e.id == id);
    if (!productoId) {
      res.json('Error: Producto no encontrado.');
    } else {
      res.json(productoId);
    }
  });

  /* -------------------------------------------------------------------------- */
  /*                                    POST                                    */
  /* -------------------------------------------------------------------------- */

  router.post('/', async(req, res) => {
    const products = await Productos.getAll();
    const { body } = req;
    products.push(body);
    res.json('ok');
  });

  /* -------------------------------------------------------------------------- */
  /*                                     PUT                                    */
  /* -------------------------------------------------------------------------- */

  router.put('/:id', async(req, res) => {
    const products = await Productos.getAll();
    const { id } = req.params;
    const { body } = req;
    const indice = products.findIndex((e) => e.id == id);
    if (indice >= 0) {
      products[indice] = body;
      res.json(body);
    } else {
      res.json('Error: Producto no encontrado.');
    }
  });

  /* -------------------------------------------------------------------------- */
  /*                                   DELETE                                   */
  /* -------------------------------------------------------------------------- */

  router.delete('/:id', async(req, res) => {
    const products = await Productos.getAll();
    const { id } = req.params;
    const productosDelete = products.filter((e) => e.id != id);
    res.json(productosDelete);
  });
