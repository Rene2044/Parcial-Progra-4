Integrantes:
Rene Oswaldo Orellana de la O SMSS038422
Allisson Lourdes Guevara Palma SMIS038421

Preguntas
1. ¿Que valor agregado tiene el uso de WebComponents a su proyecto?
El principal valor es la encapsulacion y la reutilizacion. Al usar el Shadow DOM, el estilo CSS y la logica de la calculadora de salud estan protegidos del resto de la pagina. Esto significa que: 
Independencia: Si añades más estilos al index.html, no "romperán" el diseño del formulario.

2. ¿De qué forma manipularon los datos sin recargar la página?
La manipulación se logró mediante Event Listeners y la manipulación del DOM:

Se utilizó un botón con type="button" dentro del formulario para evitar el envío (submit) automático al servidor.

Al capturar el evento click, el script extrae los valores de los input y el select usando sus id.

El cálculo se procesa internamente en JavaScript y el resultado se inyecta directamente en un elemento div de la interfaz utilizando la propiedad .innerHTML, lo que actualiza la vista instantáneamente para el usuario.

3. ¿De qué forma validaron las entradas de datos?
Se implementó una validación de doble capa antes de realizar cualquier cálculo:

Atributos de HTML: Se usaron tipos específicos como type="number" y atributos como step para guiar al usuario.

Lógica de JS (Programática): Se creó una variable de control (esValido). Se evaluó que los campos de texto no estuvieran vacíos (.trim() === "") y que los valores numéricos fueran lógicos (mayores a cero). En caso de error, se activan mensajes visuales ocultos en el componente, impidiendo que el cálculo se ejecute hasta que los datos sean correctos.

4. ¿Cómo manejaría la escalabilidad futura en su página?
Para escalar el proyecto, aplicaría las siguientes estrategias:

Atributos Dinámicos (Observables): Usar observedAttributes para que el componente cambie de color o idioma desde el HTML (ejemplo: <componente-registro tema="oscuro">).

Comunicación por Eventos: Implementar Custom Events para que, cuando un usuario registre su IMC, se dispare una señal que otros componentes (como una gráfica de historial) puedan captar.

Persistencia de Datos: Conectar el componente con el localStorage del navegador o una API externa para guardar los registros y que no se borren al cerrar la pestaña.