import './crearCuentaComponent/crear-cuenta.js';
import './iniciarSesionComponent/inicio-sesion.js';
import './logueadoComponent/usuario-logueado.js';

const contenido = document.getElementById('contenido');

function cambiarPantalla(pantalla) {
    contenido.innerHTML = '';
    switch (pantalla) {
        case 'crear-cuenta':
            const crearCuenta = document.createElement('crear-cuenta');
            contenido.appendChild(crearCuenta);
            break;
        case 'inicio-sesion':
            const iniciarSesion = document.createElement('inicio-sesion');
            contenido.appendChild(iniciarSesion);
            break;
        case 'usuario-logueado':
            const usuarioLogueado = document.createElement('usuario-logueado');
            contenido.appendChild(usuarioLogueado);
            break;
        default:
            break;
    }
}

document.addEventListener('cambiarPantalla', (event) => {
    cambiarPantalla(event.detail.pantalla);
});


cambiarPantalla('crear-cuenta');
