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


document.querySelectorAll('.title-bar button').forEach(button => {
  button.addEventListener('touchstart', function(e) {
    e.stopPropagation();
    e.preventDefault();
    this.click();
  }, { passive: false });
});

function makeDraggable(elementId) {
  const element = document.getElementById(elementId);
  let offsetX = 0, offsetY = 0, mouseX = 0, mouseY = 0;

  if (!element) return;

  const header = element.querySelector(".title-bar");
  if (!header) return;

  header.onmousedown = function (event) {
      event.preventDefault();
      mouseX = event.clientX;
      mouseY = event.clientY;
      document.onmousemove = dragElement;
      document.onmouseup = closeDragElement;
  };

  header.ontouchstart = function (event) {
      event.preventDefault();
      mouseX = event.touches[0].clientX;
      mouseY = event.touches[0].clientY;
      document.ontouchmove = dragElement;
      document.ontouchend = closeDragElement;
  };

  function dragElement(event) {
      event.preventDefault();
      if (event.type === 'mousemove') {
          offsetX = mouseX - event.clientX;
          offsetY = mouseY - event.clientY;
          mouseX = event.clientX;
          mouseY = event.clientY;
      } else if (event.type === 'touchmove') {
          offsetX = mouseX - event.touches[0].clientX;
          offsetY = mouseY - event.touches[0].clientY;
          mouseX = event.touches[0].clientX;
          mouseY = event.touches[0].clientY;
      }

      let newTop = element.offsetTop - offsetY;
      let newLeft = element.offsetLeft - offsetX;

      newTop = Math.max(0, Math.min(window.innerHeight - element.clientHeight, newTop));
      newLeft = Math.max(0, Math.min(window.innerWidth - element.clientWidth, newLeft));

      element.style.top = `${newTop}px`;
      element.style.left = `${newLeft}px`;
  }

  function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
      document.ontouchend = null;
      document.ontouchmove = null;
  }
}

makeDraggable("notepadWindow");
makeDraggable("notepadWindow1");
makeDraggable("musicPlayerWindow");
makeDraggable("alunosSite");
makeDraggable("pastaWindow");
makeDraggable("infoWindow");
makeDraggable("trashWindow");
makeDraggable("configWindow");

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
        document.body.style.backgroundImage = '';
        document.body.style.height = '';
        document.body.classList.remove('cursorwait'); 
        alternado = false;
    } else {
        document.body.classList.add('cursorwait'); 
        document.body.style.backgroundImage = `url('${wallpapers[currentWallpaperIndex]}')`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.height = '100vh';

        setTimeout(() => {
          document.body.classList.remove('cursorwait'); 
        }, 1000);

        currentWallpaperIndex = (currentWallpaperIndex + 1) % wallpapers.length;
        alternado = true;
    }
}

  

function abrirPasta() {
  const pastaWindow = document.getElementById('pastaWindow');
  pastaWindow.style.display = 'block';
  pastaWindow.style.left = '50px'; 
  pastaWindow.style.top = '50px'; 
}

function abrirNotepad() {
  const notepadWindow = document.getElementById('notepadWindow');
  notepadWindow.style.display = 'block';
  notepadWindow.style.visibility = 'visible';
}
function abrirLixeira() {
  document.getElementById('trashWindow').style.display = 'block';

}

function limparLixeira() {
  const sound = new Audio('./src/music/lixo (mp3cut.net).mp3');
  sound.play();
  const trashContent = document.getElementById('trashContent');
  trashContent.innerHTML = '<p>Lixeira vazia</p>';

}

// Funções para controle de música
const audioPlayer = document.getElementById('audioPlayer');
const progressBar = document.getElementById('progressBar');
const currentTimeDisplay = document.getElementById('currentTime');

function playMusic() {
  audioPlayer.play();
}

function pauseMusic() {
  audioPlayer.pause();
}

function stopMusic() {
  audioPlayer.pause();
  audioPlayer.currentTime = 0;
}

audioPlayer.addEventListener('timeupdate', () => {
  const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.value = progress;
  updateCurrentTime();
});

function seekMusic(value) {
  const seekTime = (value / 100) * audioPlayer.duration;
  audioPlayer.currentTime = seekTime;
}

// Atualiza a exibição do tempo
function updateCurrentTime() {
  const currentMinutes = Math.floor(audioPlayer.currentTime / 60);
  const currentSeconds = Math.floor(audioPlayer.currentTime % 60);
  const durationMinutes = Math.floor(audioPlayer.duration / 60);
  const durationSeconds = Math.floor(audioPlayer.duration % 60);

  currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')} / ${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;
}



// Controle de volume
function setVolume(value) {
  audioPlayer.volume = value;
}

function abrirNotepad1() {
  document.getElementById('notepadWindow1').style.display = 'block';
}

function minimizar(id) {
  const janela = document.getElementById(id);
  janela.style.display = 'none';
}

function fechar(id) {
  const janela = document.getElementById(id);
  janela.style.display = 'none';  
}

function mostrarInfo() {
  const navegador = navigator.userAgent;

  const sistemaOperacional = navigator.platform;

  const infoWindow = document.getElementById('infoWindow');
  infoWindow.style.display = 'block';

  document.getElementById('navegador').innerText = navegador;
  document.getElementById('sistemaOperacional').innerText = sistemaOperacional;

  if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          document.getElementById('localizacao').innerText = latitude + ", " + longitude;
      }, function(error) {
          document.getElementById('localizacao').innerText = "Não disponível";
      });
  } else {
      document.getElementById('localizacao').innerText = "Não disponível";
  }
}

function fecharInfo() {
  const infoWindow = document.getElementById('infoWindow');
  infoWindow.style.display = 'none';
}


function desligarSistema() {
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'black';
  overlay.style.color = 'white';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.fontSize = '2em';
  overlay.style.zIndex = 10000;

  const img = document.createElement('img');
  img.src = './src/img/desligando.png';
  img.alt = 'Ícone de Desligamento';
  img.style.width = '50px';
  img.style.height = '50px';
  img.style.marginRight = '20px';

  const text = document.createElement('span');
  text.innerText = 'Desligando...';

  overlay.appendChild(img);
  overlay.appendChild(text);

  document.body.appendChild(overlay);

  const audio = new Audio('./src/music/Iframe Som de desligamento do Windows 98 [xNhwSxgGDBg] (mp3cut.net) (1).mp3'); // Caminho para o seu áudio
  audio.play();

  setTimeout(() => {
    location.reload();
  }, 3000);
}

document.querySelector('.start-button a[href="#"]').addEventListener('click', (e) => {
  if (e.target.textContent.includes('Desligar')) {
    e.preventDefault();
    desligarSistema();
  }
});



function mostrarConfig() {
  document.getElementById('configWindow').style.display = 'block';
}

function fecharConfig() {
  document.getElementById('configWindow').style.display = 'none';
}

function aplicarConfig() {
  const titleBarColor = document.getElementById('title-bar-color').value;
  const windowColor = document.getElementById('window-color').value;
  const fontColor = document.getElementById('font-color').value;
  const fontFamily = document.getElementById('font-family').value;
  const fontSize = document.getElementById('font-size').value;

  document.documentElement.style.setProperty('--title-bar-color', titleBarColor);
  document.documentElement.style.setProperty('--window-color', windowColor);
  document.documentElement.style.setProperty('--font-color', fontColor);
  document.documentElement.style.setProperty('--font-family', fontFamily);
  document.documentElement.style.setProperty('--font-size', fontSize); // Aplica o tamanho da fonte

  document.body.style.fontSize = fontSize; // Pode ser ajustado para afetar partes específicas

  fecharConfig();
}
