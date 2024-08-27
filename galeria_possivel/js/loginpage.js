var attempt=3
        
        function login(){
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        
        if( attempt == 0){
        document.getElementById("email").disabled = true;
        document.getElementById("password").disabled = true;
        document.getElementById("submit").disabled = true;
        return null
        }

        if (email == 'Correio eletrónico' || password == 'Senha' || email == '' || password == ''){
        alert ("Por favor não deixe em branco nada.");
        return null
        }

        var user = localStorage.getItem("user");
        user = JSON.parse(user);

        if (email == user.email && password == user.password){
        alert ("Pode entrar!");
        window.location = "index.html"
        return false
        }

        else if (email == 'Correio eletrónico' || password == 'Senha' || email == '' || password == ''){
        alert ("Por favor não deixe em branco nada.")
        }
        
        else {
        attempt --;
        alert("Falhou, temos pena!")
        }
        }