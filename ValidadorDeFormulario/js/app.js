document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar Los elementos de La interfaz
    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    // Asignar eventos
    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);

    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function(e){
        e.preventDefault();
        resetFormulario();
    })

    function enviarEmail(e){
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');


        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

            resetFormulario();

            // Creamos alerta
            const alerta = document.createElement('P');
            alerta.classList.add('bg-green-500', 'text-white', 'p-2' ,'text-center', 'font-bold', 'rounded-lg')
            alerta.textContent = "Formulario enviado exitosamente"
    
            // Insertar el alerta al html
            formulario.appendChild(alerta);
            setTimeout(() => {
                alerta.remove();
            },5000);


        },3000);
    }

    function validar(e) {
        if(e.target.value.trim() === ''){
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta('El email ingresado es incorrecto', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        };

        limpiarAlerta(e.target.parentElement);

        // Asignar los valores
        email[e.target.name] = e.target.value.trim().toLowerCase();

        // Comprobar el objeto de email
        comprobarEmail();
    }

    function mostrarAlerta(mensaje, referencia) {
        // Comprobar si existe una alerta
        limpiarAlerta(referencia);

        const error = document.createElement('P');
        error.textContent = mensaje
        error.classList.add('bg-red-600', 'text-white', 'p-2' ,'text-center', 'font-bold')

        // Insertar el error al html
        referencia.appendChild(error);

    }

    function limpiarAlerta(referencia) {
        // Comprobar si existe una alerta
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta){
            alerta.remove();
        }
    }

    function validarEmail(email) {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const resultado = regex.test(email)
        return resultado;

    }

    function comprobarEmail(){
        if(Object.values(email).includes('')){
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;

        } 
            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled = false;
        
    }

    function resetFormulario(){
        // reiniciar el objeto
        email.email = '';
        asunto.asunto = '';
        mensaje.mensaje = '';
        formulario.reset();
        comprobarEmail();
    }

});
