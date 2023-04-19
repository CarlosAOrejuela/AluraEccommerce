fetch('https://fakestoreapi.com/products?limit=5')
      .then(res => res.json())
      .then(data => {
  
          let dataPrimera = data
          let content = '';
          for (let item of dataPrimera){
              content += `
                  <figure class='contenedor-cards'>
                  <section class='imagenes-contenedor'>
                      <img class='imagenes-cards' src="${item.image}" title="${item.title}">
                      <figcaption class='title-cards'> ${item.title
                      }</figcaption>
                  </section>
                  <section class='contenedor-descripcion'>
                      <p class='description-cards'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel tincidunt nisl, sit amet posuere felis. </p>
                      <p class='descripcion-precio'>$${item.price}</p>
                      <a href = 'javascript:void(0)' class='button-cards boton-add'>Añadir</a>
                  </section>
                  </figure>
              `;
          }
          document.querySelector('.contenedor-recomendaciones').innerHTML = content;
      });



// //Aquí hay un ejemplo de cómo puedes crear un botón con forma de carro en la esquina inferior derecha de la página y agregar un contador de notificación encima del botón:

// <!-- HTML -->
// <div class="boton-carro">
//   <span class="contador">0</span>
// </div>
// /* CSS */
// .boton-carro {
//   position: fixed;
//   bottom: 20px;
//   right: 20px;
//   width: 50px;
//   height: 50px;
//   border-radius: 25px;
//   background-color: #333;
// }

// .contador {
//   position: absolute;
//   top: -10px;
//   right: -10px;
//   width: 20px;
//   height: 20px;
//   border-radius: 10px;
//   background-color: red;
//   color: white;
//   text-align: center;
// }
// // JavaScript
// const botonAdd = document.querySelector('.boton-add');
// const contador = document.querySelector('.contador');

// botonAdd.addEventListener('click', () => {
//     let count = parseInt(contador.textContent);
//     count++;
//     contador.textContent = count;
// });
// Este código crea un botón con forma de carro en la esquina inferior derecha de la página y agrega un contador de notificación encima del botón. Cuando se hace clic en el botón “Añadir”, el contador se incrementa en uno.

// Espero que esto te ayude. ¿Hay algo más en lo que pueda ayudarte?