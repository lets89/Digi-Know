  
  document.getElementById("registroForm").addEventListener("submit", function(event){
      event.preventDefault(); 
      
      let nombre = document.getElementById("nombre").value.trim();
      let correo = document.getElementById("correo").value.trim();
      let password = document.getElementById("password").value;
      let confirmPassword = document.getElementById("confirmPassword").value;
      let errorMsg = document.getElementById("errorMsg");
      
      
      if(nombre === "" || correo === "" || password === "" || confirmPassword === ""){
        errorMsg.textContent = "Todos los campos son obligatorios.";
        return;
      }
      
      
      let regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!regexCorreo.test(correo)){
        errorMsg.textContent = "Ingrese un correo válido.";
        return;
      }
      
      
      if(password !== confirmPassword){
        errorMsg.textContent = "Las contraseñas no coinciden.";
        return;
      }

      
      errorMsg.textContent = "";
      alert("Registro exitoso. Bienvenido, " + nombre + "!");
      document.getElementById("registroForm").reset(); 

      window.location.href = "Inicio.html";
    });

document.getElementById("secionform").addEventListener("submit", function(event){
  event.preventDefault(); 

  let correo = document.getElementById("correo").value.trim();
  let password = document.getElementById("password").value;
  let errorMsg = document.getElementById("errorMsg");

  if(correo === "" || password === ""){
    errorMsg.textContent = "Todos los campos son obligatorios.";
    return;
  }

  let regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!regexCorreo.test(correo)){
    errorMsg.textContent = "Ingrese un correo válido.";
    return;
  }

  errorMsg.textContent = "";
  alert("Inicio de sesión exitoso. Bienvenido!");
  document.getElementById("secionform").reset(); 

  window.location.href = "Inicio.html"; 
});