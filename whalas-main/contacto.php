<?php
// Conexión a la base de datos
$servername = "localhost";
$username = "root"; // Cambia por tu usuario de MySQL
$password = ""; // Cambia por tu contraseña de MySQL
$dbname = "contact_entries";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Recibir los datos del formulario
$first_name = $_POST['first-name'];
$last_name = $_POST['last-name'];
$email = $_POST['email'];
$order_number = $_POST['order-number'];
$subject = $_POST['subject'];
$message = $_POST['message'];

// Procesar la subida del archivo
$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES["file-upload"]["name"]);
$imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

// Verifica si el archivo es una imagen real
$check = getimagesize($_FILES["file-upload"]["tmp_name"]);
if ($check !== false) {
    if (move_uploaded_file($_FILES["file-upload"]["tmp_name"], $target_file)) {
        echo "El archivo " . htmlspecialchars(basename($_FILES["file-upload"]["name"])) . " ha sido subido.";
    } else {
        echo "Lo siento, hubo un error al subir tu archivo.";
    }
} else {
    echo "El archivo no es una imagen.";
    $target_file = null; // No se guarda nada si no es una imagen
}

// Insertar los datos en la base de datos
$sql = "INSERT INTO contact_entries (first_name, last_name, email, order_number, subject, message, file_name)
VALUES ('$first_name', '$last_name', '$email', '$order_number', '$subject', '$message', '$target_file')";

if ($conn->query($sql) === TRUE) {
    echo "Datos guardados con éxito";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
