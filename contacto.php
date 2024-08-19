<?php
// Configuración de la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "contact_entries";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Verificar si el formulario fue enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = $_POST['first-name'];
    $lastName = $_POST['last-name'];
    $email = $_POST['email'];
    $orderNumber = $_POST['order-number'] ?? NULL;
    $subject = $_POST['subject'];
    $message = $_POST['message'];
    $fileUpload = NULL;

    // Verificar si se ha subido un archivo
    if (isset($_FILES['file-upload']) && $_FILES['file-upload']['error'] == 0) {
        $fileName = $_FILES['file-upload']['name'];
        $fileTmpName = $_FILES['file-upload']['tmp_name'];
        $fileSize = $_FILES['file-upload']['size'];
        $fileError = $_FILES['file-upload']['error'];
        $fileType = $_FILES['file-upload']['type'];

        // Límite de tamaño del archivo (10 MB)
        if ($fileSize > 10000000) {
            echo "El archivo es demasiado grande.";
            exit();
        }

        // Guardar el archivo en la carpeta 'uploads'
        $fileDestination = 'uploads/' . basename($fileName);
        if (move_uploaded_file($fileTmpName, $fileDestination)) {
            $fileUpload = $fileDestination;
        } else {
            echo "Error al subir el archivo.";
            exit();
        }
    }

    // Insertar datos en la base de datos
    $stmt = $conn->prepare("INSERT INTO contact_entries (first_name, last_name, email, order_number, subject, message, file_upload) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssss", $firstName, $lastName, $email, $orderNumber, $subject, $message, $fileUpload);

    if ($stmt->execute()) {
        echo "Mensaje enviado correctamente.";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>
