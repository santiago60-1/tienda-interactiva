function cerrarSesion() {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    
    // Redirect to the login page
    window.location.href = "../../index.html";
}

document.getElementById('logoutButton').addEventListener('click', cerrarSesion);