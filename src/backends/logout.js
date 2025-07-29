function cerrarSesion() {
    // Verificar si 'user' existe en localStorage
    if (localStorage.getItem('user')) {
        console.log("Cerrando sesión...");
        localStorage.removeItem('user');
    } else {
        console.log("No hay usuario en sesión.");
    }
    
    // Redirigir a la página de login
    window.location.href = "../../index.html";
}

document.getElementById('logout-btn').addEventListener('click', cerrarSesion);