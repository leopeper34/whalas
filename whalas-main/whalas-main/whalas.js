let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function agregarAlCarrito() {
  const cantidadSeleccionada = parseInt(document.querySelector('.product-quantity input').value) || 1;
  const tamañoSeleccionado = document.querySelector('.size-button.active').dataset.size || 'M';

  const productoSeleccionado = {
    nombre: "Pijama De Ballena™",
    precio: 42.98,
    imagen: "ima/ba.png",
    cantidad: cantidadSeleccionada, // Cantidad seleccionada por el usuario
    tamaño: tamañoSeleccionado // Tamaño seleccionado por el usuario
  };

  const productoEnCarrito = carrito.find(item => item.nombre === productoSeleccionado.nombre && item.tamaño === productoSeleccionado.tamaño);

  if (productoEnCarrito) {
      productoEnCarrito.cantidad += cantidadSeleccionada;
  } else {
      carrito.push(productoSeleccionado);
  }

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
          <<img src="${producto.imagen}" alt="${producto.nombre}">
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

const sizeButtons = document.querySelectorAll('.size-button');

sizeButtons.forEach(button => {
  button.addEventListener('click', function () {
    sizeButtons.forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');
  });
});

document.querySelector('.product-button').addEventListener('click', agregarAlCarrito);

function disminuirCantidad(index) {
  if (carrito[index].cantidad > 1) {
      carrito[index].cantidad--;
  } else {
      carrito.splice(index, 1);
  }
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarrito();
}

function incrementarCantidad(index) {
  carrito[index].cantidad++;
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarrito();
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarrito();
}

document.addEventListener('DOMContentLoaded', actualizarCarrito);

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

document.addEventListener('DOMContentLoaded', actualizarCarrito);

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

if (document.getElementById('catalogo')) {
  document.addEventListener('DOMContentLoaded', mostrarCatalogo);
}

const accordions = document.querySelectorAll('.accordion');

accordions.forEach((accordion) => {
  const button = accordion.querySelector('.accordion-button');
  const content = accordion.querySelector('.accordion-content');

  button.addEventListener('click', () => {
    accordions.forEach((otherAccordion) => {
      if (otherAccordion !== accordion) {
        otherAccordion.classList.remove('active');
        otherAccordion.querySelector('.accordion-content').style.display = 'none';
      }
    });

    if (accordion.classList.contains('active')) {
      accordion.classList.remove('active');
      content.style.display = 'none';
    } else {
      accordion.classList.add('active');
      content.style.display = 'block';
    }
  });
});

function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('active');
}

function shareContent() {
  if (navigator.share) {
    navigator.share({
      title: 'Whalas Blankie™',
      text: '¡Mira esta increíble pijama de ballena!',
      url: 'https://leopeper34.github.io/whalas/#'
    }).then(() => {
      console.log('Compartir exitosamente');
    }).catch((error) => {
      console.error('Error al compartir:', error);
    });
  } else {
    alert('Web Share API no es compatible con su navegador.');
  }
}

document.querySelectorAll('.accordion-button').forEach(button => {
  button.addEventListener('click', () => {
    button.classList.toggle('active');
    button.nextElementSibling.classList.toggle('active');
  });
});

document.addEventListener('DOMContentLoaded', function() {
  let slideIndex = 0;
  const productImages = document.querySelectorAll('.product-thumb');
  const productImage = document.getElementById('product-image').querySelector('img');
  
  function showSlides() {
    productImages.forEach((img) => img.classList.remove('active'));
    productImages[slideIndex].classList.add('active');
    productImage.src = productImages[slideIndex].src;
    slideIndex++;
    if (slideIndex >= productImages.length) {
      slideIndex = 0;
    }
  }
  
  setInterval(showSlides, 3000);
  productImages.forEach(img => {
    img.addEventListener('click', () => {
      productImages.forEach(i => i.classList.remove('active'));
      img.classList.add('active');
      productImage.src = img.src;
    });
  });

  const modal = document.getElementById('myModal');
  const modalImg = document.getElementById('img01');
  const closeBtn = document.querySelector('.close');
  
  productImage.addEventListener('click', () => {
    modal.style.display = 'block';
    modalImg.src = productImage.src;
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });
});

document.querySelectorAll('.quantity-button').forEach(button => {
  button.addEventListener('click', function () {
      const input = this.parentElement.querySelector('input');
      let currentValue = parseInt(input.value);

      if (this.classList.contains('minus')) {
          if (currentValue > 1) {
              currentValue--;
          }
      } else if (this.classList.contains('plus')) {
          currentValue++;
      }

      input.value = currentValue;
  });
});
