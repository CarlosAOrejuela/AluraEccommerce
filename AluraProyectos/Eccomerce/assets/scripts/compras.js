import { getCart, removeFromCart } from '../scripts/cart.js';

// Obtener el contenido del carrito
function actualizarCarrito() {
    let cart = getCart();
    let content = '';
    for (let [productId, item] of Object.entries(cart)) {
        content += `
        <div class="product">
            <img src="${item.product.image}" alt="${item.product.title}">
            <h3>${item.product.title}</h3>
            <p>Precio: $${item.product.price}</p>
            <p>Cantidad: ${item.count}</p>
            <button class="boton-eliminar" data-id="${productId}">Eliminar</button>
        </div>
        `;
    }
    document.querySelector('.contenedor-compras').innerHTML = content;

    // Agregar eventos de escucha a los botones "Eliminar"
    const botonesEliminar = document.querySelectorAll('.boton-eliminar');
    for (let botonEliminar of botonesEliminar) {
        botonEliminar.addEventListener('click', (event) => {
            event.preventDefault();
            let productId = event.target.dataset.id;
            removeFromCart(productId);
            actualizarCarrito();
        });
    }
}

// Llamar a la función actualizarCarrito para generar el contenido inicial del carrito
actualizarCarrito();