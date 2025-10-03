document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formConsulta");
  const listaConsultas = document.getElementById("listaConsultas");

  const consultas = JSON.parse(localStorage.getItem("consultas")) || [];
  mostrarConsultas();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const mascota = document.getElementById("mascota").value.trim();
    const fecha = document.getElementById("fecha").value;
    const motivo = document.getElementById("motivo").value.trim();

    if (!mascota || !fecha || !motivo) {
      alert(" Debes completar todos los campos.");
      return;
    }

    consultas.push({ mascota, fecha, motivo });
    localStorage.setItem("consultas", JSON.stringify(consultas));

    form.reset();
    mostrarConsultas();
  });

  function mostrarConsultas() {
    listaConsultas.innerHTML = "";
    consultas.forEach((c) => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.textContent = `🐾 ${c.mascota} - 📅 ${c.fecha} - Motivo: ${c.motivo}`;
      listaConsultas.appendChild(li);
    });
  }
});
