function checkSession (){
    const user = localStorage.getItem('user');
    
    if (user === null) {
        window.location.href = "../../index.html";
    }
}

checkSession();