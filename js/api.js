document.addEventListener('DOMContentLoaded', () => {
    const productss = document.getElementById('productss');
    const carritoLista = document.getElementById('carrito-lista');
    const totalElement = document.getElementById('total');
    const botonComprar = document.getElementById('botonComprar');
    let productosEnCarritoOfertas = [];

    // Obtener productos de la API
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            mostrarProductos(data);
        })
        .catch(error => console.error('Error al cargar productos:', error));

    // Función para mostrar productos en la página
    function mostrarProductos(productos) {
        productss.innerHTML = '';
        productos.forEach(item => {
            const content = document.createElement('div');
            content.innerHTML =
                `<h4>${item.title}</h4>
                <img src="${item.image}" class="img__producto">
                <p>$${item.price}</p>
                <button class="carrito" data-id="${item.id}">🛒 Agregar al carrito</button>`;
            productss.appendChild(content);

            // Event listener para agregar al carrito
            const botonAgregar = content.querySelector('.carrito');
            botonAgregar.addEventListener('click', () => {
                agregarAlCarrito(item);
            });
        });
    }

    // Función para agregar un producto al carrito
    function agregarAlCarrito(producto) {
        const productoExistente = productosEnCarritoOfertas.find(item => item.id === producto.id);

        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            productosEnCarritoOfertas.push({
                id: producto.id,
                producto: producto,
                cantidad: 1
            });
        }

        // Guardar en localStorage
        localStorage.setItem('productosEnCarritoOfertas', JSON.stringify(productosEnCarritoOfertas));

        // Actualizar el carrito
        actualizarCarrito();
    }

    // Función para actualizar el carrito en la interfaz
    function actualizarCarrito() {
        carritoLista.innerHTML = '';
        let total = 0;

        productosEnCarritoOfertas.forEach(item => {
            const producto = item.producto;
            const cantidad = item.cantidad;

            const productoCarrito = document.createElement('div');
            productoCarrito.classList.add('article__producto--carrito');
            productoCarrito.innerHTML =
                `<div>
                    <p>${producto.title} <span class="cantidad">(${cantidad})</span></p>
                    <img src="${producto.image}" id="imagen-prod">
                </div>
                <div>
                    <span>$${(producto.price * cantidad).toFixed(2)}</span>
                    <button class="article__btn">✖</button>`;
            
            // Event listener para eliminar del carrito
            const botonEliminar = productoCarrito.querySelector('.article__btn');
            botonEliminar.addEventListener('click', () => {
                eliminarDelCarrito(producto.id);
            });

            carritoLista.appendChild(productoCarrito);
            total += producto.price * cantidad;
        });

        totalElement.textContent = `Total: $${total.toFixed(2)}`;
        botonComprar.style.display = productosEnCarritoOfertas.length > 0 ? 'block' : 'none';
    }

    // Función para eliminar un producto del carrito
    function eliminarDelCarrito(productId) {
        productosEnCarritoOfertas = productosEnCarritoOfertas.filter(item => item.id !== productId);
        localStorage.setItem('productosEnCarritoOfertas', JSON.stringify(productosEnCarritoOfertas));
        actualizarCarrito();
    }

    // Cargar productos del localStorage al cargar la página
    function cargarProductosDelLocalStorage() {
        const productosGuardados = JSON.parse(localStorage.getItem('productosEnCarritoOfertas')) || [];
        productosEnCarritoOfertas = productosGuardados;
        actualizarCarrito();
    }

    // Llamada inicial para cargar productos del localStorage si existen
    cargarProductosDelLocalStorage();
});

    
// function actualizarCarrito() {
//     const carrito = document.getElementById('carrito');
//     const totalElement = document.getElementById('total');
//     carrito.innerHTML = ''; // limpiar el contenido del carrito antes de actualizar

//     let hayProductosEnCarrito = false;
//     let total = 0;

//     productosEnCarrito.forEach(item => {
//         const producto = item.producto;
//         const cantidad = item.cantidad;

//         // Crear elemento para cada producto en el carrito
//         const productoCarrito = document.createElement('div');
//         productoCarrito.classList.add('article__producto--carrito');
//         productoCarrito.setAttribute('data-nombre', producto.nombre);

//         // Contenido HTML del producto en el carrito
//         const contenidoHTML = `
//             <div class="carrito__contenido">
//                 <p>${reducirTexto(producto.nombre, 20)} <span class="cantidad">(${cantidad})</span></p>
//                 <img class="img__producto" src="${producto.imagen}" alt="imagen del producto">
//             </div>
//             <div class="carrito__contenido">
//                 <span>${producto.precio}</span>
//                 <button class="article__btn">✖</button>
//             </div>
//         `;
//         productoCarrito.innerHTML = contenidoHTML;

//         // Evento para eliminar el producto del carrito
//         const botonEliminar = productoCarrito.querySelector('.article__btn');
//         botonEliminar.addEventListener('click', () => {
//             const index = productosEnCarrito.findIndex(item => item.producto.nombre === producto.nombre);

//             productosEnCarrito[index].cantidad--;

//             if (productosEnCarrito[index].cantidad === 0) {
//                 productosEnCarrito.splice(index, 1);
//             }

//             localStorage.setItem('productosEnCarrito', JSON.stringify(productosEnCarrito));
//             actualizarCarrito();
//         });

//         carrito.appendChild(productoCarrito);
//         hayProductosEnCarrito = true;

//         // Calcular total
//         const precioNumerico = parseFloat(producto.precio.replace('US$', '').replace(',', ''));
//         total += precioNumerico * cantidad;
//     });

//     totalElement.textContent = `Total: US$${total.toFixed(2)}`;
//     const botonComprar = document.getElementById('botonComprar');
//     botonComprar.style.display = hayProductosEnCarrito ? 'flex' : 'none';
// }

    











// JSON


// const BASE_IMAGE_URL = "../assets/images/"

// let arcJson = document.querySelector('#arcJson');

// fetch('../js/data.json')
//     .then((res) => {
//     if (!res.ok) {
//     throw new Error('Network response was not ok');
//     }
//     return res.json();
//     })
//     .then((data) => {
//     console.log(data);
//     data.forEach((item) => {
//         const content = document.createElement('div');
//         content.innerHTML = `
//         <h1>${item.nombre}</h1>
//         <h4>${item.precio}</h4>
//         <img src="${item.imagen}" alt="${item.nombre}">
//         `;
//         arcJson.appendChild(content);
//     });
//     })
//     .catch((error) => {
//     console.error('Error fetching data:', error);
//     arcJson.innerHTML = '<p>Error al cargar los datos</p>';
// });
