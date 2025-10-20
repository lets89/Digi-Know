document.addEventListener("DOMContentLoaded", () => {
  console.log("JS cargado");

  // --- Registro ---
  const registroForm = document.getElementById("registroform");
  if (registroForm) {
    registroForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const Usuario = document.getElementById("Usuario").value.trim();
      const Correo = document.getElementById("Correo").value.trim();
      const Contraseña = document.getElementById("Contraseña").value.trim();
      const Confirmarcontraseña = document.getElementById("Confirmarcontraseña").value.trim();
      const errorMsg = document.getElementById("errorMsg");

      if (!Usuario || !Correo || !Contraseña || !Confirmarcontraseña) {
        errorMsg.textContent = "Todos los campos son obligatorios.";
        return;
      }

      if (Contraseña !== Confirmarcontraseña) {
        errorMsg.textContent = "Las contraseñas no coinciden.";
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/registro", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ Usuario, Correo, Contraseña })
        });

        const data = await response.json();
        if (response.ok) {
          // ✅ Guardar nombre en localStorage
          localStorage.setItem("usuario_actual", data.Usuario);
          alert("Registro exitoso");
          window.location.href = "Inicio.html";
        } else {
          errorMsg.textContent = data.mensaje;
        }
      } catch (error) {
        errorMsg.textContent = "Error de conexión con el servidor.";
        console.error(error);
      }
    });
  }

  // --- Login ---
  const loginForm = document.getElementById("sesionform");
  if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const Usuario = document.getElementById("Usuario").value.trim();
      const Contraseña = document.getElementById("Contraseña").value.trim();
      const errorMsg = document.getElementById("errorMsg");

      if (!Usuario || !Contraseña) {
        errorMsg.textContent = "Todos los campos son obligatorios.";
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ Usuario, Contraseña })
        });

        const data = await response.json();
        if (response.ok) {
          // ✅ Guardar nombre en localStorage
          localStorage.setItem("usuario_actual", data.Usuario);
          alert("Inicio de sesión exitoso");
          window.location.href = "Inicio.html";
        } else {
          errorMsg.textContent = data.mensaje;
        }
      } catch (error) {
        errorMsg.textContent = "Error de conexión con el servidor.";
        console.error(error);
      }
    });
  }
});
