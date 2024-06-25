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



const productos = [
    {
        imagen: "./assets/images/compun1.webp",
        precio: "US$380",
        nombre: "Notebook Exo Smart T38 Intel N4020 4gb Ssd128gb Windows 11 Color Gris"
    },
    {
        imagen: "./assets/images/ledn1.webp",
        precio: "US$330",
        nombre: "Tv Smart Led Philips 32 Hd 32phd6918/77 Google Tv"
    },
    {
        imagen: "./assets/images/celun1.webp",
        precio: "US$400",
        nombre: "Xiaomi Redmi 10c Dual Sim 128gb 4gb Ram Ocean Blue"
    },
    {
        imagen: "./assets/images/zapan1.webp",
        precio: "US$199",
        nombre: "Zapatillas Jaguar Oficial Deportiva Art. #9339 39al45"
    },
    {
        imagen: "./assets/images/jbl.webp",
        precio: "US$90",
        nombre: "Parlante Jbl Flip 6 Portatil Bluetooth Color Negro"
    },
    {
        imagen: "./assets/images/pcn1.webp",
        precio: "US$530",
        nombre: "Pc Armada Gamer Amd Ryzen 5 4600g Ram 16gb Radeon Vega Hdmi"
    },
    {
        imagen: "./assets/images/taladron1.webp",
        precio: "US$180",
        nombre: "Taladro Atornillador Percutor + 2 Baterias Gp By Lusqtoff"
    },
    {
        imagen: "./assets/images/monitorn1.webp",
        precio: "US$220",
        nombre: "Monitor Gamer 23.8 Aoc G2490vx 144hz Free Sync Display Port Color Negro/Rojo"
    }
];

// Variable para mantener los productos en el carrito con su cantidad
let productosEnCarrito = [];

function agregarAlCarrito(producto) {
    // Verificar si el producto ya está en el carrito
    const productoExistente = productosEnCarrito.find(item => item.producto.nombre === producto.nombre);

    if (productoExistente) {
        // Si el producto ya está en el carrito, incrementar la cantidad
        productoExistente.cantidad++;
    } else {
        // Si el producto no está en el carrito, agregarlo con cantidad 1
        productosEnCarrito.push({
            producto: producto,
            cantidad: 1
        });
    }

    localStorage.setItem('productosEnCarrito', JSON.stringify(productosEnCarrito));
    
    // Llamar a la función para actualizar la interfaz del carrito
    actualizarCarrito();
}

function cargarCarritoDesdeLocalStorage() {
    const carritoEnLocalStorage = localStorage.getItem('productosEnCarrito');
    if (carritoEnLocalStorage) {
        productosEnCarrito = JSON.parse(carritoEnLocalStorage);
        actualizarCarrito();
    }
}

function actualizarCarrito() {
    const carrito = document.getElementById('carrito');
    const totalElement = document.getElementById('total');
    const botonComprar = document.getElementById('botonComprar');

    // Variable para verificar si hay productos en el carrito
    let hayProductosEnCarrito = false;

    // Recorrer el array productosEnCarrito y agregar o actualizar cada producto en el carrito
    productosEnCarrito.forEach(item => {
        const producto = item.producto;
        const cantidad = item.cantidad;

        // Verificar si ya existe el elemento en el carrito
        let productoExistente = carrito.querySelector(`[data-nombre="${producto.nombre}"]`);

        if (productoExistente) {
            // Actualizar la cantidad del producto existente
            const cantidadElement = productoExistente.querySelector('.cantidad');
            cantidadElement.textContent = `(${cantidad})`;
        } else {
            // Crear elemento para el nuevo producto en el carrito
            const productoCarrito = document.createElement('div');
            productoCarrito.classList.add('article__producto--carrito');
            productoCarrito.setAttribute('data-nombre', producto.nombre);

            // Crear el contenido HTML del producto en el carrito
            const contenidoHTML = `
                <div class="carrito__contenido">
                    <p>${reducirTexto(producto.nombre, 20)} <span class="cantidad">(${cantidad})</span></p>
                    <img class="img__producto" src="${producto.imagen}" alt="imagen del producto">
                </div>
                <div class="carrito__contenido">
                    <span>${producto.precio}</span>
                    <button class="article__btn">Quitar</button>
                </div>
            `;

            // Establecer el contenido HTML creado dentro del div productoCarrito
            productoCarrito.innerHTML = contenidoHTML;

            // Agregar evento para eliminar el producto del carrito
            const botonEliminar = productoCarrito.querySelector('.article__btn');
            botonEliminar.addEventListener('click', () => {
                // Encontrar el índice del producto en el array productosEnCarrito
                const index = productosEnCarrito.findIndex(item => item.producto.nombre === producto.nombre);

                // Reducir la cantidad del producto en el carrito
                productosEnCarrito[index].cantidad--;

                // Si la cantidad llega a cero, eliminar completamente el producto del carrito
                if (productosEnCarrito[index].cantidad === 0) {
                    carrito.removeChild(productoCarrito); // Eliminar el elemento del DOM
                    productosEnCarrito.splice(index, 1); // Eliminar el producto del array productosEnCarrito
                }

                localStorage.setItem('productosEnCarrito', JSON.stringify(productosEnCarrito));

                // Llamar a la función para actualizar la interfaz del carrito
                actualizarCarrito();
            });

            // Agregar producto al carrito
            carrito.appendChild(productoCarrito);
        }

        // Actualizar la bandera si hay productos en el carrito
        hayProductosEnCarrito = true;
    });

    // Mostrar el total siempre
    calcularTotal();

    // Mostrar siempre el botón de comprar si hay productos en el carrito
    botonComprar.style.display = hayProductosEnCarrito ? 'flex' : 'none';

    // Función para calcular el total de los precios y mostrarlo
    function calcularTotal() {
        const total = productosEnCarrito.reduce((accumulator, item) => {
            const precioNumerico = parseFloat(item.producto.precio.replace('US$', '').replace(',', ''));
            return accumulator + (precioNumerico * item.cantidad);
        }, 0);
        totalElement.textContent = `Total: US$${total.toFixed(2)}`;
    }
}

// Función para reducir el texto si es necesario
function reducirTexto(texto, longitudMaxima) {
    if (texto.length > longitudMaxima) {
        return texto.substring(0, longitudMaxima) + '...';
    }
    return texto;
}

// Función para agregar los productos al cargar la página
function agregarProductos() {
    const contenedorProductos = document.getElementById('productos');

    productos.forEach(producto => {
        // Crear elemento article
        const articulo = document.createElement('article');
        articulo.classList.add('card-container-min');

        // Agregar clases adicionales según el producto (opcional)
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
        imagen.alt = "imagen del producto";

        const precio = document.createElement('h2');
        precio.textContent = producto.precio;

        const nombre = document.createElement('p');
        nombre.textContent = producto.nombre;

        const enlace = document.createElement('a');
        enlace.href = "#carrito";
        enlace.textContent = "🛒";
        enlace.addEventListener('click', () => agregarAlCarrito(producto));

        // Agregar elementos al artículo
        articulo.appendChild(imagen);
        articulo.appendChild(precio);
        articulo.appendChild(nombre);
        articulo.appendChild(enlace);

        // Agregar articulo al contenedor de productos
        contenedorProductos.appendChild(articulo);
    });

    // Llamar a la función para actualizar el carrito al cargar la página
    actualizarCarrito();
    cargarCarritoDesdeLocalStorage();
}

// Llamar a la función para agregar los productos al cargar la página
agregarProductos();


