document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formResena");
  const listaResenas = document.getElementById("listaResenas");

  const resenas = JSON.parse(localStorage.getItem("resenas")) || [];
  mostrarResenas();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombreCliente").value.trim();
    const comentario = document.getElementById("comentario").value.trim();

    if (!nombre || !comentario) {
      alert(" Debes completar todos los campos.");
      return;
    }

    resenas.push({ nombre, comentario });
    localStorage.setItem("resenas", JSON.stringify(resenas));

    form.reset();
    mostrarResenas();
  });

  function mostrarResenas() {
    listaResenas.innerHTML = "";
    resenas.forEach((r) => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.innerHTML = `<strong>${r.nombre}:</strong> ${r.comentario}`;
      listaResenas.appendChild(li);
    });
  }
});
