
const cleanShop = (btn) => {

    btn.addEventListener('click', () => {
    let comprasGuardadas = localStorage.getItem('comprasGuardadas');
    let comprasDeOfertas = localStorage.getItem('comprasDeOfertas');
    let btnLimpiarOfertas = document.getElementById('btnLimpiarCarro');
    const slider = document.getElementById('slider');

    if (comprasGuardadas) {
        localStorage.removeItem('comprasGuardadas');
        console.log('Se han eliminado las compras guardadas.');
        comprasGuardadasContainer.innerHTML = ''
        slider.style.display = 'none';

    }   else if(comprasDeOfertas){
            localStorage.removeItem('comprasDeOfertas');
            console.log('Se han eliminado las compras guardadas!.');
            comprasGuardadasContainer.innerHTML = ''
            slider.style.display = 'none';
    }else {
        Toastify({
            text: "No hiciste ninguna compra, o limpiaste las anteriores",
            style: {
                background: 'yellow',
                color: 'black'
            },
            position: 'left',
            duration: 3000
        }).showToast();
        }
    });
}

export default cleanShop;