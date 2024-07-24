const productos = [
    { nombre: "Whalas", precio: 150, descripcion: "Descripción del Producto 1", imagen: "ima/ba.png" },
    { nombre: "Playera #1", precio: 200, descripcion: "Descripción del Producto 2", imagen: "ima/uno.png" },
    { nombre: "Playera #2", precio: 300, descripcion: "Descripción del Producto 3", imagen: "ima/dos.png" },
    { nombre: "Playera #3", precio: 250, descripcion: "Descripción del Producto 4", imagen: "ima/tres.png" },
    { nombre: "Hoddie #1", precio: 350, descripcion: "Descripción del Producto 5", imagen: "ima/cua.png" }
];
let carrito = [];

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
    document.getElementById('total-productos').textContent = `Total Productos: ${productos.length}`;
}

function agregarAlCarrito(index) {
    const productoSeleccionado = productos[index];
    const productoEnCarrito = carrito.find(item => item.nombre === productoSeleccionado.nombre);

    if (productoEnCarrito) {
        alert(`El producto "${productoSeleccionado.nombre}" ya está en el carrito.`);
    } else {
        productoSeleccionado.cantidad = 1;
        carrito.push(productoSeleccionado);
    }

    actualizarCarrito();
}

function incrementarCantidad(index) {
    carrito[index].cantidad += 1;
    actualizarCarrito();
}

function disminuirCantidad(index) {
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad -= 1;
    } else {
        alert("La cantidad no puede ser menor que 1.");
    }
    actualizarCarrito();
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

function actualizarCarrito() {
    const carritoTotal = document.getElementById('carrito-total');
    const carritoProductos = document.getElementById('carrito-productos');
    const carritoVacio = document.getElementById('carrito-vacio');
    const subtotal = document.getElementById('subtotal');
    const botonPagar = document.querySelector('.pagar-todo');
    
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
        botonPagar.style.display = 'none';
    } else {
        carritoVacio.style.display = 'none';
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

function buscarProducto() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(searchTerm));
    
    const catalogo = document.getElementById('catalogo');
    catalogo.innerHTML = '';
    productosFiltrados.forEach((producto, index) => {
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
    document.getElementById('total-productos').textContent = `Total Productos: ${productosFiltrados.length}`;
}

function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

function toggleSubmenu(event) {
    event.preventDefault();
    const submenuContent = document.getElementById('submenu-content');
    submenuContent.style.display = submenuContent.style.display === 'block' ? 'none' : 'block';
}

function toggleSearch() {
    const searchContainer = document.querySelector('.search-container');
    searchContainer.classList.toggle('expanded');
    document.getElementById('search').focus();
}

function toggleOrdenarMenu() {
    const ordenarContent = document.getElementById('ordenar-content');
    ordenarContent.style.display = ordenarContent.style.display === 'block' ? 'none' : 'block';
}

function ordenarCatalogo(criterio) {
    switch (criterio) {
        case 'az':
            productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
            break;
        case 'za':
            productos.sort((a, b) => b.nombre.localeCompare(a.nombre));
            break;
        case 'precio-asc':
            productos.sort((a, b) => a.precio - b.precio);
            break;
        case 'precio-desc':
            productos.sort((a, b) => b.precio - a.precio);
            break;
    }
    mostrarCatalogo();
}

mostrarCatalogo();
