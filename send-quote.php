<?php
// send-quote.php - Handles sending quotation PDFs via email

// Set headers for JSON response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Método no permitido']);
    exit();
}

try {
    // Get POST data
    $input = json_decode(file_get_contents('php://input'), true);

    // Validate required fields
    if (!isset($input['pdfData']) || !isset($input['userInfo'])) {
        throw new Exception('Datos incompletos');
    }

    $pdfData = $input['pdfData'];
    $userInfo = $input['userInfo'];

    // Validate user info
    if (empty($userInfo['name']) || empty($userInfo['email'])) {
        throw new Exception('Nombre y email son requeridos');
    }

    // Validate email format
    if (!filter_var($userInfo['email'], FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Email inválido');
    }

    // Remove data URI prefix from base64 if present
    $pdfData = preg_replace('/^data:application\/pdf;base64,/', '', $pdfData);

    // Decode base64 PDF
    $pdfContent = base64_decode($pdfData);
    if ($pdfContent === false) {
        throw new Exception('Error al procesar el PDF');
    }

    // Generate quote number and filename
    $quoteNumber = 'COT-' . substr(time(), -8);
    $filename = "cotizacion_iatama_{$quoteNumber}.pdf";

    // SMTP Configuration
    $smtpHost = 'mail.iatama.com.mx';
    $smtpPort = 465;
    $smtpUsername = 'ventas@iatama.com.mx';
    $smtpPassword = 'Iatama2024';
    $fromEmail = 'ventas@iatama.com.mx';
    $fromName = 'IATAMA - Ventas';

    // Email boundary
    $boundary = md5(time());

    // Prepare email headers
    $headers = "From: {$fromName} <{$fromEmail}>\r\n";
    $headers .= "Reply-To: {$fromEmail}\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"{$boundary}\"\r\n";

    // Function to send email via SMTP socket
    function sendSmtpEmail($to, $subject, $message, $headers, $smtpHost, $smtpPort, $smtpUsername, $smtpPassword) {
        $socket = fsockopen("ssl://{$smtpHost}", $smtpPort, $errno, $errstr, 30);

        if (!$socket) {
            throw new Exception("Error de conexión SMTP: {$errstr} ({$errno})");
        }

        // Read initial greeting
        fgets($socket);

        // SMTP handshake
        fputs($socket, "EHLO {$smtpHost}\r\n");
        fgets($socket);
        while ($line = fgets($socket)) {
            if ($line[3] == ' ') break;
        }

        // Authentication
        fputs($socket, "AUTH LOGIN\r\n");
        fgets($socket);

        fputs($socket, base64_encode($smtpUsername) . "\r\n");
        fgets($socket);

        fputs($socket, base64_encode($smtpPassword) . "\r\n");
        $response = fgets($socket);

        if (strpos($response, '235') === false) {
            fclose($socket);
            throw new Exception('Error de autenticación SMTP');
        }

        // Send mail
        fputs($socket, "MAIL FROM: <{$smtpUsername}>\r\n");
        fgets($socket);

        fputs($socket, "RCPT TO: <{$to}>\r\n");
        fgets($socket);

        fputs($socket, "DATA\r\n");
        fgets($socket);

        // Send headers and message
        fputs($socket, $headers . "\r\n");
        fputs($socket, $message . "\r\n");
        fputs($socket, ".\r\n");

        $response = fgets($socket);

        fputs($socket, "QUIT\r\n");
        fclose($socket);

        return strpos($response, '250') !== false;
    }

    // Email 1: Send quote to customer
    $customerSubject = "Su cotización de IATAMA - {$quoteNumber}";

    $customerBody = "--{$boundary}\r\n";
    $customerBody .= "Content-Type: text/html; charset=UTF-8\r\n";
    $customerBody .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $customerBody .= "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #444; }
            .header { background-color: #1d5d8b; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .footer { background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666; }
            .button { background-color: #1d5d8b; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 15px 0; }
        </style>
    </head>
    <body>
        <div class='header'>
            <h1>IATAMA</h1>
            <p>Ingeniería Aplicada en Tratamiento de Agua y Medio Ambiente</p>
        </div>
        <div class='content'>
            <h2>Estimado/a {$userInfo['name']},</h2>
            <p>Gracias por su interés en nuestros productos y servicios.</p>
            <p>Adjunto encontrará su cotización <strong>{$quoteNumber}</strong> con los productos seleccionados.</p>
            <p>Nuestros asesores están a su disposición para cualquier consulta o aclaración.</p>
            <h3>Información de contacto:</h3>
            <ul>
                <li><strong>Teléfono:</strong> (999) 263 0004</li>
                <li><strong>Email:</strong> ventas@iatama.com.mx</li>
                <li><strong>Dirección:</strong> Calle 69 #183 x 8C y Av. Pedagógica, Col. San Antonio Kaua, Mérida, Yucatán</li>
            </ul>
            <p><strong>Nota importante:</strong></p>
            <ul>
                <li>Los precios mostrados son de referencia. Un asesor le proporcionará los precios finales.</li>
                <li>Ofrecemos financiamiento a 9 meses sin intereses.</li>
                <li>Esta cotización tiene una vigencia de 30 días.</li>
            </ul>
            <p>Esperamos poder servirle pronto.</p>
            <p>Saludos cordiales,<br><strong>Equipo IATAMA</strong></p>
        </div>
        <div class='footer'>
            <p>IATAMA - Ingeniería Aplicada en Tratamiento de Agua y Medio Ambiente<br>
            Tel: (999) 263 0004 | Email: ventas@iatama.com.mx<br>
            Calle 69 #183 x 8C y Av. Pedagógica, Col. San Antonio Kaua, Mérida, Yucatán</p>
        </div>
    </body>
    </html>
    \r\n\r\n";

    // Attach PDF
    $customerBody .= "--{$boundary}\r\n";
    $customerBody .= "Content-Type: application/pdf; name=\"{$filename}\"\r\n";
    $customerBody .= "Content-Transfer-Encoding: base64\r\n";
    $customerBody .= "Content-Disposition: attachment; filename=\"{$filename}\"\r\n\r\n";
    $customerBody .= chunk_split(base64_encode($pdfContent)) . "\r\n";
    $customerBody .= "--{$boundary}--";

    // Send email to customer
    $customerEmailSent = sendSmtpEmail(
        $userInfo['email'],
        $customerSubject,
        $customerBody,
        $headers,
        $smtpHost,
        $smtpPort,
        $smtpUsername,
        $smtpPassword
    );

    if (!$customerEmailSent) {
        throw new Exception('Error al enviar el email al cliente');
    }

    // Email 2: Notification to sales team
    $salesSubject = "Nueva cotización enviada - {$quoteNumber}";

    $salesBody = "--{$boundary}\r\n";
    $salesBody .= "Content-Type: text/html; charset=UTF-8\r\n";
    $salesBody .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $salesBody .= "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #444; }
            .header { background-color: #1d5d8b; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .info-box { background-color: #90c3e8; padding: 15px; border-left: 4px solid #6c924a; margin: 15px 0; color: white; }
            .footer { background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666; }
        </style>
    </head>
    <body>
        <div class='header'>
            <h1>Nueva Cotización Generada</h1>
        </div>
        <div class='content'>
            <h2>Cotización {$quoteNumber}</h2>
            <p>Se ha generado y enviado una nueva cotización a un cliente.</p>

            <div class='info-box'>
                <h3>Información del Cliente:</h3>
                <p><strong>Nombre:</strong> {$userInfo['name']}</p>
                <p><strong>Email:</strong> {$userInfo['email']}</p>
                <p><strong>Teléfono:</strong> {$userInfo['phone']}</p>
                <p><strong>Empresa:</strong> " . (isset($userInfo['company']) && !empty($userInfo['company']) ? $userInfo['company'] : 'Particular') . "</p>
            </div>

            <p>La cotización ha sido enviada exitosamente al cliente y se adjunta una copia para su seguimiento.</p>

            <p><strong>Acción requerida:</strong> Por favor, dar seguimiento a esta solicitud de cotización lo antes posible.</p>
        </div>
        <div class='footer'>
            <p>Sistema de Cotizaciones IATAMA - Generado automáticamente</p>
        </div>
    </body>
    </html>
    \r\n\r\n";

    // Attach PDF
    $salesBody .= "--{$boundary}\r\n";
    $salesBody .= "Content-Type: application/pdf; name=\"{$filename}\"\r\n";
    $salesBody .= "Content-Transfer-Encoding: base64\r\n";
    $salesBody .= "Content-Disposition: attachment; filename=\"{$filename}\"\r\n\r\n";
    $salesBody .= chunk_split(base64_encode($pdfContent)) . "\r\n";
    $salesBody .= "--{$boundary}--";

    // Send email to sales team
    $salesEmailSent = sendSmtpEmail(
        $fromEmail,
        $salesSubject,
        $salesBody,
        $headers,
        $smtpHost,
        $smtpPort,
        $smtpUsername,
        $smtpPassword
    );

    // Return success even if sales email fails (customer email is priority)
    echo json_encode([
        'success' => true,
        'message' => 'Cotización enviada exitosamente',
        'quoteNumber' => $quoteNumber,
        'customerEmailSent' => $customerEmailSent,
        'salesEmailSent' => $salesEmailSent
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>
