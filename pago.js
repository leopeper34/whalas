document.addEventListener('DOMContentLoaded', () => {
    const resumenPedido = JSON.parse(sessionStorage.getItem('resumenPedido'));
    const resumenDiv = document.getElementById('resumen-pedido');
    if (resumenPedido) {
        resumenPedido.productos.forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('product-item');
            productoDiv.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}" class="product-image">
                <div class="product-details">
                    <p>${producto.nombre} - ${producto.cantidad} x $${producto.precio.toFixed(2)}</p>
                </div>
            `;
            resumenDiv.appendChild(productoDiv);
        });
        const subtotalDiv = document.createElement('div');
        subtotalDiv.innerHTML = `<p>Subtotal: $${resumenPedido.subtotal.toFixed(2)}</p>`;
        resumenDiv.appendChild(subtotalDiv);

        // Si tienes un valor fijo para el envío, agrégalo aquí.
        const shipping = 4.80; // Precio del envío fijo (puedes ajustar según sea necesario)
        const total = resumenPedido.subtotal + shipping;
        const shippingDiv = document.createElement('div');
        shippingDiv.innerHTML = `<p>Shipping: $${shipping.toFixed(2)}</p>`;
        resumenDiv.appendChild(shippingDiv);
        
        const totalDiv = document.createElement('div');
        totalDiv.innerHTML = `<p>Total: $${total.toFixed(2)}</p>`;
        resumenDiv.appendChild(totalDiv);
    } else {
        resumenDiv.innerHTML = '<p>No hay productos en el carrito.</p>';
    }
});

function procesarPago() {
    alert('Procesando pago...');
    // Aquí puedes añadir la lógica para procesar el pago y redirigir a la página de confirmación
}
