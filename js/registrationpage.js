function save(){
    var username = document.getElementById("fullname").value;
    var password = document.getElementById("password").value;
    var confirmpassword = document.getElementById("confirmpassword").value;
    var email = document.getElementById("email").value;
    
    if(username.length < 6 || password.length < 6){
    alert("O nome de utilizador e a senha não podem ter menos de 6 caracteres.");
    return null
    }

    if(email=='Correio eletrónico' || email==''){
    alert("Não deixar em branco o espaço do correio eletrónico.")
    return null
    }

    if(password != confirmpassword) {
    alert("Por favor repita e confirme a senha.")
    return null
    }

    if(username.length >=6 || password.length >=6){
    alert("Parabéns, conseguiu!")
    }

    var user = {
    "email": email, "fullname": fullname, "password": password
    }

    localStorage.setItem("user", JSON.stringify(user));

    window.location = "loginpage.html";
    return false;
    }