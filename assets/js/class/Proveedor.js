export default class Proveedor {
    static contadorId = 0;

    constructor(nombre, email, telefono) {
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.idProveedor = Proveedor.contadorId++;
        this.articulos = [];
    }

    getNombre = () => this.nombre;
    setNombre = nombre => this.nombre = nombre;

    getEmail = () => this.email;
    setEmail= email => this.email = email;

    getTelefono = () => this.telefono;
    setTelefono = telefono => this.telefono = telefono;

    getId = () => this.idProveedor;

    registrarArticulo = articulo => this.articulos.push(articulo);

    getInfoProveedor() {
        const $tablaProveedor = document.getElementById("tablaDatosProveedor"),
            $tablaCuerpoProveedor = document.createElement("tbody");
        $tablaProveedor.innerHTML = `
            <caption>Datos del proveedor con email <span>${this.getEmail()}</span></caption>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Telefono</th>
                </tr>
            </thead>
        `
        $tablaCuerpoProveedor.innerHTML += `
            <tr>
                <td>${this.getId()}</td>
                <td>${this.getNombre()}</td>
                <td>${this.getTelefono()}</td>
            </tr>
        `
        $tablaProveedor.appendChild($tablaCuerpoProveedor);
    }

    getInfoArticulo() {
        const $tablaArticulo = document.getElementById("tablaArticulosPorProveedor"),
        $tablaCuerpoArticulo = document.createElement("tbody");
        $tablaArticulo.innerHTML = `
            <caption>Datos de los articulos del proveedor con email <span>${this.getEmail()}</span></caption>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                </tr>
            </thead>
        `
        this.articulos.forEach(articulo => {
            $tablaCuerpoArticulo.innerHTML += `
                <tbody>
                    <tr>
                        <td>${articulo.getId()}</td>
                        <td>${articulo.getNombre()}</td>
                        <td>${articulo.getPrecio()}</td>
                    </tr>
                </tbody>
            `
            $tablaArticulo.appendChild($tablaCuerpoArticulo);
        })
    }
}