<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "shopezmx23@gmail.com";
    $subject = "Nuevo mensaje de contacto";

    $firstName = $_POST['first-name'];
    $lastName = $_POST['last-name'];
    $email = $_POST['email'];
    $orderNumber = $_POST['order-number'];
    $subjectSelected = $_POST['subject'];
    $message = $_POST['message'];

    $body = "Nombre: $firstName $lastName\n";
    $body .= "Email: $email\n";
    $body .= "Número de orden: $orderNumber\n";
    $body .= "Asunto: $subjectSelected\n\n";
    $body .= "Mensaje:\n$message\n";

    // Handle file upload
    if (isset($_FILES['file-upload']) && $_FILES['file-upload']['error'] == UPLOAD_ERR_OK) {
        $file = $_FILES['file-upload']['tmp_name'];
        $fileName = $_FILES['file-upload']['name'];
        $fileType = $_FILES['file-upload']['type'];

        $fileContent = chunk_split(base64_encode(file_get_contents($file)));

        $boundary = md5(uniqid(time()));

        $headers = "From: $email\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

        $bodyText = "--$boundary\r\n";
        $bodyText .= "Content-Type: text/plain; charset=UTF-8\r\n";
        $bodyText .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
        $bodyText .= $body . "\r\n";
        $bodyText .= "--$boundary\r\n";
        $bodyText .= "Content-Type: $fileType; name=\"$fileName\"\r\n";
        $bodyText .= "Content-Transfer-Encoding: base64\r\n";
        $bodyText .= "Content-Disposition: attachment; filename=\"$fileName\"\r\n\r\n";
        $bodyText .= $fileContent . "\r\n";
        $bodyText .= "--$boundary--";

        if (mail($to, $subject, $bodyText, $headers)) {
            echo "Email enviado con éxito.";
        } else {
            echo "Error al enviar el email.";
        }
    } else {
        $headers = "From: $email\r\n";

        if (mail($to, $subject, $body, $headers)) {
            echo "Email enviado con éxito.";
        } else {
            echo "Error al enviar el email.";
        }
    }
}
?>
