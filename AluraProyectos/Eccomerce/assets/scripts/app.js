const botonSearch = document.getElementById('boton-search')
let modalContenedor = document.querySelector('.principal-nav')


fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data => {   
    // Filtrar los datos por categoría
    const category1 = data.filter(item => item.category === "men's clothing");
    const category2 = data.filter(item => item.category === "women's clothing");
    const category3 = data.filter(item => item.category === "jewelery")
    const category4 = data.filter(item => item.category === "electronics")
    // ...
    // Mostrar cada categoría en su contenedor correspondiente
        displayCategory(category1, 'ropa-catalogo_hombres');
        displayCategory(category2, 'ropa-catalogo_mujeres');
        displayCategory(category3, 'catalogo-joyeria');
        displayCategory(category4, 'catalogo-electronico')
    // ...
});

function displayCategory(data, containerId) {
  // Obtener el contenedor
    const container = document.getElementById(containerId);
  // Crear el contenido del contenedor
let content = '';
    data.slice(0, 4).forEach(item => {
      content += ` 
      <div class='products-cards'>
          <img src="${item.image}" alt="${item.title}" class="cards-img">
          <p class='cards-title'>${item.title}</p>
          <p class='cards-price'>$ ${item.price}</p>
          <button type='button' class='ver-producto-btn' data-producto-id="${item.id}">Ver producto</button>
      </div>
      `;
    });
  // Actualizar el contenido del contenedor
    container.innerHTML = content;

    agregarProducto();
}



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
      <button type='button' class='producto-button'>Añadir</button>
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
                    <a href = '#' class='button-cards'>Añadir</a>
                </section>
                </figure>
            `;
        }
        document.querySelector('.contenedor-recomendaciones').innerHTML = content;
    });
