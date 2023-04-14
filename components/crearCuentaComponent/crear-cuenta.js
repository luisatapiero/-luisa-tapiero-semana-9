class CrearCuentaComponent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      this.render();
      this.shadowRoot.querySelector('form').addEventListener('submit', (event) => {
        event.preventDefault();
        const nombre = this.shadowRoot.getElementById('nombre').value;
        const correo = this.shadowRoot.getElementById('correo').value;
        const contrasena = this.shadowRoot.getElementById('contrasena').value;
  
        const nuevoUsuario = { nombre, correo, contrasena };
        const listaUsuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        listaUsuarios.push(nuevoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
  
        const cambioPantallaEvent = new CustomEvent('cambiarPantalla', {
          detail: {
            pantalla: 'inicio-sesion'
          }
        });
        document.dispatchEvent(cambioPantallaEvent);
      });
    }
  
    static get observedAttributes() {
      return ['nombre', 'correo', 'contrasena'];
    }
  
    attributeChangedCallback(propName, oldValue, newValue) {
      this[propName] = newValue;
      this.render();
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="/components/crearCuentaComponent/style.css">
        <form>
        <h3>Crear cuenta</h3>
          <input type="text" id="nombre" placeholder="Nombre" />
          <input type="email" id="correo" placeholder="Correo electrónico" />
          <input type="password" id="contrasena" placeholder="Contraseña" />
          <button type="submit">Crear cuenta</button>
        </form>
      `;
    }
  }
  
  customElements.define('crear-cuenta', CrearCuentaComponent);
  export default CrearCuentaComponent;
  