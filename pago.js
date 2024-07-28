document.addEventListener('DOMContentLoaded', () => {
    const resumenPedido = JSON.parse(sessionStorage.getItem('resumenPedido'));
    const resumenDiv = document.getElementById('resumen-pedido');
    let totalAmount = 0;

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
            totalAmount += producto.cantidad * producto.precio;
            resumenDiv.appendChild(productoDiv);
        });

        const subtotalDiv = document.createElement('div');
        subtotalDiv.innerHTML = `<p>Subtotal: $${totalAmount.toFixed(2)}</p>`;
        resumenDiv.appendChild(subtotalDiv);
    } else {
        resumenDiv.innerHTML = '<p>No hay productos en el carrito.</p>';
    }

    initPayPalButton(totalAmount);
});

function initPayPalButton(totalAmount) {
    paypal.Buttons({
        style: {
            shape: 'rect',
            color: 'gold',
            layout: 'vertical',
            label: 'pay',
        },
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    description: "Resumen del Pedido",
                    amount: {
                        currency_code: "MXN",
                        value: totalAmount.toFixed(2)
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert('Pago completado por ' + details.payer.name.given_name);
            });
        },
        onError: function(err) {
            console.error('Error en el pago con PayPal', err);
        }
    }).render('#paypal-button-container');
}
