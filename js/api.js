let productss = document.querySelector('#productss');
productss.className = ('apis-article')

fetch('https://fakestoreapi.com/products')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            
            data.map((item) => {
                const content = document.createElement('div');
                content.innerHTML = 
                `
                <h4>${item.title}</h4>
                <img src="${item.image}"></img>
                <p>$${item.price}</p>
                `
            productss.append(content)
                
            
            })
            })



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
