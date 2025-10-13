
const mysql = require('mysql2');

const conexion = mysql.createConnection({
  host: 'localhost',
  user: 'root',        
  password: '1989',         
  database: 'portalweb'
});

conexion.connect((error) => {
  if (error) {
    console.error('Error de conexión: ' + error);
    return;
  }
  console.log('Conexión exitosa a la base de datos.');
});

module.exports = conexion;