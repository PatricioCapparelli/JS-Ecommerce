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
                `
            productss.append(content)
                
            
            })
            })
