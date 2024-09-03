import {ProveedorInternacional, ProveedorNacional} from "./class/Proveedor.js";
import Articulo from "./class/Articulo.js";

const d = document;

const proveedores = [],
    articulos = [],
    infoProveedor = new Map(),
    correos = new Set();

const consultarCorreo = correo => 
    correos.has(correo);

const verificarProveedor = (nombre, correo, telefono, pais) => 
    consultarCorreo(correo)
        ? alert(`El email ${correo} ya existe, no se puede volver a registrar un proveedor con este correo`)
        : nacionalidadProveedor(nombre, correo, telefono, pais);

const verificarArticulo = (correo, nombre, precio) => 
    consultarCorreo(correo)
        ? anadirArticulo(correo, nombre, precio)
        : alert(`El email ${correo} no existe`);

function nacionalidadProveedor(nombre, correo, telefono, pais) {
    if(pais == "chile") {
        let proveedor = new ProveedorNacional(nombre, correo, telefono, pais);
        anadirProveedor(proveedor, correo);
    } else {
        let proveedor = new ProveedorInternacional(nombre, correo, telefono, pais);
        anadirProveedor(proveedor, correo);
    }
}

const anadirProveedor = (proveedor, correo) => {
    correos.add(correo);
    proveedores.push(proveedor);
    infoProveedor.set(proveedor.getEmail(), proveedor.getId());
    mostrarProveedor();
}

const anadirArticulo = (correo, nombre, precio) => {
    let articulo = new Articulo(nombre, precio);
    articulos.push(articulo);
    proveedores[infoProveedor.get(correo)].registrarArticulo(articulo);
    mostrarArticulos();
}

const consultarDatosProveedor = correo => 
    consultarCorreo(correo)
        ? proveedores[infoProveedor.get(correo)].getInfoProveedor()
        : alert(`El correo ${correo} no existe`);

const consultarArticulosPorProveedor = correo =>
    consultarCorreo(correo)
        ? proveedores[infoProveedor.get(correo)].getInfoArticulo()
        : alert(`El correo ${correo} no existe`)

// Anadir datos por defecto
const gestionarProveedores = [
        {
            nombre: "Mauricio", 
            email: "Mauri@email.com", 
            telefono: 931823578,
            pais: "chile"
        },
        {
            nombre: "Pedro",
            email: "Pedro@email.com",
            telefono: 985739285,
            pais: "argentina"
        },
        {
            nombre: "Ignacio", 
            email: "Ignacio@email.com", 
            telefono: 985748397,
            pais: "chile"
        },
        {
            nombre: "Juan", 
            email: "Juan@email.com", 
            telefono: 958362857,
            pais: "peru"
        },
        {
            nombre: "Gabriel", 
            email: "Gabriel@email.com", 
            telefono: 985748398,
            pais: "chile"
        }
    ],
    gestionarArticulos = [
        {
            email: "Pedro@email.com",
            nombre: "Limon",
            precio: 300
        },
        {
            email: "Mauri@email.com",
            nombre: "Fideos",
            precio: 500
        },
        {
            email: "Pedro@email.com",
            nombre: "Arroz",
            precio: 1000
        }
    ]

gestionarProveedores.forEach(proveedor => {
    verificarProveedor(proveedor.nombre, proveedor.email, proveedor.telefono, proveedor.pais);
})

gestionarArticulos.forEach(articulo => {
    verificarArticulo(articulo.email, articulo.nombre, articulo.precio);
})

// Mostrar datos registrados
function mostrarProveedor() {
    const $tablaProveedor = d.getElementById("tablaProveedores"),
        $tablaCuerpoProveedor = d.createElement("tbody");
    $tablaProveedor.innerHTML = `
        <caption>Proveedores Registrados</caption>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Telefono</th>
                <th>Pais</th>
            </tr>
        </thead>    
    `
    proveedores.forEach(proveedor => {
        $tablaCuerpoProveedor.innerHTML += `
            <tr>
                <td>${proveedor.getId()}</td>
                <td>${proveedor.getNombre()}</td>
                <td>${proveedor.getEmail()}</td>
                <td>${proveedor.getTelefono()}</td>
                <td>${proveedor.getPais()}</td>
            </tr>
        `
        $tablaProveedor.appendChild($tablaCuerpoProveedor);
    })
}

function mostrarArticulos() {
    const $tablaArticulos = d.getElementById("tablaArticulos"),
        $tablaCuerpoArticulo = d.createElement("tbody");
    $tablaArticulos.innerHTML = `
        <caption>Articulos Registrados</caption>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
            </tr>
        </thead>
    `
    articulos.forEach(articulo => {
        $tablaCuerpoArticulo.innerHTML += `
            <tr>
                <td>${articulo.getId()}</td>
                <td>${articulo.getNombre()}</td>
                <td>${articulo.getPrecio()}</td>
            </tr>
        `
        $tablaArticulos.appendChild($tablaCuerpoArticulo);
    })
}

// Acciones de Btn
d.getElementById("registrarProveedorBtn").addEventListener("click", e => {
    verificarProveedor(
        d.getElementById("nombreProveedor").value, 
        d.getElementById("emailProveedor").value, 
        d.getElementById("telefonoProveedor").value,
        d.getElementById("paisProveedor").value.toLowerCase().trim());
})

d.getElementById("registrarArticuloBtn").addEventListener("click", e => {
    verificarArticulo(
        d.getElementById("emailProveedorRegistrado").value, 
        d.getElementById("nombreArticulo").value, 
        parseInt(d.getElementById("precioArticulo").value));
})

d.getElementById("buscarDatosProveedorBtn").addEventListener("click", e => {
    consultarDatosProveedor(d.getElementById("emailDatosProveedorBuscado").value);
})

d.getElementById("buscarArticulosProveedorBtn").addEventListener("click", e => {
    consultarArticulosPorProveedor(d.getElementById("emailProveedorBuscado").value);
})