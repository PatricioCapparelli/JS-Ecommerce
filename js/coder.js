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
    e.preventDefault(); 

    let nombreUsuario = document.getElementById('nombre').value.trim();
    let apellidoUsuario = document.getElementById('apellido').value.trim();

    // validacion
    if (usuarioRegistrado(nombreUsuario, apellidoUsuario)) {
        inf_container = document.createElement('div');
        inf_container.innerHTML = `
            <p>Error: El usuario con nombre ${nombreUsuario} y apellido ${apellidoUsuario} ya está registrado ✖</p>
        `;
        user.appendChild(inf_container);
        return;
    }

    let edadUsuario = document.getElementById('edad').value.trim();
    let contraseñaUsuario = document.getElementById('contraseña').value; 

    // instancia de usuario con los datos del formulario
    let usuario = new Usuario(nombreUsuario, apellidoUsuario, edadUsuario, contraseñaUsuario);

    let mensaje = usuario.validar();

    if (mensaje === true) {
        // guardar en localStorage
        guardarUsuarioLocalStorage(usuario);

        // limpiar contenido anterior del article
        user.innerHTML = '';

        // mensaje de bienvenida
        inf_container = document.createElement('div');
        inf_container.innerHTML = `
            <p>Bienvenido <span class="inf_container">${usuario.nombreUsuario}</span>, registro exitoso ✔</p>
        `;
        user.appendChild(inf_container);
        boton.style.color = 'yellow';
    } else {
        // mensaje de error
        inf_container = document.createElement('div');
        inf_container.innerHTML = `
            <p>Error: ${mensaje} ✖</p>
        `;
        user.appendChild(inf_container);
    }
}

// verificar si el usuario esta registrado
function usuarioRegistrado(nombreUsuario, apellidoUsuario) {
    let usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];

    // validacion
    return usuariosGuardados.some(usuario => usuario.nombreUsuario === nombreUsuario && usuario.apellidoUsuario === apellidoUsuario);
}

// guardar usuario en localStorage
function guardarUsuarioLocalStorage(usuario) {
    
    let usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];

    // agregar el nuevo usuario
    usuariosGuardados.push({
        nombreUsuario: usuario.nombreUsuario,
        apellidoUsuario: usuario.apellidoUsuario,
        edadUsuario: usuario.edadUsuario,
        
    });

    // guardar en localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));
}

form.addEventListener('submit', validarRegistro);

// limpiar 
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

// variable para mantener los productos en el carrito con su cantidad
let productosEnCarrito = [];

function agregarAlCarrito(producto) {
    // verificar si el producto ya esta en el carrito
    const productoExistente = productosEnCarrito.find(item => item.producto.nombre === producto.nombre);

    if (productoExistente) {
        // si el producto ya esta en el carrito incrementar la cantidad.
        productoExistente.cantidad++;
    } else {
        // si el producto no esta en el carrito, agregarlo con cantidad 1
        productosEnCarrito.push({
            producto: producto,
            cantidad: 1
        });
    }

    localStorage.setItem('productosEnCarrito', JSON.stringify(productosEnCarrito));
    
    actualizarCarrito();
}

function cargarCarritoDesdeLocalStorage() {
    const carritoEnLocalStorage = localStorage.getItem('productosEnCarrito');
    if (carritoEnLocalStorage) {
        productosEnCarrito = JSON.parse(carritoEnLocalStorage);
        actualizarCarrito();
    }
}

let botonComprar = document.getElementById('botonComprar');

function actualizarCarrito() {
    const carrito = document.getElementById('carrito');
    const totalElement = document.getElementById('total');
    
    // variable para verificar si hay productos en el carrito
    let hayProductosEnCarrito = false;

    // recorrer el array productosEnCarrito y agregar o actualizar cada producto en el carrito
    productosEnCarrito.forEach(item => {
        const producto = item.producto;
        const cantidad = item.cantidad;

        // verificar si ya existe el elemento en el carrito
        let productoExistente = carrito.querySelector(`[data-nombre="${producto.nombre}"]`);

        if (productoExistente) {
            // actualizar la cantidad del producto 
            const cantidadElement = productoExistente.querySelector('.cantidad');
            cantidadElement.textContent = `(${cantidad})`;
        } else {
            // crear elemento para el nuevo producto en el carrito
            const productoCarrito = document.createElement('div');
            productoCarrito.classList.add('article__producto--carrito');
            productoCarrito.setAttribute('data-nombre', producto.nombre);

            // contenido HTML del producto en el carrito
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

            // asignando el contenido 
            productoCarrito.innerHTML = contenidoHTML;

            // evento para eliminar el producto del carrito
            const botonEliminar = productoCarrito.querySelector('.article__btn');
            botonEliminar.addEventListener('click', () => {
                // encontrar el indice del producto en el array
                const index = productosEnCarrito.findIndex(item => item.producto.nombre === producto.nombre);

                // reducir la cantidad del producto en el carrito
                productosEnCarrito[index].cantidad--;

                // si la cantidad llega a cero, eliminar el producto del carrito
                if (productosEnCarrito[index].cantidad === 0) {
                    carrito.removeChild(productoCarrito); 
                    productosEnCarrito.splice(index, 1); // eliminar el producto del array
                }

                localStorage.setItem('productosEnCarrito', JSON.stringify(productosEnCarrito));

                
                actualizarCarrito();
            });

            // agregar producto al carrito
            carrito.appendChild(productoCarrito);
        }

        hayProductosEnCarrito = true;
    });

    calcularTotal();

    botonComprar.style.display = hayProductosEnCarrito ? 'flex' : 'none';

    // para calcular el total de los precios y mostrarlo
    function calcularTotal() {
        const total = productosEnCarrito.reduce((accumulator, item) => {
            const precioNumerico = parseFloat(item.producto.precio.replace('US$', '').replace(',', ''));
            return accumulator + (precioNumerico * item.cantidad);
        }, 0);
        totalElement.textContent = `Total: US$${total.toFixed(2)}`;
    }
}

// reducir el texto del carrito
function reducirTexto(texto, longitudMaxima) {
    if (texto.length > longitudMaxima) {
        return texto.substring(0, longitudMaxima) + '...';
    }
    return texto;
}

// funcion para agregar los productos al cargar la pagina
function agregarProductos() {
    const contenedorProductos = document.getElementById('productos');

    productos.forEach(producto => {
        
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

        // Creando elementos dentro de article
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

        articulo.appendChild(imagen);
        articulo.appendChild(precio);
        articulo.appendChild(nombre);
        articulo.appendChild(enlace);

        contenedorProductos.appendChild(articulo);
    });

    actualizarCarrito();
    cargarCarritoDesdeLocalStorage();
}

botonComprar.addEventListener('click', () => {
    
    let comprasGuardadas = JSON.parse(localStorage.getItem('comprasGuardadas')) || [];

    comprasGuardadas.push({
        productos: productosEnCarrito,
        fecha: new Date().toLocaleString()  
    });

    for (let i = 0; i < comprasGuardadas.length; i++) {
        let compra = comprasGuardadas[i];
        
        let productos = compra.productos;
        let fecha = compra.fecha;
    
        console.log(`Compra ${i + 1}:`);
        console.log('Productos:', productos);
        console.log('Fecha:', fecha);
        console.log('');
    }
    
    localStorage.setItem('comprasGuardadas', JSON.stringify(comprasGuardadas));

    localStorage.removeItem('productosEnCarrito');
    if (productosEnCarrito === false){
        actualizarCarrito();
    }

    const mensajePagoExitoso = document.getElementById('mensajePagoExitoso');
    mensajePagoExitoso.style.display = 'block';
    mensajePagoExitoso.style.padding = '8px';
    mensajePagoExitoso.style.fontSize = '1.4em';

    setTimeout(() => {
        mensajePagoExitoso.style.display = 'none';
    }, 4000); 
    
});

agregarProductos();



