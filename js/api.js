document.addEventListener('DOMContentLoaded', () => {
    const productss = document.getElementById('productss');
    const carritoLista = document.getElementById('carrito-lista');
    const totalElement = document.getElementById('total-price');
    const botonComprar = document.getElementById('boton-comprar');
    let productosEnCarritoOfertas = [];

    // API
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            mostrarProductos(data);
        })
        .catch(error => console.error('Error al cargar productos:', error));

    // Mostrar productos en la pagina
    function mostrarProductos(productos) {
        productss.innerHTML = '';
        productos.forEach(item => {
            const content = document.createElement('div');
            content.innerHTML =
                `<h4>${item.title}</h4>
                <img src="${item.image}" class="img-carrito">
                <p>$${item.price}</p>
                <a href="#carrito-lista" class="carrito-btn" data-id="${item.id}">🛒</a>`;
            productss.appendChild(content);
            

            // Event listener para agregar al carrito
            const botonAgregar = content.querySelector('.carrito-btn');
            botonAgregar.addEventListener('click', () => {
                agregarAlCarrito(item);
                
            });
        });
    }

    // Agregar un producto al carrito
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

    function actualizarCarrito() {
        carritoLista.innerHTML = '';
        let total = 0;

        productosEnCarritoOfertas.forEach(item => {
            const producto = item.producto;
            const cantidad = item.cantidad;

            const productoCarrito = document.createElement('div');
            productoCarrito.classList.add('article-carrito-c');
            productoCarrito.innerHTML =
                `<div>
                    <p>${producto.title} <span class="cantidad">(${cantidad})</span></p>
                    <img src="${producto.image}" id="imagen-prod">
                </div>
                <div>
                    <span>$${(producto.price * cantidad).toFixed(2)}</span>
                    <button class="article__btn">✖</button>`;
            
            const botonEliminar = productoCarrito.querySelector('.article__btn');
            botonEliminar.addEventListener('click', () => {
                eliminarDelCarrito(producto.id);
            });

            carritoLista.appendChild(productoCarrito);
            total += producto.price * cantidad;
        });

        totalElement.textContent = `Total: $${total.toFixed(2)}`;
        botonComprar.style.display = productosEnCarritoOfertas.length > 0 ? 'block' : 'none';
        carritoLista.style.display = productosEnCarritoOfertas.length > 0 ? 'flex' : 'none';
        let titleCarrito = document.querySelector('.carrito-title');
        titleCarrito.style.display = productosEnCarritoOfertas.length > 0 ? 'none' : 'block';
    }

    function eliminarDelCarrito(productId) {
        productosEnCarritoOfertas = productosEnCarritoOfertas.filter(item => item.id !== productId);
        localStorage.setItem('productosEnCarritoOfertas', JSON.stringify(productosEnCarritoOfertas));
        actualizarCarrito();
    }
    
        function cargarProductosDelLocalStorage() {
//          Cargar productos actuales del carrito
            const productosGuardados = JSON.parse(localStorage.getItem('productosEnCarritoOfertas')) || [];
            productosEnCarritoOfertas = productosGuardados;
            
            const comprasAnteriores = JSON.parse(localStorage.getItem('comprasDeOfertas')) || [];
            
            actualizarCarrito();  
        }
        
    

    botonComprar.addEventListener('click', () => {
        const productosGuardados = JSON.parse(localStorage.getItem('productosEnCarritoOfertas')) || [];
        const comprasAnteriores = JSON.parse(localStorage.getItem('comprasDeOfertas')) || [];
        comprasAnteriores.push(productosGuardados);
        localStorage.setItem('comprasDeOfertas', JSON.stringify(comprasAnteriores));
        
        productosEnCarritoOfertas = [];
        localStorage.setItem('productosEnCarritoOfertas', JSON.stringify(productosEnCarritoOfertas));
        Swal.fire({
            title: 'LISTO!',
            text: 'Pago realizado con exito!',
            icon: 'success',
            confirmButtonText: 'Confirmar'
        })

        actualizarCarrito();
    });
    
    cargarProductosDelLocalStorage();
});

//          Mismo boton de pagina index, pero para mostrar compras de ofertas

document.addEventListener('DOMContentLoaded', function () {
    const botonVerComprass = document.getElementById('btnVerComprass');
    botonVerComprass.style.marginBottom = '15px'
    const comprasGuardadasContainer = document.getElementById('comprasGuardadasContainer');
    const swiffySlider = document.querySelector('.swiffy-slider');
    swiffySlider.style.display = 'none';

    botonVerComprass.addEventListener('click', function () {
        const comprasDeOfertas = JSON.parse(localStorage.getItem('comprasDeOfertas')) || [];


        // Verificar si hay compras guardadas
        if (comprasDeOfertas.length === 0) {
            Swal.fire({
                title: 'VACIO!',
                text: 'No hiciste ninguna compra!',
                icon: 'info',
                confirmButtonText: 'Confirmar'
            });
            return;
        }

        let contenidoHTML = '';

        
        const productosCantidad = {};

        comprasDeOfertas.forEach(compra => {
            compra.forEach(item => { 
                const idProducto = item.id;
                if (productosCantidad[idProducto]) {
                    productosCantidad[idProducto].cantidad++;
                } else {
                    productosCantidad[idProducto] = {
                        id: idProducto,
                        producto: item.producto,
                        cantidad: 1
                    };
                }
            });
        });

        // Construir el HTML 
        for (const key in productosCantidad) {
            if (productosCantidad.hasOwnProperty(key)) {
                const producto = productosCantidad[key].producto;
                const cantidad = productosCantidad[key].cantidad;
                contenidoHTML += `
                    <li class="slider-it">
                        <div style="display:flex; flex-direction:row; gap:10px>
                            <div style="display:flex; flex-direction:column">
                                <h3 style="color: white;">${producto.title}</h3>
                                <div style="display:flex; flex-direction:column;">
                                <p style="color: yellow;">Cantidad: ${cantidad}</p>
                                <p style="color: yellow;">Precio: $${(producto.price * cantidad).toFixed(2)}</p>
                                </div>
                            <img src="${producto.image}" id="imagen-prod"></img>
                        </div>
                    </li>
                `;
            }   
        }

        // Insertar el HTML en el contenedor del carrusel
        comprasGuardadasContainer.innerHTML = contenidoHTML;

        // Mostrar el carrusel solo si hay productos
        if (comprasDeOfertas.length > 0) {
            swiffySlider.style.display = 'block';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const titleOf = document.querySelector('.hero__oferts-title');

    const tituloOferta = titleOf.innerText;

    function efectoMaquinaEscribir(elemento, textoOriginal, velocidad) {
        let indice = 0;
        const intervalo = setInterval(function() {
            indice++;
            elemento.innerText = textoOriginal.slice(0, indice);
            if (indice >= textoOriginal.length) {
                clearInterval(intervalo);
            }
        }, velocidad);
    }

    efectoMaquinaEscribir(titleOf, tituloOferta, 100);
}); 
