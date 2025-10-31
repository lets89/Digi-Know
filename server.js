const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });


app.post("/subirImagen", upload.single("foto"), (req, res) => {
  const { Usuario } = req.body;
  if (!Usuario || !req.file) return res.status(400).send("Faltan datos.");

  const ruta = "uploads/" + req.file.filename;
  db.query("UPDATE cuentas SET foto = ? WHERE Usuario = ?", [ruta, Usuario], (err) => {
    if (err) return res.status(500).send("Error al guardar imagen.");
    res.json({ mensaje: "Imagen guardada", ruta });
  });imagen
});


app.get("/foto/:Usuario", (req, res) => {
  const Usuario = req.params.Usuario;
  db.query("SELECT foto FROM cuentas WHERE Usuario = ?", [Usuario], (err, result) => {
    if (err) return res.status(500).send("Error en la consulta.");
    if (result.length === 0 || !result[0].foto) return res.status(404).send("No encontrada.");
    res.sendFile(path.join(__dirname, "public", result[0].foto));
  });
});


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
    
    res.json({ mensaje: "Registro exitoso", Usuario });
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
    if (result.length > 0) {
      
      res.json({ mensaje: "Inicio de sesión exitoso", Usuario: result[0].Usuario });
    } else {
      res.status(401).send("Usuario o contraseña incorrectos.");
    }
  });
});

app.listen(3000, '0.0.0.0', () => {
  console.log("Servidor corriendo en http://192.168.0.6:3000");
});


