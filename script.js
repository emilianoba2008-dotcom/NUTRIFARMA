let medicamentos = [];

fetch("medicamentos.json")
  .then(res => res.json())
  .then(data => {
    medicamentos = data;

    let categorias = [...new Set(medicamentos.map(med => med.categoria))];

    let select = document.getElementById("categoria");

    categorias.forEach(cat => {
      let option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;
      select.appendChild(option);
    });
    let vias = [...new Set(medicamentos.map(med => med.via))];
    let selectVia = document.getElementById("via");

    vias.forEach(v => {
      let option = document.createElement("option");
      option.value = v;
      option.textContent = v;
      selectVia.appendChild(option);
    });
    let formas = [...new Set(medicamentos.map(med => med.forma))];
    let selectForma = document.getElementById("forma");

    formas.forEach(f => {
      let option = document.createElement("option");
      option.value = f;
      option.textContent = f;
      selectForma.appendChild(option);
    });
    mostrarResultados(medicamentos);
  });

function normalizar(texto) {
  return (texto || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function buscar() {
  let texto = normalizar(document.getElementById("busqueda").value);
  let categoria = document.getElementById("categoria").value;
  let via = document.getElementById("via").value;
  let forma = document.getElementById("forma").value;

  let resultados = medicamentos.filter(med => {
    let coincideTexto = texto === "" || 
  normalizar(med.nombre).includes(texto) ||
  normalizar(med.categoria).includes(texto) ||
  normalizar(med.principio_activo).includes(texto) ||
  normalizar(med.indicaciones).includes(texto);

    return (
      coincideTexto &&
      (categoria === "" || med.categoria === categoria) &&
      (via === "" || med.via === via) &&
      (forma === "" || med.forma === forma)
    );
  });

  mostrarResultados(resultados);
}

function mostrarResultados(lista) {
  let contenedor = document.getElementById("resultados");
  contenedor.innerHTML = "";

   if (lista.length === 0) {
    contenedor.innerHTML = "<p>No se encontraron medicamentos 😢</p>";
    return;
  }

  lista.forEach((med, index) => {
   contenedor.innerHTML += `
  <div class="card" onclick="verDetalle(${med.id})">
    <h3>${med.nombre}</h3>
    <p class="categoria">${med.categoria}</p>
    <p class="precio">$${med.precio}</p>
  </div>
`;
  });
}

function verDetalle(id) {
  let med = medicamentos.find(m => m.id === id);

  let contenedor = document.getElementById("resultados");

  contenedor.innerHTML = `
    <h2>${med.nombre}</h2>

    <p><strong>Principio activo:</strong> ${med.principio_activo || "No disponible"}</p>
    <p><strong>Categoría:</strong> ${med.categoria || "No disponible"}</p>
    <p><strong>Forma farmacéutica:</strong> ${med.forma || "No disponible"}</p>
    <p><strong>Vía de administración:</strong> ${med.via || "No disponible"}</p>

    <p><strong>Indicaciones:</strong> ${med.indicaciones || "No disponible"}</p>
    <p><strong>Concentración:</strong> ${med.concentracion || "No disponible"}</p>
    <p><strong>Dosis:</strong> ${med.dosis || "No disponible"}</p>

    <p><strong>Contraindicaciones:</strong> ${med.contraindicaciones || "No disponible"}</p>
    <p><strong>Efectos secundarios:</strong> ${med.efectos_secundarios || "No disponible"}</p>

    <p><strong>Presentación:</strong> ${med.presentacion || "No disponible"}</p>
    <p><strong>Precio:</strong> $${med.precio || "No disponible"}</p>
    <p><strong>Disponibilidad:</strong> ${med.disponibilidad || "No disponible"}</p>

    <button onclick="buscar()">⬅ Volver</button>
  `;
}