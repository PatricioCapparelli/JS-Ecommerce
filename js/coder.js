class Usuario {
    constructor(nombreUsuario, apellidoUsuario, edadUsuario, contraseñaUsuario) {
        this.nombreUsuario = nombreUsuario;
        this.apellidoUsuario = apellidoUsuario;
        this.edadUsuario = edadUsuario;
        this.contraseñaUsuario = contraseñaUsuario;
    }

    validar() {
        const nombreUsuario = this.nombreUsuario.trim();
        const apellidoUsuario = this.apellidoUsuario.trim();
        const edadUsuario = parseInt(this.edadUsuario);
        const contraseñaUsuario = this.contraseñaUsuario; 
        const regexNombreApellido = /^[a-zA-Z]+$/;

        if (nombreUsuario && apellidoUsuario && !isNaN(edadUsuario) && edadUsuario >= 18 && contraseñaUsuario.length >= 8) {
            if (regexNombreApellido.test(nombreUsuario) && regexNombreApellido.test(apellidoUsuario)) {
                return true;
            } else {
                return "Ingrese un nombre y un apellido válidos";
            }
        } else if (isNaN(edadUsuario)) {
            return "Ingrese una edad válida";
        } else if (contraseñaUsuario.length < 8) {
            return "La contraseña debe tener al menos 8 caracteres";
        } else {
            const añosFaltantes = 18 - edadUsuario;
            return `Te faltan ${añosFaltantes} años para registrarte`;
        }
    }
}

let form = document.querySelector('#form_t');
let boton = document.getElementById('btn');
let user = document.querySelector('#user');
let inf_container = null;

function validarRegistro(e) {
    e.preventDefault(); // Prevenir la accion por defecto de submit

    let nombreUsuario = document.getElementById('nombre').value.trim();
    let apellidoUsuario = document.getElementById('apellido').value.trim();
    let edadUsuario = document.getElementById('edad').value.trim();
    let contraseñaUsuario = document.getElementById('contraseña').value; 

    // Crear una instancia de usuario con los datos del formulario
    let usuario = new Usuario(nombreUsuario, apellidoUsuario, edadUsuario, contraseñaUsuario);

    let mensaje = usuario.validar();

    if (mensaje === true) {
        // Limpiar contenido anterior
        user.innerHTML = '';

        // Mostrar mensaje de bienvenida
        inf_container = document.createElement('div');
        inf_container.innerHTML = `
            <p>Bienvenido <span class="inf_container">${usuario.nombreUsuario}</span>, registro exitoso ✔</p>
        `;
        user.appendChild(inf_container);
        boton.style.color = 'yellow';
    } else {
        // Mostrar mensaje de error
        inf_container = document.createElement('div');
        inf_container.innerHTML = `
            <p>Error: ${mensaje} ✖</p>
        `;
        user.appendChild(inf_container);
    }
}

form.addEventListener('submit', validarRegistro);

// Limpiar contenido al hacer clic en el boton
boton.addEventListener('click', () => {
    if (inf_container) {
        inf_container.remove();
    }
});

// duplicacion de elementos del carrito


    // function duplicarElemento() {
    //     // Seleccionar el elemento original que queremos duplicar
    //     const articuloOriginal = document.querySelector('.card-container-min');

    //     // Crear una copia del elemento
    //     const articuloCopia = articuloOriginal.cloneNode(true); // true para copiar también los elementos hijos

    //     // Insertar la copia en el contenedor deseado (en este caso, en el div con id "productos")
    //     const contenedorProductos = document.getElementById('productos');
    //     contenedorProductos.appendChild(articuloCopia);
    // }

    // // Llamar a la función para duplicar el elemento al cargar la página o cuando sea necesario
    // duplicarElemento();

// Array con los datos de cada producto
const productos = [
    {
        imagen: "./assets/images/ledn1.webp",
        precio: "$277.999",
        nombre: "Tv Smart Led Philips 32 Hd 32phd6918/77 Google Tv"
    },
    {
        imagen: "./assets/images/celun1.webp",
        precio: "$249.999",
        nombre: "Xiaomi Redmi 10c Dual Sim 128gb 4gb Ram Ocean Blue"
    },
    {
        imagen: "./assets/images/zapan1.webp",
        precio: "$35.992",
        nombre: "Zapatillas Jaguar Oficial Deportiva Art. #9339 39al45"
    },
    {
        imagen: "./assets/images/jbl.webp",
        precio: "$144.999",
        nombre: "Parlante Jbl Flip 6 Portatil Bluetooth Color Negro"
    },
    {
        imagen: "./assets/images/pcn1.webp",
        precio: "$475.199",
        nombre: "Pc Armada Gamer Amd Ryzen 5 4600g Ram 16gb Radeon Vega Hdmi"
    },
    {
        imagen: "./assets/images/taladron1.webp",
        precio: "$88.754",
        nombre: "Taladro Atornillador Percutor + 2 Baterias Gp By Lusqtoff"
    },
    {
        imagen: "./assets/images/monitorn1.webp",
        precio: "$269.999",
        nombre: "Monitor Gamer 23.8 Aoc G2490vx 144hz Free Sync Display Port Color Negro/Rojo"
    }
];

// Función para crear y agregar cada producto al contenedor
function agregarProductos() {
    const contenedorProductos = document.getElementById('productos');

    productos.forEach(producto => {
        // Crear elemento article
        const articulo = document.createElement('article');
        articulo.classList.add('card-container-min');

        if (producto.nombre === "Xiaomi Redmi 10c Dual Sim 128gb 4gb Ram Ocean Blue") {
            articulo.classList.add('card__celun1'); 
        }

        if (producto.nombre === "Pc Armada Gamer Amd Ryzen 5 4600g Ram 16gb Radeon Vega Hdmi") {
            articulo.classList.add('card__pcn1'); 
        }

        if (producto.nombre === "Monitor Gamer 23.8 Aoc G2490vx 144hz Free Sync Display Port Color Negro/Rojo") {
            articulo.classList.add('card__mon1'); 
        }

        // Crear elementos dentro de article
        const imagen = document.createElement('img');
        imagen.src = producto.imagen;
        imagen.alt = "";

        const precio = document.createElement('h2');
        precio.textContent = producto.precio;

        const nombre = document.createElement('p');
        nombre.textContent = producto.nombre;

        const enlace = document.createElement('a');
        enlace.href = "#"; // Puedes establecer un enlace adecuado si lo deseas
        enlace.textContent = "🛒";

        // Agregar elementos al article
        articulo.appendChild(imagen);
        articulo.appendChild(precio);
        articulo.appendChild(nombre);
        articulo.appendChild(enlace);

        // Agregar article al contenedor de productos
        contenedorProductos.appendChild(articulo);
    });
}

// Llamar a la función para agregar los productos al cargar la página
document.addEventListener('DOMContentLoaded', agregarProductos);





// bucle 

// let carrito = [];

// let ropa;
// while (ropa !== 'salir') {
//     ropa = prompt('Ingrese la prenda que le interesa y le diremos su precio \n "remera" \n "pantalon" \n "zapatillas" \n "buzo" \n "gorra" \n para salir ingrese la palabra salir.');
//     // opciones de ropa
//     let precioPrenda;
//     switch(ropa) {
//         case 'remera':
//             precioPrenda = prompt('la remera cuesta $9000 ¿deseas comprarla? si/no');
//             if(precioPrenda.toLowerCase() === 'si'){
//                 carrito.push(9000);
//             }
//             break;
//         case 'pantalon':
//             precioPrenda = prompt('el pantalon cuesta $40000 ¿deseas comprarlo? si/no');
//             if(precioPrenda.toLowerCase() === 'si'){
//                 carrito.push(40000);
//             }
//             break;
//         case 'zapatillas':
//             precioPrenda = prompt('las zapatillas cuestan $189000 ¿deseas comprarlas? si/no');
//             if(precioPrenda.toLowerCase() === 'si'){
//                 carrito.push(189000);
//             }
//             break;
//         case 'buzo':
//             precioPrenda = prompt('el buzo cuesta $50000 ¿deseas comprarlo? si/no');
//             if(precioPrenda.toLowerCase() === 'si'){
//                 carrito.push(50000);
//             }
//             break;
//         case 'gorra':
//             precioPrenda = prompt('la gorra cuesta $10000 ¿deseas comprarla? si/no');
//             if(precioPrenda.toLowerCase() === 'si'){
//                 carrito.push(10000);
//             }
//             break;
//         // salida del bucle
//         case 'salir':
//             alert('Buena eleccion!');
//             break;
//         default:
//             alert("No se encuentra disponible esa prenda.");
//             continue; // volver al inicio del bucle si no es valido.
//     }
// }

// console.log(carrito);
// let totalProductos = carrito.length ; //cantidad de productos del (array) carrito asignada a una variable.
// let precioTotal = carrito.reduce((total, precio) => total + precio, 0); // metodo para sumar todos los productos del carrito.
// alert('Cantidad de productos: ' + totalProductos + '\nPrecio total: $' + precioTotal);

// // calcular precio final

// let calcIva = (value) => value * 0.21; // declarando una variable y asignandole una funcion flecha que calcula el iva.

// function realizarCompra(precioTotal) { // creando funcion que calcule el precio total.
//     let final = prompt('¿Desea realizar la compra? Le ofrecemos un descuento! Si/No');
//     if (final.toLowerCase() === 'si') {
//         function calcularPrecioFinal(precioBase, fn, descuentoPorcentaje) { // creando funcion para luego pasarle argumentos.
//             if (isNaN(precioBase) || precioBase < 0) {
//                 alert("Precio inválido");
//                 return; // Detener la ejecución 
//             }
//            // Descuento
//             const descuento = precioBase * (descuentoPorcentaje / 100);
//             const precioConDescuento = precioBase - descuento;

//             // Impuesto
//             const precioConIva = fn(precioConDescuento); //calculando precio con funcion por parametro y asignandolo a la constante.

//             // Precio final
//             const precioFinal = precioConDescuento + precioConIva;

//             // Return del precio final
//             return precioFinal;
// }
        
//         let descuentoPorcentaje = 20; // variable de descuento con valor asignado

//         const precioFinalProducto = calcularPrecioFinal(precioTotal, calcIva, descuentoPorcentaje); // llamando a la funcion, pasandole los argumentos y asignando su return a la constante.

//         // Resultado final
//         if (precioFinalProducto !== undefined) {
//             // Mostrar solo si el precio final es valido
//             alert("Precio final del producto: " + precioFinalProducto + ' $');
//             alert("¡Vuelva pronto! :D");
//             console.log('su precio final por consola es: $'+ precioFinalProducto);
//             fechaDeCompra();
//         }
//     } else {
//         alert('Gracias por visitarnos, vuelva pronto!');
//     }
// }

// // Llamando a la función para iniciar la compra pasando precioTotal como argumento.

// realizarCompra(precioTotal);
// function fechaDeCompra() {
//     let tiempoActual = new Date(); //  llamando la clase 'Date' para ver la fecha y hora actual.
//     let fechaHoraFormateada = tiempoActual.toLocaleDateString('es-ES'); // utilizando el metodo para mostrar en español.
//     alert('Pago realizado el: ' + fechaHoraFormateada);
// }


