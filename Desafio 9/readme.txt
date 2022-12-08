Desafio 9

Consigna: Utilizando Mongo Shell, crear una base de datos llamada ecommerce que contenga dos colecciones: mensajes y productos.

db.createCollection("mensajes")
db.createCollection("productos")

1) Agregar 10 documentos con valores distintos a las colecciones mensajes y productos. El
formato de los documentos debe estar en correspondencia con el que venimos utilizando en
el entregable con base de datos MariaDB. 

2) Definir las claves de los documentos en relación a los campos de las tablas de esa base. En
el caso de los productos, poner valores al campo precio entre los 100 y 5000 pesos. 

db.productos.insertMany([{nombre: X, precio: X, img: X, codigo: X, timestamp: ISODate()},{etc...}])
db.mensajes.insertMany([{email: X, mensaje: x, hora: ISODate()},{etc...}])

3) Listar todos los documentos en cada colección.

db.mensajes.find().pretty()
db.productos.find().pretty()

4) Mostrar la cantidad de documentos almacenados en cada una de ellas.

db.mensajes.estimatedDocumentCount()
db.productos.estimatedDocumentCount()

5) Realizar un CRUD sobre la colección de productos:
a) Agregar un producto más en la colección de productos 

db.productos.insertOne({nombre: X, precio: X, img: X, codigo: X, timestamp: ISODate()})

b) Realizar una consulta por nombre de producto específico:
i) Listar los productos con precio menor a 1000 pesos.
db.productos.find({precio:{$lt: 1000}}).pretty()

ii) Listar los productos con precio entre los 1000 a 3000 pesos.
db.productos.find({precio:{$gt: 1000, $lt: 3000}}).pretty()

iii) Listar los productos con precio mayor a 3000 pesos.
db.productos.find({precio:{$gt: 3000}}).pretty()

iv) Realizar una consulta que traiga sólo el nombre del tercer producto más barato.
db.productos.find().sort({precio: 1}).limit(3).skip(2).limit(1)

c) Hacer una actualización sobre todos los productos, agregando el campo stock a todos
ellos con un valor de 100

db.productos.updateMany({precio:{$gt: 1}},{$set:{stock: 100}})

d) Cambiar el stock a cero de los productos con precios mayores a 4000 pesos

db.productos.updateMany({precio:{$gt: 4000}},{$set:{stock: 0}})

e) Borrar los productos con precio menor a 1000 pesos 

db.productos.deleteMany({precio:{$lt:1000}})

6) Crear un usuario 'pepe' clave: 'asd456' que sólo pueda leer la base de datos ecommerce.
Verificar que pepe no pueda cambiar la información.

db.createUser({user: "pepe", pwd: "asd456", roles:[{role: "read", db: "ecommerce"}]})
