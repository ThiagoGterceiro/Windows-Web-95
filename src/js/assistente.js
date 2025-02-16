let loopAtivo = true;

function mudarGifMusica() {
    const assistantImg = document.getElementById('assistant-img');
    assistantImg.src = './src/gif/clippy-white-13.gif';
    loopAtivo = false; 
}

function restaurarGifOriginal() {
    const assistantImg = document.getElementById('assistant-img');
    assistantImg.src = './src/gif/clippy-white-12.gif';
    loopAtivo = true; 
}

function abrirPlayerMusica() {
    const musicWindow = document.getElementById('musicPlayerWindow');
    musicWindow.style.display = 'block';
    musicWindow.style.visibility = 'visible';
    mudarGifMusica();
}

function fecharPlayerMusica() {
    const musicPlayerWindow = document.getElementById('musicPlayerWindow');
    musicPlayerWindow.style.display = 'none';
    restaurarGifOriginal();
}

const gifs = [
    './src/gif/clippy-white-12.gif',
    './src/gif/clippy-white-3.gif',
    './src/gif/clippy-white-6.gif',
    './src/gif/clippy-white-20.gif',
    './src/gif/clippy-white-21.gif',
    './src/gif/clippy-white-23.gif',
    './src/gif/clippy-white-19.gif',

];

function loopGifsAleatorios() {
    if (loopAtivo) {
        const assistantImg = document.getElementById('assistant-img');
        const gifAleatorio = gifs[Math.floor(Math.random() * gifs.length)];
        assistantImg.src = gifAleatorio;
    }
}

const messages = [
    "Olá! Posso te ajudar com algo?",
    "Esse Site é feito para simular o windows 98 e mostrar sites de outros alunos",
    "Sabia que o HTML foi criado em 1991?",
    "Você sabia que eu sou inspirado no Clippy do Windows 98?",
    "A pessoa não-binarie que criou esse site é dodoí",
    "Quer uma dica? Use sempre comentários no seu código!",
    "Você sabia que a Thay é a mente criativa por trás disso?",
];

let currentMessage = 0;
let textInterval;
let mensagensAtivas = true;

function iniciarMensagens() {
    textInterval = setInterval(() => {
        currentMessage = (currentMessage + 1) % messages.length;
        document.getElementById('speech-text').textContent = messages[currentMessage];
    }, 5000);
}

document.getElementById('assistant').addEventListener('click', () => {
    const speech = document.getElementById('speech');
    speech.style.display = 'block';
    if (mensagensAtivas) {
        clearInterval(textInterval);
        mensagensAtivas = false;
    } else {
        iniciarMensagens();
        mensagensAtivas = true;
    }
});

document.getElementById('speech').addEventListener('click', () => {
    currentMessage = (currentMessage + 1) % messages.length;
    document.getElementById('speech-text').textContent = messages[currentMessage];
});

document.addEventListener('click', (event) => {
    if (!document.getElementById('assistant').contains(event.target) && !document.getElementById('speech').contains(event.target)) {
        document.getElementById('speech').style.display = 'none';
    }
});

setInterval(loopGifsAleatorios, 4000);
iniciarMensagens();

let assistenteVisivel = true;

function alternarAssistente() {
  const assistant = document.getElementById('assistant');
  if (assistenteVisivel) {
    assistant.style.display = 'none';
  } else {
    assistant.style.display = 'block';
  }
  assistenteVisivel = !assistenteVisivel;
}
