// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// Event Listeners
eventListener();

function eventListener(){
    formulario.addEventListener('submit', agregarTweet);

    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets')) || [];
        crearHTML();
    })
}

// Funciones
function agregarTweet(e){
    e.preventDefault();
    // El usuario escribe
    const tweet = document.querySelector('#tweet').value;

    // Validación
    if(tweet === ''){
        mostrarError('Un mensaje no puede ir vacio');
        return;
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    // Añadir tweets
    tweets = [...tweets, tweetObj];

    // Crear HTML
    crearHTML();

    // Reiniciar el formulario
    formulario.reset();

}

// Mostrar mensaje de error}
function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insertarlo en el contenedor
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

function crearHTML(){

    limpiarHTLM();

    if(tweets.length > 0){
        tweets.forEach( tweet => {
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }


            const li = document.createElement('li');

            li.innerText = tweet.tweet;
            li.appendChild(btnEliminar);
            listaTweets.appendChild(li); 
        })
    }

    sincronizarStorage();   
}

// Agrega los Tweets actuales al localstorage
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function borrarTweet(id){
    tweets = tweets.filter( tweet => tweet.id !== id);
    crearHTML();
}

// Limpiar HTML
function limpiarHTLM(){
    while( listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}