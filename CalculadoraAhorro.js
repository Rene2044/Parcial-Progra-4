class CalculadoraAhorro extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          max-width: 400px;
          margin: 20px auto;
          padding: 20px;
          border-radius: 12px;
          background: #ffffff;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          color: #333;
        }
        h2 { color: #2c3e50; text-align: center; }
        form { display: flex; flex-direction: column; gap: 15px; }
        .field { display: flex; flex-direction: column; }
        label { margin-bottom: 5px; font-weight: bold; font-size: 0.9em; }
        input, select {
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 1em;
        }
        button {
          background-color: #3498db;
          color: white;
          border: none;
          padding: 12px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
          transition: background 0.3s;
        }
        button:hover { background-color: #2980b9; }
        #resultado {
          margin-top: 20px;
          padding: 15px;
          border-radius: 6px;
          text-align: center;
          font-weight: bold;
          display: none;
        }
        .error { border: 1px solid #ff7675 !important; background: #fff5f5; }
      </style>

      <h2>Calculadora de Ahorro</h2>
      <form id="ahorroForm">
        <div class="field">
          <label>Ingresos Mensuales ($):</label>
          <input type="number" id="ingresos" placeholder="Ej: 1200">
        </div>

        <div class="field">
          <label>Gastos Totales ($):</label>
          <input type="number" id="gastos" placeholder="Ej: 800">
        </div>

        <div class="field">
          <label>Prioridad de Ahorro:</label>
          <select id="prioridad">
            <option value="">Seleccione...</option>
            <option value="bajo">Bajo (5%)</option>
            <option value="moderado">Moderado (15%)</option>
            <option value="agresivo">Agresivo (30%)</option>
          </select>
        </div>

        <button type="button" id="btnCalcular">Calcular Balance</button>
      </form>

      <div id="resultado"></div>
    `;

    this.setupEvents();
  }

  setupEvents() {
    const btn = this.shadowRoot.querySelector('#btnCalcular');
    btn.addEventListener('click', () => this.calcular());
  }

  calcular() {
    const ingresos = this.shadowRoot.querySelector('#ingresos');
    const gastos = this.shadowRoot.querySelector('#gastos');
    const prioridad = this.shadowRoot.querySelector('#prioridad');
    const resDiv = this.shadowRoot.querySelector('#resultado');

    // Validación de datos
    let valid = true;
    [ingresos, gastos, prioridad].forEach(el => {
      if (!el.value || el.value <= 0 && el.id !== 'prioridad') {
        el.classList.add('error');
        valid = false;
      } else {
        el.classList.remove('error');
      }
    });

    if (!valid) {
      alert("Por favor, completa todos los campos con valores válidos.");
      return;
    }

    // Lógica de negocio
    const balance = ingresos.value - gastos.value;
    resDiv.style.display = 'block';

    if (balance < 0) {
      resDiv.style.background = '#ffeaa7';
      resDiv.innerHTML = `⚠️ Estás en déficit por $${Math.abs(balance)}. <br> Reduce tus gastos.`;
    } else {
      resDiv.style.background = '#dff9fb';
      resDiv.innerHTML = `✅ Tu saldo libre es de $${balance}. <br> 
      ¡Vas por buen camino con tu plan ${prioridad.value}!`;
    }
  }
}

// Registrar el WebComponent
customElements.define('calculadora-ahorro', CalculadoraAhorro);