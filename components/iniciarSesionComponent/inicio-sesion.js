class InicioSesionComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.shadowRoot.querySelector('form').addEventListener('submit', (event) => {
            event.preventDefault();
            const correo = this.shadowRoot.getElementById('correo').value;
            const contrasena = this.shadowRoot.getElementById('contrasena').value;

            const listaUsuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            const usuario = listaUsuarios.find((user) => user.correo === correo && user.contrasena === contrasena);
            if (usuario) {
                localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));

                const cambioPantallaEvent = new CustomEvent('cambiarPantalla', {
                    detail: {
                        pantalla: 'usuario-logueado'
                    }
                });
                document.dispatchEvent(cambioPantallaEvent);
            } else {
                alert('Correo electrónico o contraseña incorrectos. Por favor, intenta de nuevo.');
            }
        });
    }

    static get observedAttributes() {
        return ['correo', 'contrasena'];
    }

    attributeChangedCallback(propName, oldValue, newValue) {
        this[propName] = newValue;
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="/components/iniciarSesionComponent/style.css">
          <form>
            <h3>Iniciar sesión</h3>
            <input type="email" id="correo" placeholder="Correo electrónico" />
            <input type="password" id="contrasena" placeholder="Contraseña" />
            <button type="submit">Iniciar sesión</button>
          </form>
        `;
    }
}

customElements.define('inicio-sesion', InicioSesionComponent);
export default InicioSesionComponent;
