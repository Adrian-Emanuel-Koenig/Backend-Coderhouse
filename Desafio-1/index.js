class Usuario {
    constructor (nombre, apellido){
        this.nombre = nombre
        this.apellido = apellido
        this.libros = []
        this.mascotas = []
    }

    getFullName(){
        return `${this.nombre} ${this.apellido}`
    }
    addMascota(nombre, raza){
        this.mascotas = [...this.mascotas, {nombre, raza}]
    }
    countMascotas(){
        return this.mascotas.length
    }
    addBook(nombre, autor){
        this.libros = [...this.libros, {nombre, autor}]
    }
    getBookNames(){
        const bookNames = this.libros.map(book => book.nombre)
        return bookNames
    }
    getBook(){
        return this.libros
    }
    getMascotas(){
        return this.mascotas
    }
}

const user = new Usuario("Adrián","Koenig")

user.addMascota("Logan","Perro")
user.addMascota("Luna","Gato")
user.addBook("El nombre del viento", "Patrick Rothfuss")
user.addBook("El temor de un hombre sabio", "Patrick Rothfuss")
user.addBook("Las puertas de piedra", "Patrick Rothfuss")
user.addBook("La música del silencio", "Patrick Rothfuss")

console.log(user.getFullName())
console.log(user.getMascotas())
console.log(user.countMascotas())
console.log(user.getBook())
console.log(user.getBookNames())
