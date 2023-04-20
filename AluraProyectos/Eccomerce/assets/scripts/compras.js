import { getCart, removeFromCart } from '../scripts/cart.js';

// Obtener el contenido del carrito
function actualizarCarrito() {
    let cart = getCart();
    let content = '';

    if(Object.keys(cart).length === 0){
        content += `
            <div class='carrito-vacio'>
                <p>No tienes ningun producto en el carrito</p>
                <a href='./productos.html'>Regrea a nuestras ofertas</a>
            </div>
        `
    }else {
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

        let total = 0;
        for (let [productId, item] of Object.entries(cart)){
            total += item.product.price * item.count;
        }
        total = parseFloat(total.toFixed(2))
        total = +total.toFixed(2)
        content += `
            <div class='contenedor-total'>
                <p>Total: $${total}</p>
                <div class='total-botones'>
                    <button class='boton-pagar'>
                        Pagar
                    </button>
                    <button class='boton-cancelar'>
                        Cancelar
                    </button>
                </div>
            </div>

        `
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

        const botonPagar = document.querySelector('.boton-pagar');
        botonPagar.addEventListener('click', (event) => {
            event.preventDefault();

        });
        const botonCancelar = document.querySelector('.boton-cancelar');
        botonCancelar.addEventListener('click', (event) =>{
            event.preventDefault();
            localStorage.setItem('cart', JSON.stringify({}));
            let content = `
            <div class='contenedor-cancelado'>
                <p>Haz cancelado tu compra</p>
                <a class='boton-regresar' href='./productos.html'>
                    Regresa a ver las ofertas
                </a>
            </div>
            `;
            document.querySelector('.contenedor-compras').innerHTML = content;
        })
    
}

// Llamar a la función actualizarCarrito para generar el contenido inicial del carrito
actualizarCarrito();