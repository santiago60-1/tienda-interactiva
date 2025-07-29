// ========================
// Configuración
// ========================
const API_URL = 'http://localhost:3000'; // ← Tu base de datos json-server

// ========================
// Elementos del DOM
// ========================
const form = document.getElementById('form-tipo');
const tipo = document.getElementById('tipo');
const descripcion = document.getElementById('descripcion');
const importe = document.getElementById('importe');
const fecha = document.getElementById('fecha');
const categoria = document.getElementById('categoria');
const tbody = document.getElementById('tbody-movimientos');

// Filtros y orden
const filtroTipo = document.getElementById('filtro-tipo');
const filtroCategoria = document.getElementById('filtro-categoria');
const filtroFechaInicio = document.getElementById('filtro-fecha-inicio');
const filtroFechaFin = document.getElementById('filtro-fecha-fin');
const ordenarPor = document.getElementById('ordenar-por');
const btnLimpiarFiltros = document.getElementById('btn-limpiar-filtros');

// ========================
// Estado
// ========================
let movimientos = JSON.parse(localStorage.getItem('movimientos')) || [];
let editandoIndex = -1;

// ========================
// Cargar categorías desde API
// ========================
async function cargarCategorias() {
  categoria.innerHTML = '<option value="" disabled selected>-- Selecciona --</option>';
  filtroCategoria.innerHTML = '<option value="">Todas las categorías</option>';

  try {
    const res = await fetch(`${API_URL}/categorias`);
    const datos = await res.json();

    const claves = new Set();
    datos.forEach(cat => {
      Object.keys(cat).forEach(key => {
        if (key !== "id") claves.add(key);
      });
    });

    claves.forEach(clave => {
      const optForm = document.createElement('option');
      optForm.value = clave;
      optForm.textContent = clave;
      categoria.appendChild(optForm);

      const optFiltro = document.createElement('option');
      optFiltro.value = clave;
      optFiltro.textContent = clave;
      filtroCategoria.appendChild(optFiltro);
    });
  } catch (err) {
    console.error("Error al cargar categorías:", err);
  }
}

// ========================
// Guardar en localStorage
// ========================
function guardarEnLocalStorage() {
  localStorage.setItem('movimientos', JSON.stringify(movimientos));
}

// ========================
// Renderizar tabla filtrada y ordenada
// ========================
function renderizarTabla() {
  let resultados = [...movimientos];

  // Filtros
  if (filtroTipo.value) {
    resultados = resultados.filter(m => m.tipo === filtroTipo.value);
  }
  if (filtroCategoria.value) {
    resultados = resultados.filter(m => m.categoria === filtroCategoria.value);
  }
  if (filtroFechaInicio.value) {
    resultados = resultados.filter(m => m.fecha >= filtroFechaInicio.value);
  }
  if (filtroFechaFin.value) {
    resultados = resultados.filter(m => m.fecha <= filtroFechaFin.value);
  }

  // Ordenamiento
  switch (ordenarPor.value) {
    case 'fecha-desc':
      resultados.sort((a, b) => b.fecha.localeCompare(a.fecha));
      break;
    case 'fecha-asc':
      resultados.sort((a, b) => a.fecha.localeCompare(b.fecha));
      break;
    case 'importe-desc':
      resultados.sort((a, b) => b.importe - a.importe);
      break;
    case 'importe-asc':
      resultados.sort((a, b) => a.importe - b.importe);
      break;
    case 'desc-az':
      resultados.sort((a, b) => a.descripcion.localeCompare(b.descripcion));
      break;
    case 'desc-za':
      resultados.sort((a, b) => b.descripcion.localeCompare(a.descripcion));
      break;
  }

  // Renderizar
  tbody.innerHTML = '';
  resultados.forEach((mov, i) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td class="${mov.tipo === 'compra' ? 'compra' : 'venta'}">${mov.tipo}</td>
      <td>${mov.descripcion}</td>
      <td>$${parseFloat(mov.importe).toFixed(2)}</td>
      <td>${mov.fecha}</td>
      <td>${mov.categoria}</td>
      <td>
        <button onclick="editarMovimiento(${i})">Editar</button>
        <button onclick="eliminarMovimiento(${i})">Eliminar</button>
      </td>
    `;
    tbody.appendChild(fila);
  });
}

// ========================
// Agregar o editar movimiento
// ========================
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nuevo = {
    tipo: tipo.value,
    descripcion: descripcion.value.trim(),
    importe: parseFloat(importe.value),
    fecha: fecha.value,
    categoria: categoria.value
  };

  if (!nuevo.tipo || !nuevo.descripcion || isNaN(nuevo.importe) || nuevo.importe <= 0 || !nuevo.fecha || !nuevo.categoria) {
    alert("Todos los campos deben estar completos y correctos.");
    return;
  }

  if (editandoIndex >= 0) {
    movimientos[editandoIndex] = nuevo;
    editandoIndex = -1;
  } else {
    movimientos.push(nuevo);
  }

  guardarEnLocalStorage();
  renderizarTabla();
  form.reset();
});

// ========================
// Eliminar movimiento
// ========================
window.eliminarMovimiento = function(index) {
  if (confirm('¿Eliminar este movimiento?')) {
    movimientos.splice(index, 1);
    guardarEnLocalStorage();
    renderizarTabla();
  }
};

// ========================
// Editar movimiento
// ========================
window.editarMovimiento = function(index) {
  const mov = movimientos[index];
  tipo.value = mov.tipo;
  descripcion.value = mov.descripcion;
  importe.value = mov.importe;
  fecha.value = mov.fecha;
  categoria.value = mov.categoria;
  editandoIndex = index;
};

// ========================
// Eventos de filtro y ordenamiento
// ========================
[
  filtroTipo,
  filtroCategoria,
  filtroFechaInicio,
  filtroFechaFin,
  ordenarPor
].forEach(input => input.addEventListener('change', renderizarTabla));

// Botón limpiar
btnLimpiarFiltros.addEventListener('click', () => {
  filtroTipo.value = '';
  filtroCategoria.value = '';
  filtroFechaInicio.value = '';
  filtroFechaFin.value = '';
  ordenarPor.value = '';
  renderizarTabla();
});

// ========================
// Inicializar
// ========================
cargarCategorias();
renderizarTabla();
