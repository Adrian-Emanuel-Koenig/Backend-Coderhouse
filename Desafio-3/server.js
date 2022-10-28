const express = require('express')
const app = express()
const port = process.env.PORT || 8080;
const Contenedor = require("./container.js")

async function Server(){
    const Productos = new Contenedor("productos.txt");
    const products = await Productos.getAll();

    app.get('/', (req, res) => {
        res.send('Hello World!')
    })
    
    app.get('/productos', (req, res) => {
        res.json(products)
    })
    
    app.get('/productoRandom', (req, res) => {
        const random = (Math.floor(Math.random() * products.length + 1 ))
        const randomProduct = products.find(el => el.id === random)
        res.json(randomProduct)    
    })
    
    app.listen(port, () => {
        console.log(`Example app listening on port http://localhost:${port}`)
    })
}

Server()