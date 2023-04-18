// const botonSearch = document.getElementById('boton-search')
// let modalContenedor = document.querySelector('.principal-nav')


// fetch('https://fakestoreapi.com/products')
//     .then(res => res.json())
//     .then(data => {   
//     // Filtrar los datos por categoría
//     const category1 = data.filter(item => item.category === "men's clothing");
//     const category2 = data.filter(item => item.category === "women's clothing");
//     const category3 = data.filter(item => item.category === "jewelery")
//     const category4 = data.filter(item => item.category === "electronics")
//     // ...
//     // Mostrar cada categoría en su contenedor correspondiente
//         displayCategory(category1, 'ropa-catalogo_hombres');
//         displayCategory(category2, 'ropa-catalogo_mujeres');
//         displayCategory(category3, 'catalogo-joyeria');
//         displayCategory(category4, 'catalogo-electronico')
//     // ...
// });

// function displayCategory(data, containerId) {
//   // Obtener el contenedor
//     const container = document.getElementById(containerId);
//   // Crear el contenido del contenedor
// let content = '';
//     data.slice(0, 4).forEach(item => {
//       content += ` 
//       <div class='products-cards'>
//           <img src="${item.image}" alt="${item.title}" class="cards-img">
//           <p class='cards-title'>${item.title}</p>
//           <p class='cards-price'>$ ${item.price}</p>
//           <button type='button' class='ver-producto-btn' data-producto-id="${item.id}">Ver producto</button>
//       </div>
//       `;
//     });
//   // Actualizar el contenido del contenedor
//     container.innerHTML = content;

//     agregarProducto();
// }



//Codigo para al dar click a un producto se abr la informacion 


function agregarProducto(){
  const verProductoBtns = document.querySelectorAll('.ver-producto-btn');
  verProductoBtns.forEach(btn => {
    btn.addEventListener('click', (event) => {
      // Obtener la información del producto seleccionado de la API
      const productoId = event.target.dataset.productoId;
      fetch(`https://fakestoreapi.com/products/${productoId}`)
        .then(response => response.json())
        .then(producto => {
          // Redirigir al usuario a la página del producto con la información del producto
          window.location.href = `/AluraProyectos/Eccomerce/PaginasAnexas/detalles.html?id=${producto.id}`;
        });
    });
  });
}



const urlParams = new URLSearchParams(window.location.search);
const productoId = urlParams.get('id');

// Obtener la información del producto de la API
fetch(`https://fakestoreapi.com/products/${productoId}`)
  .then(response => response.json())
  .then(producto => {
    // Mostrar los detalles del producto en la página
    const pruebaEl = document.querySelector('#prueba');
    pruebaEl.innerHTML = `
      <h2>${producto.title}</h2>
      <img src="${producto.image}" alt="${producto.title}" class="producto-image">
      <section class='producto-subcontenedor'>
      <p class='producto-descripcion'>Descripción: ${producto.description}</p>
      <p class='producto-precio'>Precio: ${producto.price}</p>
      <a href='javascript:void(0)' class='producto-button boton-add' data-imagen="${producto.image}" data-titulo="${producto.title}" data-precio="$${producto.price}">Añadir</a>
      </section>
    `;
  });





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
                    <a href = 'javascript:void(0)' class='button-cards boton-add' data-imagen="${item.image}" data-titulo="${item.title}" data-precio="$${item.price}">Añadir</a>
                </section>
                </figure>
            `;
        }
        document.querySelector('.contenedor-recomendaciones').innerHTML = content;

        const botonesAnadir = document.querySelectorAll('.boton-add');
        const modalCarrito = document.querySelector('.modal-carrito');
        const productoAdd = [];
        
        botonesAnadir.forEach(boton => {
          boton.addEventListener('click', (event) => {
            event.preventDefault()
            // Obtener la información del producto desde los atributos data del botón
            const imagen = boton.getAttribute('data-imagen');
            const titulo = boton.getAttribute('data-titulo');
            const precio = boton.getAttribute('data-precio');
        
            // Verificar si el producto ya existe en el carrito
            const index = productoAdd.findIndex(producto => producto.titulo === titulo);
            if (index !== -1) {
              // Si el producto ya existe en el carrito, aumentar su cantidad
              productoAdd[index].cantidad++;
            } else {
              // Si el producto no existe en el carrito, agregarlo con cantidad 1
              productoAdd.push({imagen, titulo, precio, cantidad: 1})
            }
        
            let contenidoModal = '';
            let total = 0;
            for (let producto of productoAdd) {
              contenidoModal += `
              <figure>
              <img src="${producto.imagen}" class='modal-image'>
              <figcaption class="modal-titulo-${producto.titulo}">${producto.titulo} x${producto.cantidad}</figcaption>
              <p>${producto.precio}</p>
              <button type='button' class='boton-eliminar' data-titulo="${producto.titulo}">
              Eliminar
              </button>
              </figure>
              `;
              total += parseFloat(producto.precio.replace('$', '')) * producto.cantidad;
            }
            
            contenidoModal += `
              <div class='contenedor-total'>
              Total: $${total}
              </div>
              <div class='contenedor-botones'>
                <button type='button' id='boton-pagar'>Pagar</button>
                <button type='button' id='boton-cancelar'>Cancelar</button>
              </div>
            `;
            
            // Actualizar el contenido del modal
            modalCarrito.innerHTML = contenidoModal;
            
            // Agregar evento de clic a los botones Eliminar
            const botonesEliminar = document.querySelectorAll('.boton-eliminar');
            botonesEliminar.forEach(botonEliminar => {
              botonEliminar.addEventListener('click', (event) => {
                event.preventDefault();
                const titulo = botonEliminar.getAttribute('data-titulo');
                const index = productoAdd.findIndex(producto => producto.titulo === titulo);
                if (index !== -1) {
                  if (productoAdd[index].cantidad > 1) {
                    // Si hay más de una unidad del producto en el carrito, disminuir su cantidad
                    productoAdd[index].cantidad--;
                    botonEliminar.closest('figure').querySelector(`.modal-titulo-${titulo}`).innerHTML = `${titulo} x${productoAdd[index].cantidad}`;
                  } else {
                    // Si hay solo una unidad del producto en el carrito, eliminarlo
                    productoAdd.splice(index, 1);
                    botonEliminar.closest('figure').remove();
                  }
                  // Actualizar el total
                  let total = 0;
                  for (let producto of productoAdd) {
                    total += parseFloat(producto.precio.replace('$', '')) * producto.cantidad;
                  }
                  document.querySelector('.contenedor-total').innerHTML = `Total: $${total}`;
                  
                  // Cerrar el modal si no hay productos en el carrito
                  if (productoAdd.length === 0) {
                    modalCarrito.style.display = 'none';
                  }
                }
              });
            });
            
            // Agregar evento de clic al botón Cancelar
            const botonCancelar = document.querySelector('#boton-cancelar');
            botonCancelar.addEventListener('click', (event) => {
              event.preventDefault();
              productoAdd.length = 0;
              modalCarrito.style.display = 'none';
            });
            
            // Mostrar el modal
            modalCarrito.style.display = 'block';
          });
        });
    });



