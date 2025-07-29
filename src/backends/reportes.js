// ========================
// Configuración
// ========================
const API_URL = 'http://localhost:3000'; // Solo si querés usarla más adelante

// ========================
// DOM - Reportes generales
// ========================
const catMasVendida = document.getElementById('cat-mas-vendida');
const catMasComprada = document.getElementById('cat-mas-comprada');
const prodMasVendido = document.getElementById('prod-mas-vendido');
const prodMasComprado = document.getElementById('prod-mas-comprado');
const mesMasVentas = document.getElementById('mes-mas-ventas');
const mesMasCompras = document.getElementById('mes-mas-compras');

// DOM - Tablas de totales
const contenedorCat = document.getElementById('totales-categoria');
const contenedorMes = document.getElementById('totales-mes');

// ========================
// Datos
// ========================
const movimientos = JSON.parse(localStorage.getItem('movimientos')) || [];

// ========================
// Utilidades
// ========================
function agruparPor(lista, clave) {
  return lista.reduce((acc, item) => {
    const valor = item[clave];
    acc[valor] = acc[valor] || [];
    acc[valor].push(item);
    return acc;
  }, {});
}

function agruparPorMes(lista) {
  return lista.reduce((acc, item) => {
    const mes = item.fecha.slice(0, 7); // yyyy-mm
    acc[mes] = acc[mes] || [];
    acc[mes].push(item);
    return acc;
  }, {});
}

function obtenerMayor(objeto) {
  return Object.entries(objeto).reduce((max, actual) => {
    return actual[1] > max[1] ? actual : max;
  }, ['', 0])[0];
}

// ========================
// Cálculo de reportes
// ========================
function calcularReportes() {
  if (movimientos.length === 0) return;

  // Categoría más vendida / comprada
  const porCategoria = movimientos.reduce((acc, mov) => {
    const cat = mov.categoria;
    if (!acc[cat]) acc[cat] = { compra: 0, venta: 0 };
    acc[cat][mov.tipo]++;
    return acc;
  }, {});
  let maxVentaCat = '';
  let maxCompraCat = '';
  let ventaCount = 0;
  let compraCount = 0;

  for (const [cat, { compra, venta }] of Object.entries(porCategoria)) {
    if (venta > ventaCount) {
      maxVentaCat = cat;
      ventaCount = venta;
    }
    if (compra > compraCount) {
      maxCompraCat = cat;
      compraCount = compra;
    }
  }

  catMasVendida.textContent = maxVentaCat || '-';
  catMasComprada.textContent = maxCompraCat || '-';

  // Producto más vendido / comprado
  const porProducto = movimientos.reduce((acc, mov) => {
    const desc = mov.descripcion;
    if (!acc[desc]) acc[desc] = { compra: 0, venta: 0 };
    acc[desc][mov.tipo]++;
    return acc;
  }, {});
  let maxVentaProd = '';
  let maxCompraProd = '';
  let ventaProdCount = 0;
  let compraProdCount = 0;

  for (const [desc, { compra, venta }] of Object.entries(porProducto)) {
    if (venta > ventaProdCount) {
      maxVentaProd = desc;
      ventaProdCount = venta;
    }
    if (compra > compraProdCount) {
      maxCompraProd = desc;
      compraProdCount = compra;
    }
  }

  prodMasVendido.textContent = maxVentaProd || '-';
  prodMasComprado.textContent = maxCompraProd || '-';

  // Mes con más ventas / compras
  const porMes = movimientos.reduce((acc, mov) => {
    const mes = mov.fecha.slice(0, 7);
    if (!acc[mes]) acc[mes] = { compra: 0, venta: 0 };
    acc[mes][mov.tipo]++;
    return acc;
  }, {});
  let maxMesVentas = '';
  let maxMesCompras = '';
  let ventaMesCount = 0;
  let compraMesCount = 0;

  for (const [mes, { compra, venta }] of Object.entries(porMes)) {
    if (venta > ventaMesCount) {
      maxMesVentas = mes;
      ventaMesCount = venta;
    }
    if (compra > compraMesCount) {
      maxMesCompras = mes;
      compraMesCount = compra;
    }
  }

  mesMasVentas.textContent = maxMesVentas || '-';
  mesMasCompras.textContent = maxMesCompras || '-';

  // Totales por categoría
  const agrupadoCat = agruparPor(movimientos, 'categoria');
  contenedorCat.innerHTML = `
    <table>
      <thead>
        <tr><th>Categoría</th><th>Compras ($)</th><th>Ventas ($)</th></tr>
      </thead>
      <tbody>
        ${Object.entries(agrupadoCat).map(([cat, arr]) => {
          const compra = arr.filter(m => m.tipo === 'compra').reduce((sum, m) => sum + m.importe, 0);
          const venta = arr.filter(m => m.tipo === 'venta').reduce((sum, m) => sum + m.importe, 0);
          return `<tr><td>${cat}</td><td>$${compra.toFixed(2)}</td><td>$${venta.toFixed(2)}</td></tr>`;
        }).join('')}
      </tbody>
    </table>
  `;

  // Totales por mes
  const agrupadoMes = agruparPorMes(movimientos);
  contenedorMes.innerHTML = `
    <table>
      <thead>
        <tr><th>Mes</th><th>Compras ($)</th><th>Ventas ($)</th></tr>
      </thead>
      <tbody>
        ${Object.entries(agrupadoMes).map(([mes, arr]) => {
          const compra = arr.filter(m => m.tipo === 'compra').reduce((sum, m) => sum + m.importe, 0);
          const venta = arr.filter(m => m.tipo === 'venta').reduce((sum, m) => sum + m.importe, 0);
          return `<tr><td>${mes}</td><td>$${compra.toFixed(2)}</td><td>$${venta.toFixed(2)}</td></tr>`;
        }).join('')}
      </tbody>
    </table>
  `;
}

// ========================
// Iniciar
// ========================
calcularReportes();
