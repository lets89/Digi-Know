
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/registro", (req, res) => {
  const { Usuario, Correo, Contraseña } = req.body;

  if (!Usuario || !Correo || !Contraseña) {
    return res.status(400).send("Todos los campos son obligatorios.");
  }

  const sql = "INSERT INTO cuentas (Usuario, Correo, Contraseña) VALUES (?, ?, ?)";
  db.query(sql, [Usuario, Correo, Contraseña], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error al registrar el usuario.");
    }
    res.send("Registro exitoso.");
  });
});


app.post("/login", (req, res) => {
  const { Usuario, Contraseña } = req.body;
  const sql = "SELECT * FROM cuentas WHERE Usuario = ? AND Contraseña = ?";

  db.query(sql, [Usuario, Contraseña], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error al iniciar sesión.");
    }
    if (result.length > 0) res.send("Inicio de sesión exitoso");
    else res.status(401).send("Usuario o contraseña incorrectos.");
  });
});

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));

