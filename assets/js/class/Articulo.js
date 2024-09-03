export default class Articulo {
    static contadorID = 0;

    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
        this.idArticulo = Articulo.contadorID++;
    }

    getNombre = () => this.nombre;
    setNombre = nombre => this.nombre = nombre;

    getPrecio = () => this.precio;
    setPrecio = precio => this.precio = precio;

    getId = () => this.idArticulo;
}