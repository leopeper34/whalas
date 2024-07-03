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
    carrito.push(productos[index]);
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
                <p class="producto-precio">$${producto.precio.toFixed(2)}</p>
                <span class="eliminar-producto" onclick="eliminarDelCarrito(${index})">&times;</span>
            </div>
        `;
        carritoProductos.appendChild(productoDiv);
        subtotalAmount += producto.precio;
    });
    subtotal.textContent = `$${subtotalAmount.toFixed(2)}`;
    carritoVacio.style.display = carrito.length === 0 ? 'block' : 'none';
}

function abrirModal() {
    document.getElementById('carrito-modal').style.display = 'block';
}

function cerrarModal() {
    document.getElementById('carrito-modal').style.display = 'none';
}

function pagar() {
    if (carrito.length > 0) {
        alert('Gracias por tu compra!');
        carrito = [];
        actualizarCarrito();
        cerrarModal();
    } else {
        alert('El carrito está vacío.');
    }
}

function ordenarCatalogo(criterio) {
    if (criterio === 'az') {
        productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else if (criterio === 'za') {
        productos.sort((a, b) => b.nombre.localeCompare(a.nombre));
    } else if (criterio === 'precio-asc') {
        productos.sort((a, b) => a.precio - b.precio);
    } else if (criterio === 'precio-desc') {
        productos.sort((a, b) => b.precio - a.precio);
    }
    mostrarCatalogo();
}

function buscarProducto() {
    const searchInput = document.getElementById('search');
    const filter = searchInput.value.toLowerCase();
    const catalogo = document.getElementById('catalogo');
    catalogo.innerHTML = '';
    const productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(filter));
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
}

function toggleSearch() {
    const searchInput = document.getElementById('search');
    searchInput.classList.toggle('active');
    if (searchInput.classList.contains('active')) {
        searchInput.focus();
    } else {
        searchInput.value = '';
        buscarProducto();
    }
}

mostrarCatalogo();
actualizarCarrito();