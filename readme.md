Tienda Interactiva - Sistema Completo de Gestión Financiera
📋 Descripción General
Esta aplicación web permite gestionar las finanzas de una tienda mediante el registro y control de ingresos y egresos (compras y ventas), administración dinámica de categorías, y generación de reportes analíticos para facilitar la toma de decisiones.

El proyecto integra frontend (HTML, CSS, JS), backend simulado con JSON Server y almacenamiento local mediante LocalStorage, brindando una experiencia completa y sencilla para el usuario.

🔧 Tecnologías Utilizadas
Frontend: HTML5, CSS3 con animaciones y media queries, JavaScript ES6+ modularizado.

Backend simulado: JSON Server para simular API REST con base de datos JSON (bd.json).

Persistencia local: LocalStorage para guardar movimientos de forma local.

Control de versiones: Git + GitHub.

Herramientas recomendadas: Node.js para ejecutar JSON Server, VSCode con Live Server.

📁 Estructura del Proyecto
csharp
Copiar
Editar
/
├── public/
│   └── databases/
│       └── bd.json          # Base de datos JSON con usuarios y categorías
├── src/
│   ├── styles/
│   │   ├── index.css
│   │   ├── login.css
│   │   ├── dashboard.css
│   │   ├── movimientos.css
│   │   ├── categorias.css
│   │   └── reportes.css
│   └── views/
│       ├── index.html       # Página de bienvenida
│       ├── login.html       # Página de login
│       ├── dashboard.html   # Panel principal
│       ├── movimientos.html # Gestión de movimientos
│       ├── categorias.html  # Gestión de categorías
│       └── reportes.html    # Visualización de reportes
├── backends/
│   ├── login.js             # Lógica de autenticación
│   ├── guardian.js          # Control de acceso a páginas
│   ├── movimientos.js       # Gestión de movimientos
│   ├── categorias.js        # Gestión de categorías
│   └── reportes.js          # Generación de reportes
├── .gitignore
├── package.json             # (Opcional, si usas npm)
└── README.md
🚀 Instalación y Ejecución
Clonar el repositorio:

bash
Copiar
Editar
git clone https://github.com/santiago60-1/tienda-interactiva.git
cd tienda-interactiva
Instalar JSON Server (si no lo tienes):

bash
Copiar
Editar
npm install -g json-server
Ejecutar el servidor JSON (simula la API REST):

bash
Copiar
Editar
json-server --watch public/databases/bd.json --port 3000
Abrir el proyecto en un servidor local o directamente abrir los archivos .html en un navegador moderno (preferiblemente Chrome o Firefox).

🔐 Autenticación y Seguridad
El login verifica usuarios desde la base JSON.

La protección de rutas está garantizada por guardian.js que redirige usuarios no autenticados al login.

Las sesiones se mantienen con sessionStorage.

🗂️ Funcionalidades Principales
1. Bienvenida
Página introductoria con beneficios y acceso al login.

2. Login
Autenticación de usuarios contra la base JSON.

Control de sesión con validación simple.

3. Dashboard
Panel de navegación a las secciones: Movimientos, Categorías y Reportes.

Cierre de sesión.

4. Movimientos
Añadir movimientos (compra/venta) con descripción, importe, fecha y categoría.

Filtrar y ordenar movimientos.

Almacenamiento en LocalStorage para persistencia local.

Eliminación de movimientos.

5. Categorías
Gestión dinámica de categorías.

Cada categoría puede tener propiedades heterogéneas (fruta, verdura, nombre).

Sincronización con la API JSON Server.

Eliminación de categorías y movimientos asociados.

6. Reportes
Resumen visual y analítico de los movimientos.

Reportes por categoría y mes con totales.

Información sobre los productos y meses más vendidos/comprados.

💾 Base de Datos (bd.json)
Usuarios con id, usuario y contraseña.

Categorías con id y propiedades variables (ej. fruta, verdura, nombre).

La base se sincroniza con JSON Server para CRUD de categorías.

Movimientos almacenados localmente para persistencia inmediata.

🎨 Estilos y Responsive Design
CSS modular para cada página.

Variables CSS para colores y fuentes.

Animaciones y transiciones suaves.

Media queries para adaptabilidad en dispositivos:

Móviles (hasta 480px)

Tablets (481px - 768px)

Desktop (1080px en adelante)

🛠️ Cómo Contribuir
Haz fork del repositorio.

Crea una rama con tu feature: git checkout -b feature/nombre-feature

Realiza commits claros y descriptivos.

Haz push a tu rama: git push origin feature/nombre-feature

Abre un Pull Request para revisión.

📞 Contacto
Santiago — GitHub