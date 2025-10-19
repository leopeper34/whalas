const productos = [
  { nombre: "Whalas", precio: 150, descripcion: "Descripción del Producto 1", imagen: "ima/ba.png" },
  { nombre: "Playera #1", precio: 200, descripcion: "Descripción del Producto 2", imagen: "ima/uno.png" },
  { nombre: "Playera #2", precio: 300, descripcion: "Descripción del Producto 3", imagen: "ima/dos.png" },
  { nombre: "Playera #3", precio: 250, descripcion: "Descripción del Producto 4", imagen: "ima/tres.png" },
  { nombre: "Hoddie #1", precio: 350, descripcion: "Descripción del Producto 5", imagen: "ima/cua.png" }
];
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function agregarAlCarrito(index) {
  const productoSeleccionado = productos[index];
  const productoEnCarrito = carrito.find(item => item.nombre === productoSeleccionado.nombre);

  if (productoEnCarrito) {
      alert(`El producto "${productoSeleccionado.nombre}" ya está en el carrito.`);
  } else {
      productoSeleccionado.cantidad = 1;
      carrito.push(productoSeleccionado);
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarrito();
}

function incrementarCantidad(index) {
  carrito[index].cantidad += 1;
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarrito();
}

function disminuirCantidad(index) {
  if (carrito[index].cantidad > 1) {
      carrito[index].cantidad -= 1;
  } else {
      alert("La cantidad no puede ser menor que 1.");
  }
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarrito();
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarrito();
}

function actualizarCarrito() {
  const carritoTotal = document.getElementById('carrito-total');
  const carritoProductos = document.getElementById('carrito-productos');
  const carritoVacio = document.getElementById('carrito-vacio');
  const subtotal = document.getElementById('subtotal');
  const botonPagar = document.querySelector('.pagar-todo');
  const carritoConProductos = document.getElementById('carrito-con-productos');
  
  carritoTotal.textContent = carrito.length;
  carritoProductos.innerHTML = '';
  let subtotalAmount = 0;
  carrito.forEach((producto, index) => {
      const productoDiv = document.createElement('div');
      productoDiv.classList.add('modal-producto');
      productoDiv.innerHTML = `
          <img src="${producto.imagen}" alt="${producto.nombre}">
        <div>
            <h2 class="producto-nombre">${producto.nombre}</h2>
            <p class="producto-precio">$${producto.precio.toFixed(2)} x ${producto.cantidad}</p>
            <p class="producto-tamaño">Tamaño: ${producto.tamaño}</p> <!-- Aquí se muestra el tamaño -->
            <div class="cantidad-controles">
                <button onclick="disminuirCantidad(${index})">-</button>
                <span>${producto.cantidad}</span>
                <button onclick="incrementarCantidad(${index})">+</button>
            </div>
            <span class="eliminar-producto" onclick="eliminarDelCarrito(${index})">&times;</span>
        </div>
      `;
      carritoProductos.appendChild(productoDiv);
      subtotalAmount += producto.precio * producto.cantidad;
  });
  subtotal.textContent = `$${subtotalAmount.toFixed(2)}`;
  
  if (carrito.length === 0) {
    carritoVacio.style.display = 'block';
    carritoConProductos.style.display = 'none';
    botonPagar.style.display = 'none';
} else {
    carritoVacio.style.display = 'none';
    carritoConProductos.style.display = 'block';
    botonPagar.style.display = 'block';
  }
}

function abrirModal() {
  document.getElementById('carrito-modal').style.display = 'block';
  actualizarCarrito(); // Asegurarse de que el carrito esté actualizado al abrir el modal
}

function cerrarModal() {
  document.getElementById('carrito-modal').style.display = 'none';
}

function pagar() {
  if (carrito.length > 0) {
      const resumenPedido = {
          productos: carrito,
          subtotal: carrito.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0)
      };
      sessionStorage.setItem('resumenPedido', JSON.stringify(resumenPedido));
      window.location.href = 'pago.html';
  } else {
      alert('El carrito está vacío.');
  }
}

// Inicializar el carrito cuando se carga la página
document.addEventListener('DOMContentLoaded', actualizarCarrito);

// Mostrar productos en la página de catálogo
function mostrarCatalogo() {
  const catalogo = document.getElementById('catalogo');
  catalogo.innerHTML = '';
  productos.forEach((producto, index) => {
      const productoDiv = document.createElement('div');
      productoDiv.classList.add('producto');
      productoDiv.innerHTML = `
          <img src="${producto.imagen}" alt="${producto.nombre}">
          <h2>${producto.nombre}</h2>
          <p>${producto.descripcion}</p>
          <p>$${producto.precio.toFixed(2)}</p>
          <button onclick="agregarAlCarrito(${index})">Agregar al carrito</button>
      `;
      catalogo.appendChild(productoDiv);
  });
}

// Inicializar el catálogo cuando se carga la página de catálogo
if (document.getElementById('catalogo')) {
  document.addEventListener('DOMContentLoaded', mostrarCatalogo);
}

function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
  }