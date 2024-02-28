const formulario = document.getElementsByTagName('form')[0];
const tarjetaPuntajeMaximo = document.getElementById('puntajeMaximo');
const textoTarjeta = tarjetaPuntajeMaximo.getElementsByClassName('card-text')[0];
const contenedor = document.getElementsByClassName('container')[0];
const botonResetearLocalStorage = document.getElementById('botonResetearLocalStorage');

function actualizarPuntajeMaximo() {
    const puntajes = JSON.parse(localStorage.getItem('puntajes')) || [];
    if (puntajes.length > 0) {
        puntajes.sort((a, b) => b.puntaje - a.puntaje);
        const puntajeMaximo = puntajes[0];
        textoTarjeta.textContent = `${puntajeMaximo.nombre} - ${puntajeMaximo.puntaje}`;
    } else {
        textoTarjeta.textContent = "No hay puntajes registrados aún";
    }
}

function mostrarAlertaNuevoRecord() {
    const alertaHTML = `
        <div class="alert alert-success mt-3" role="alert">
            Eres el nuevo GOAT!!
        </div>
    `;
    contenedor.innerHTML += alertaHTML;
}

function mostrarAlertaFallo() {
    const alertaFalloHTML = `
        <div id="alertaFallo" class="alert alert-danger mt-3" role="alert">
            Sigue intentando! Aun no superaste el record!
        </div>
    `;
    contenedor.innerHTML += alertaFalloHTML;
}

function eliminarAlertaFallo() {
    const alertaFallo = document.getElementById('alertaFallo');
    if (alertaFallo) {
        alertaFallo.remove();
    }
}

function resetearLocalStorage() {
    localStorage.removeItem('puntajes');
    actualizarPuntajeMaximo();
    textoTarjeta.textContent = "";
    eliminarAlertaFallo();
}

botonResetearLocalStorage.addEventListener('click', resetearLocalStorage);

formulario.addEventListener('submit', function(evento) {
    evento.preventDefault(); 
    
    const nombre = document.getElementById('nombre').value;
    const puntaje = parseInt(document.getElementById('puntaje').value);
    
    let puntajes = JSON.parse(localStorage.getItem('puntajes')) || [];
    
    if (puntajes.length > 0) {
        const puntajeMaximo = puntajes[0].puntaje;
        if (puntaje > puntajeMaximo) {
            puntajes = [{ nombre, puntaje }];
            localStorage.setItem('puntajes', JSON.stringify(puntajes));
            actualizarPuntajeMaximo();
            mostrarAlertaNuevoRecord();
        } else {
            mostrarAlertaFallo();
        }
    } else {
        puntajes.push({ nombre, puntaje });
        localStorage.setItem('puntajes', JSON.stringify(puntajes));
        actualizarPuntajeMaximo();
    }
});

actualizarPuntajeMaximo();
