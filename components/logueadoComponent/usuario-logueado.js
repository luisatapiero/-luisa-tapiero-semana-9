class UsuarioLogueadoComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));
        if (usuario) {
            this.shadowRoot.querySelector('#nombreUsuario').textContent = usuario.nombre;
        }

        this.shadowRoot.querySelector('#cerrarSesion').addEventListener('click', () => {
            localStorage.removeItem('usuarioLogueado');

            const cambioPantallaEvent = new CustomEvent('cambiarPantalla', {
                detail: {
                    pantalla: 'crear-cuenta'
                }
            });
            document.dispatchEvent(cambioPantallaEvent);
        });
    }

    static get observedAttributes() {
        return ['nombre'];
    }

    attributeChangedCallback(propName, oldValue, newValue) {
        this[propName] = newValue;
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="/components/logueadoComponent/style.css">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" id="smile"><path fill="#2FFF52" d="M14.36,14.23a3.76,3.76,0,0,1-4.72,0,1,1,0,0,0-1.28,1.54,5.68,5.68,0,0,0,7.28,0,1,1,0,1,0-1.28-1.54ZM9,11a1,1,0,1,0-1-1A1,1,0,0,0,9,11Zm6-2a1,1,0,1,0,1,1A1,1,0,0,0,15,9ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"></path></svg>
            <h2>¡Has iniciado sesión satisfactoriamente, <span id="nombreUsuario"></span>!</h2>
            <button id="cerrarSesion">Cerrar sesión</button>
          </div>
        `;
    }
}

customElements.define('usuario-logueado', UsuarioLogueadoComponent);
export default UsuarioLogueadoComponent;
