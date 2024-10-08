// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    // Cuando agregas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];

        limpiarHTML();
    })

    // Mostrar del Local Storage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

        carritoHTML();
    })
}

// Funciones
function agregarCurso(e) {
    e.preventDefault();

    if( e.target.classList.contains('agregar-carrito') ) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

// Eliminar un curso del carrito con la X
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        // Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
        carritoHTML(); // Iterar sobre el carrito y arreglar su html
    }
}

// Leer el contenido del HTML y extraer info del curso
function leerDatosCurso(curso) {

    // Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso. querySelector( 'h4'). textContent,
        precio: curso.querySelector('.precio span') .textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    if(existe){
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            } else{
                return curso;
            }
        });
        articulosCarrito = [...cursos]
    } else{
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    // arreglar elementos al arreglo del carrito
    carritoHTML();

    // Agregar al local storage
    sincronizarCarrito();
}

function sincronizarCarrito(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}


// Muestra el carrito en el html
function carritoHTML(){

    // Limpiar el HTML
    limpiarHTML();

    // Recorrer el carrito y generar el HTML
    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>  
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>  
            <td>
                ${cantidad}
            </td>  
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>  
        `;

        // Agregar el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

// Eliminar la repetición de los cursos del tbody
function limpiarHTML(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}