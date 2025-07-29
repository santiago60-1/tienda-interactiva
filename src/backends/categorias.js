const formCategoria = document.getElementById('form-categoria');
const inputNombre = document.getElementById('nombre-categoria');
const listaCategorias = document.getElementById('lista-categorias');

let movimientos = JSON.parse(localStorage.getItem('movimientos')) || [];

// Función para guardar movimientos en localStorage
function guardarMovimientos() {
  localStorage.setItem('movimientos', JSON.stringify(movimientos));
}

// Obtener categorías desde API y mostrar en lista
async function cargarCategorias() {
  try {
    const res = await fetch('http://localhost:3000/categorias');
    const categoriasAPI = await res.json();

    renderizarCategorias(categoriasAPI);
  } catch (error) {
    console.error('Error cargando categorías desde API', error);
  }
}

// Mostrar categorías en UI
function renderizarCategorias(categorias) {
  listaCategorias.innerHTML = '';

  categorias.forEach(catObj => {
    // Aquí asumimos que el objeto tiene propiedades, por ejemplo:
    // { id: "123kk", fruta: "manzana", verdura: "aji" }
    // Mostraremos cada valor de categoría como un ítem, junto con el id para eliminar

    // Vamos a extraer cada propiedad que NO sea "id" y crear un item para cada valor

    Object.entries(catObj).forEach(([key, value]) => {
      if (key === 'id') return; // saltar id

      const li = document.createElement('li');
      li.textContent = `${value} (${key})`;

      // Botón eliminar para esa categoría específica (value)
      const btnEliminar = document.createElement('button');
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.style.marginLeft = '10px';
      btnEliminar.onclick = () => eliminarCategoria(catObj.id, value);

      li.appendChild(btnEliminar);
      listaCategorias.appendChild(li);
    });
  });
}

// Eliminar categoría (valor) de la API y movimientos asociados
async function eliminarCategoria(idCategoria, valorCategoria) {
  if (!confirm(`¿Eliminar categoría "${valorCategoria}"? Se eliminarán los movimientos asociados.`)) return;

  try {
    // Paso 1: Traer el objeto categoría completo para modificarlo
    const res = await fetch(`http://localhost:3000/categorias/${idCategoria}`);
    const catObj = await res.json();

    // Paso 2: Eliminar la propiedad (clave-valor) de la categoría que corresponde a valorCategoria
    // Encontrar la clave correspondiente a valorCategoria
    let claveAEliminar = null;
    for (const [clave, valor] of Object.entries(catObj)) {
      if (clave !== 'id' && valor === valorCategoria) {
        claveAEliminar = clave;
        break;
      }
    }
    if (!claveAEliminar) {
      alert('No se encontró la categoría para eliminar.');
      return;
    }

    delete catObj[claveAEliminar];

    // Paso 3: Actualizar la categoría en la API con PATCH (o PUT)
    await fetch(`http://localhost:3000/categorias/${idCategoria}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(catObj)
    });

    // Paso 4: Eliminar movimientos asociados a esta categoría
    movimientos = movimientos.filter(mov => mov.categoria !== valorCategoria);
    guardarMovimientos();

    // Recargar UI
    cargarCategorias();

  } catch (error) {
    console.error('Error eliminando categoría:', error);
    alert('No se pudo eliminar la categoría.');
  }
}

// Agregar nueva categoría a la API
formCategoria.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nombre = inputNombre.value.trim();
  if (!nombre) {
    alert('El nombre de la categoría no puede estar vacío.');
    return;
  }

  try {
    // Validar que no exista el valor en la API ya (simple check)
    const resCheck = await fetch('http://localhost:3000/categorias');
    const categoriasAPI = await resCheck.json();

    // Buscar si el valor ya existe entre todas las categorías
    const existe = categoriasAPI.some(catObj => {
      return Object.values(catObj).includes(nombre);
    });

    if (existe) {
      alert('La categoría ya existe.');
      return;
    }

    // Para simplificar, agregamos un nuevo objeto con id único y una propiedad 'nombre' con el valor
    // O si quieres mantener fruta/verdura como claves, tendrías que decidir cómo clasificar
    // Aquí uso clave "nombre" para evitar complejidad:

    const newCat = {
      id: Date.now().toString(),
      nombre: nombre
    };

    await fetch('http://localhost:3000/categorias', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCat)
    });

    inputNombre.value = '';
    cargarCategorias();

  } catch (error) {
    console.error('Error agregando categoría:', error);
    alert('No se pudo agregar la categoría.');
  }
});

// Al iniciar
cargarCategorias();