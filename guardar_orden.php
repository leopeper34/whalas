<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "pagos";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener los datos enviados desde el frontend
$data = json_decode(file_get_contents('php://input'), true);

$email = $data['email'];
$nombre = $data['nombre'];
$apellido = $data['apellido'];
$direccion = $data['direccion'];
$apartamento = $data['apartamento'];
$codigo_postal = $data['codigo_postal'];
$ciudad = $data['ciudad'];
$estado = $data['estado'];
$telefono = $data['telefono'];
$metodo_pago = $data['metodo_pago'];
$monto_total = $data['monto_total'];

// Insertar datos en la base de datos
$sql = "INSERT INTO ordenes_completas (email, nombre, apellido, direccion, apartamento, codigo_postal, ciudad, estado, telefono, metodo_pago, monto_total)
VALUES ('$email', '$nombre', '$apellido', '$direccion', '$apartamento', '$codigo_postal', '$ciudad', '$estado', '$telefono', '$metodo_pago', '$monto_total')";

if ($conn->query($sql) === TRUE) {
    echo "Datos guardados exitosamente";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
