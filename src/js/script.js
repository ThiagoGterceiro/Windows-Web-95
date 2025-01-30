//EVITAR MEXER 
function fechar(id) {
    const janela = document.getElementById(id);
    janela.style.display = 'none';

}

function minimizar(id) {
    document.getElementById(id).style.visibility = 'hidden';
}

function restaurar(id) {
    const janela = document.getElementById(id);
    janela.style.display = 'block';
    janela.style.visibility = 'visible';

    const btn = document.getElementById(`btn-${id}`);
    if (btn) btn.remove();
}

// Relógio da Hotbar
function updateClock() {
    const clock = document.getElementById("clock");
    const now = new Date();
    clock.textContent = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}
setInterval(updateClock, 1000);
updateClock();

// Arrastar janelas EVITAR MEXER
let isDragging = false;
let offsetX = 0;
let offsetY = 0;

const titleBar = document.querySelector('.title-bar');
const windowElement = document.querySelector('.window');

function startDrag(e) {
    isDragging = true;

    offsetX = e.clientX ? e.clientX - windowElement.getBoundingClientRect().left : e.touches[0].clientX - windowElement.getBoundingClientRect().left;
    offsetY = e.clientY ? e.clientY - windowElement.getBoundingClientRect().top : e.touches[0].clientY - windowElement.getBoundingClientRect().top;
    titleBar.style.cursor = '../img/mouse/hmove.cur';
}

// a função com responsividade arrastar a janelas
function dragWindow(e) {
    if (isDragging) {
        const left = (e.clientX ? e.clientX : e.touches[0].clientX) - offsetX;
        const top = (e.clientY ? e.clientY : e.touches[0].clientY) - offsetY;

        // Limita o movimento para que a janela não saia da tela
        windowElement.style.left = Math.max(0, Math.min(left, window.innerWidth - windowElement.offsetWidth)) + 'px';
        windowElement.style.top = Math.max(0, Math.min(top, window.innerHeight - windowElement.offsetHeight)) + 'px';
    }
}

function stopDrag() {
    isDragging = false;
    titleBar.style.cursor = '../img/mouse/hmove.cur';
}

titleBar.addEventListener('mousedown', startDrag);
document.addEventListener('mousemove', dragWindow);
document.addEventListener('mouseup', stopDrag);

titleBar.addEventListener('touchstart', startDrag);
document.addEventListener('touchmove', dragWindow);
document.addEventListener('touchend', stopDrag);


// DROPDOWNS soq pracima

document.querySelector('.start-button').addEventListener('click', function(event) {
    event.stopPropagation();
  
    this.classList.toggle('active');
  });
  
  document.addEventListener('click', function(event) {
    if (!event.target.closest('.start-button')) {
      document.querySelector('.start-button').classList.remove('active');
    }
  });
  
  // wallpaper - ja responsivo
  let alternado = false;
  let wallpapers = [
    './src/img/wallpaper95.png',
    './src/img/monkerynirvana.jpg',
    './src/img/wallpaper_paper_95.png',
    './src/img/dog_win.png'
  ];
  let currentWallpaperIndex = 0;  
  
  function alternarWallpaper() {
    if (alternado) {
      document.body.style.backgroundColor = '#008080';  
      document.body.style.backgroundImage = "";  
      document.body.style.height = "";  
      alternado = false;
    } else {

      document.body.style.backgroundImage = `url('${wallpapers[currentWallpaperIndex]}')`;
      document.body.style.backgroundSize = "cover";  
      document.body.style.backgroundPosition = "center";  
      document.body.style.backgroundRepeat = "no-repeat";  
      document.body.style.height = "100vh";  
  
      currentWallpaperIndex = (currentWallpaperIndex + 1) % wallpapers.length;
      
      alternado = true;
    }
  }
  
