let productss = document.querySelector('#productss');
productss.className = 'apis-article';

fetch('https://fakestoreapi.com/products')
    .then((res) => res.json())
    .then((data) => {
        console.log(data);

        data.forEach((item) => {
            const content = document.createElement('div');
            content.innerHTML =
                `
                <h4>${item.title}</h4>
                <img src="${item.image}"></img>
                <p>$${item.price}</p>
                <button class="carrito" data-id="${item.id}">
                    🛒 Agregar al carrito
                </button>
                `;
            productss.append(content);
        });

        // Seleccionar todos los botones de "Agregar al carrito"
        const botonesCarrito = document.querySelectorAll('.carrito');
        botonesCarrito.forEach((boton) => {
            boton.addEventListener('click', (event) => {
                const productId = event.target.getAttribute('data-id'); // Obtener el ID del producto del botón clickeado
                const productoSeleccionado = data.find(item => item.id === parseInt(productId)); // Encontrar el producto en base a su ID

                agregarAlCarritoLocalS(productoSeleccionado); // Llamar a la función con el producto seleccionado
            });
        });

        function agregarAlCarritoLocalS(producto) {
            let productosEnCarritoOfertas = JSON.parse(localStorage.getItem('productosEnCarritoNuevo')) || [];

            // Verificar si el producto ya está en el carrito
            const productoExistente = productosEnCarritoOfertas.find(item => item.id === producto.id);

            if (productoExistente) {
                // Si el producto ya está en el carrito, incrementar la cantidad
                productoExistente.cantidad++;
            } else {
                // Si el producto no está en el carrito, agregarlo con cantidad 1
                productosEnCarritoOfertas.push({
                    id: producto.id,
                    producto: producto,
                    cantidad: 1
                });
            }

            localStorage.setItem('productosEnCarritoOfertas', JSON.stringify(productosEnCarritoOfertas));
        }
    });














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
