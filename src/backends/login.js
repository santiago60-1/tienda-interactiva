const urlUsers = "http://localhost:3000/users"

const formLogin = document.getElementById("loginForm")


async function login(inputUsername, inputPassword) {

    const response = await fetch(`${urlUsers}?user=${inputUsername}`);
    const data = await response.json();

    if (data.length === 0) {
        alert("Usuario no encontrado");
    } else {
        const userFound = data[0];

        if (userFound.password === inputPassword) {
            localStorage.setItem("user", JSON.stringify(userFound));
            window.location.href = "../views/dashboard.html";
        } else {
            alert("Credenciales incorrectas");
        }
    }
    
}


//Enviamos los datos del formulario al servidor
formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputUsername = formLogin.username.value;
    const inputPassword = formLogin.password.value;
    login(inputUsername, inputPassword);
});

