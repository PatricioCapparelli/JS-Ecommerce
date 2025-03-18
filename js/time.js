const timer = () => {
let setTime = document.getElementById('setTime');

function updateTime() {
    const time = document.createElement('div');
    const date = new Date();
    time.textContent = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    setTime.innerHTML = '';
    setTime.appendChild(time);
    setTimeout(updateTime, 1000);
}
updateTime();
};

export default timer;