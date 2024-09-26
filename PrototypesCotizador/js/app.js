// Constructores
function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

// Realizar la cotización con los datos
Seguro.prototype.cotizarSeguro = function() {
    let cantidad;
    const base = 2000;
    /*
        AMERICANO 1.15
        ASIÁTICO 1.05
        EUROPEO 1.35
    */

    switch(this.marca){
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
        default:
            break;
    }

    // Leer año y por año reducir en 3%
    const diferencia = new Date().getFullYear() - this.year;

    cantidad -= ((diferencia * 3) * cantidad) / 100;

    /*
        Si el seguro es básico se multiplica por un 30% más
        Si el seguro es completo se multiplica por un 50% más
    */

    if(this.tipo === 'basico'){
        cantidad *= 1.30;
    } else {
        cantidad *= 1.50;
    }

    return cantidad;
     
}

function UI(){}

// Lena las opciones de los años
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
    min = max -20;

    const selectYear = document.querySelector('#year');

    for(let i = max; i > min; i--){
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

//Mostrar alertas en pantalla
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
     const div = document.createElement('div');

     if(tipo === 'error'){
        div.classList.add('error');
     } else{
        div.classList.add('correcto');
     }

     div.classList.add('mensaje', 'mt-10');
     div.textContent = mensaje;

     const formulario = document.querySelector('#cotizar-seguro');
     formulario.insertBefore(div, document.querySelector('#resultado'));

     setTimeout(() => {
        div.remove();
     }, 3000);
}

UI.prototype.mostrarResultado = (seguro, total) => {

    const { marca, year, tipo} = seguro;
    // Crear una descripción legible para la marca
    let textoMarca;
    switch (marca) {
        case '1':
            textoMarca = 'Americano';
            break;
        case '2':
            textoMarca = 'Asiático';
            break;
        case '3':
            textoMarca = 'Europeo';
            break;
        default:
            textoMarca = 'Desconocido';
    }

    // Crear div para mostrar el resultado
    const div = document.createElement('div');
    div.classList.add('mt-10');

    // Mostrar el resumen con formato claro
    div.innerHTML = `
        <p class="header">Tu resumen</p>
        <p class="font-bold">Marca: <span class="font-normal">${textoMarca}</span></p>
        <p class="font-bold">Año: <span class="font-normal">${year}</span></p>
        <p class="font-bold">Tipo de seguro: <span class="font-normal">${tipo.charAt(0).toUpperCase() + tipo.slice(1)}</span></p>
        <p class="font-bold">Total: <span class="font-normal">$${total.toFixed(2)}</span></p>
    `;
    const resultadoDiv = document.querySelector('#resultado');

    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout(() => {
        spinner.style.display = 'none';
        resultadoDiv.appendChild(div);
     }, 3000);

}

// Instanciar UI
const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    ui.llenarOpciones();
})

eventListeners();
function eventListeners(){
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e){
    e.preventDefault();

    //Leer marca seleccionada
    const marca = document.querySelector('#marca').value;
    const year = document.querySelector('#year').value;
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if(marca === '' || year === '' || tipo === ''){
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    } 

    ui.mostrarMensaje('Cotizando', 'exito');

    // Ocultar cotizaciones previas
    const resultados = document.querySelector('#resultado div');
    if(resultados != null) {
        resultados.remove();
    }

    // Instancias el seguro
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();

    // Utilizar el prototype que va a cotizar
    ui.mostrarResultado(seguro, total);

}