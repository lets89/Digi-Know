const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// ✅ Ruta para obtener usuario por nombre (por si se quiere consultar luego)
app.get("/usuario/:Usuario", (req, res) => {
  const Usuario = req.params.Usuario;

  db.query("SELECT Usuario FROM cuentas WHERE Usuario = ?", [Usuario], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Error en la consulta" });
    } else if (result.length > 0) {
      res.json({ Usuario: result[0].Usuario });
    } else {
      res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
  });
});

// ✅ Registro (devuelve el nombre del nuevo usuario)
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
    // 👇 devolvemos el nombre recién registrado
    res.json({ mensaje: "Registro exitoso", Usuario });
  });
});

// ✅ Login (devuelve el nombre del usuario si los datos son correctos)
app.post("/login", (req, res) => {
  const { Usuario, Contraseña } = req.body;
  const sql = "SELECT * FROM cuentas WHERE Usuario = ? AND Contraseña = ?";

  db.query(sql, [Usuario, Contraseña], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error al iniciar sesión.");
    }
    if (result.length > 0) {
      // 👇 devolvemos el nombre del usuario
      res.json({ mensaje: "Inicio de sesión exitoso", Usuario: result[0].Usuario });
    } else {
      res.status(401).send("Usuario o contraseña incorrectos.");
    }
  });
});

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));


