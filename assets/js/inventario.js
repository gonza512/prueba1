document.addEventListener("DOMContentLoaded", () => {
  const listaProductos = document.getElementById("listaProductos");
  const listaCarro = document.getElementById("listaCarro");
  const btnVaciarCarro = document.getElementById("vaciarCarro");

  // Botón para realizar orden
  const btnOrden = document.getElementById("realizarOrden");
  const totalCarro = document.getElementById("totalCarro");

  // 🔹 Productos fijos con imágenes, precio
  const productos = [
    { producto: "Pedigree saco 5kg", imagen: "./assets/img/pedigree.png", precio: 9990 },
    { producto: "Juguete para gato", imagen: "./assets/img/juguetegato.jpg", precio: 3000 },
    { producto: "Collar para mascota", imagen: "./assets/img/collar.jpg", precio: 2500 },
    { producto: "Cama para perro", imagen: "./assets/img/camaperro.jpg", precio: 15000 }
  ];

  const carro = JSON.parse(localStorage.getItem("carro")) || [];

  mostrarProductos();
  mostrarCarro();

  function mostrarProductos() {
    listaProductos.innerHTML = "";
    productos.forEach((item, index) => {
      const col = document.createElement("div");
      col.className = "col-md-3";

      col.innerHTML = `
        <div class="card h-100 shadow-sm">
          <img src="${item.imagen}" class="card-img-top" alt="${item.producto}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${item.producto}</h5>
            <p class="card-text">Precio: $${item.precio.toLocaleString()}</p>
            <input type="number" class="form-control mb-2" min="1" value="1" id="cantidad-${index}">
            <button class="btn-custom mt-auto" data-index="${index}">Agregar al carrito</button>
          </div>
        </div>
      `;
      listaProductos.appendChild(col);
    });

    document.querySelectorAll('#listaProductos button').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = btn.dataset.index;
        const cantidad = parseInt(document.getElementById(`cantidad-${i}`).value) || 1;
        agregarAlCarro(productos[i], cantidad);
      });
    });
  }

  function agregarAlCarro(item, cantidad) {
    // Buscar si ya existe ese producto en el carro
    const existente = carro.find(c => c.producto === item.producto);
    if (existente) {
      existente.cantidad += cantidad;
    } else {
      carro.push({ ...item, cantidad });
    }
    localStorage.setItem("carro", JSON.stringify(carro));
    mostrarCarro();
  }

  function mostrarCarro() {
    listaCarro.innerHTML = "";
    if (carro.length === 0) {
      listaCarro.innerHTML = `<li class="list-group-item">Carrito vacío</li>`;
      totalCarro.textContent = "$0";
      return;
    }
    let total = 0;
    carro.forEach((item) => {
      const subtotal = item.precio * item.cantidad;
      total += subtotal;
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.innerHTML = `<span>${item.producto} x${item.cantidad}</span><strong>$${subtotal.toLocaleString()}</strong>`;
      listaCarro.appendChild(li);
    });
    totalCarro.textContent = `$${total.toLocaleString()}`;
  }

  btnVaciarCarro.addEventListener("click", () => {
    if (confirm("¿Vaciar carro?")) {
      carro.length = 0;
      localStorage.setItem("carro", JSON.stringify(carro));
      mostrarCarro();
    }
  });

  btnOrden.addEventListener("click", () => {
    if (carro.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
    alert("✅ Orden de compra generada con éxito.\nGracias por tu compra.");
    carro.length = 0;
    localStorage.setItem("carro", JSON.stringify(carro));
    mostrarCarro();
  });
});
