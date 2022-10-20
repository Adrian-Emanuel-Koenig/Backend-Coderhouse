const fs = require("fs");

class Contenedor {
    constructor(name){
        this.file = name;
    }

    async save(product){
        try {
            if(fs.existsSync(this.file)){
                const productos = await this.getAll();
                if(productos.length>0){
                    const lastId =productos[productos.length-1].id+1;
                    product.id = lastId;
                    productos.push(product);
                    await fs.promises.writeFile(this.file,JSON.stringify(productos,null,2));
                } else{
                    product.id = 1;
                    await fs.promises.writeFile(this.file,JSON.stringify([product],null,2));
                }
            } else {
                product.id = 1;
                await fs.promises.writeFile(this.file,JSON.stringify([product],null,2));
            }
        } catch (error) {
            return "Error al guardar el producto";
        }
    }

    async getAll(){
        try {
            const contenido = await fs.promises.readFile(this.file,"utf-8");
            if(contenido.length>0){
                const productos = JSON.parse(contenido);
                return productos;
            } else{
                return [];
            }
        } catch (error) {
            return "El archivo no pudo ser leido";
        }
    }

    async getById(id){
        try {
            const productos = await this.getAll();
            const producto = productos.find(e=>e.id === id);
            return producto;
        } catch (error) {
            return "El producto no se encuentra";
        }
    }

    async deleteById(id){
        try {
            const productos = await this.getAll();
            const newProducts = productos.filter(e=>e.id !== id);
            await fs.promises.writeFile(this.file,JSON.stringify(newProducts,null,2));
            return `Producto id: ${id} fue borrado`;
        } catch (error) {
            return "El producto no pudo ser borrado"
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.file, '');
        } catch {
            console.log('Error al vaciar el archivo')
        }
    }
}

const producto1={
    title: "El nombre del viento",
    price: 7000,
    thumbnail: "https://images.cdn3.buscalibre.com/fit-in/360x360/a7/90/a790dff70defe5c61b66fd73716b6e30.jpg"
}
const producto2={
    title: "El temor de un hombre Sabio",
    price: 8500,
    thumbnail: "https://www.popularlibros.com/imagenes.webp_grandes/9788401/978840133963.webp"
}
const producto3={
    title: "Las puertas de piedra",
    price: 10000,
    thumbnail: "http://www.cronicadelasesinodereyes.com/wp-content/uploads/2017/02/las-puertas-de-piedra.jpg"
}

const Productos = new Contenedor("productos.txt");
console.log(Productos);

const data = async()=>{
    await Productos.save(producto1);
    await Productos.save(producto2);
    await Productos.save(producto3);
    await Productos.getAll();
    await Productos.getById(1);
    await Productos.deleteById(1);
    await Productos.deleteAll()
}
data();