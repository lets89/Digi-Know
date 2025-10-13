const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


document.addEventListener("DOMContentLoaded", () => {

  
  const registroForm = document.getElementById("registroform");
  if (registroForm) {
    registroForm.addEventListener("submit", async (event) => {
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
          body: JSON.stringify({ Usuario, Correo, Contraseña }),
        });

        const text = await response.text();
        alert(text);

        if (response.ok) window.location.href = "Inicio.html";
        else errorMsg.textContent = text;
      } catch (error) {
        errorMsg.textContent = "Error de conexión con el servidor.";
      }
    });
  }


  const loginForm = document.getElementById("sesionform");
  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
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
          body: JSON.stringify({ Usuario, Contraseña }),
        });

        const text = await response.text();

        if (response.ok) {
          alert("Inicio de sesión exitoso ");
          window.location.href = "Inicio.html";
        } else {
          errorMsg.textContent = text;
        }
      } catch (error) {
        errorMsg.textContent = "Error de conexión con el servidor.";
        console.error(error);
      }
    });
  }
});
