
class Usuario {
    constructor(nombreUsuario, apellidoUsuario, edadUsuario ){
        this.nombreUsuario = nombreUsuario;
        this.apellidoUsuario = apellidoUsuario;
        this.edadUsuario = edadUsuario;
    }
    // metodo de la clase para validar el login
    validar() {
        const nombreUsuario = document.getElementById('nombre').value;
        const apellidoUsuario = document.getElementById('apellido').value;
        const edadUsuario = parseInt(document.getElementById('edad').value);

        const regexNombreApellido = /^[a-zA-Z]+$/;

        if (typeof nombreUsuario === 'string' && typeof apellidoUsuario === 'string' && !isNaN(edadUsuario) && edadUsuario >= 18) {
            if (regexNombreApellido.test(nombreUsuario) && regexNombreApellido.test(apellidoUsuario)) {
                alert("Bienvenido " + nombreUsuario + " puedes ingresar a tu cuenta :D");
                return [nombreUsuario, apellidoUsuario, edadUsuario]; // Devuelve un array con los datos del usuario
            } else {
                alert('Ingrese un nombre y un apellido válidos');
            }
        } else if (isNaN(edadUsuario)) {
            alert('Ingrese una edad válida');
        } else {
            const añosFaltantes = 18 - edadUsuario;
            alert('Te faltan ' + añosFaltantes + ' años para registrarte'); 
        }
        // Si la validación falla, devuelve un array vacío
        return [];
    }

}

let usuario = new Usuario();

let boton = document.getElementById('btn'); // convirtiendo una variable a un nodo.

boton.addEventListener('click', () => {
    let datosUsuario = usuario.validar();
    if (datosUsuario.length > 0) {
        console.log(datosUsuario);
        boton = boton.style.color = 'yellow'
    } else {
        console.log("La validación falló.");
    }
});






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


