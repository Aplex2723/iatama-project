<?php
  /**
  * Handles presupuesto (quotation) email sending
  * Requires the "PHP Email Form" library
  * The library should be uploaded to: vendor/php-email-form/php-email-form.php
  */

  // Email configuration for sending presupuesto
  $receiving_email_address = 'Direccion@iatama.com.mx';
  
  // SMTP Configuration
  $smtp_host = 'smtp.iatama.com.mx'; // Update with your SMTP host
  $smtp_username = 'Direccion@iatama.com.mx';
  $smtp_password = 'erCFVbzc0CLS';
  $smtp_port = '587'; // Usually 587 for TLS or 465 for SSL

  if( file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php' )) {
    include( $php_email_form );
  } else {
    die( 'Unable to load the "PHP Email Form" Library!');
  }

  $contact = new PHP_Email_Form;
  $contact->ajax = true;
  
  // Set the recipient
  $contact->to = $receiving_email_address;
  
  // Get form data
  $contact->from_name = $_POST['name'] ?? 'Cliente';
  $contact->from_email = $_POST['email'] ?? 'noreply@iatama.com.mx';
  $contact->subject = 'Nueva Solicitud de Presupuesto - ' . ($_POST['company'] ?? 'Particular');

  // Configure SMTP
  $contact->smtp = array(
    'host' => $smtp_host,
    'username' => $smtp_username,
    'password' => $smtp_password,
    'port' => $smtp_port
  );

  // Add message content
  $contact->add_message( $_POST['name'], 'Nombre');
  $contact->add_message( $_POST['email'], 'Email');
  $contact->add_message( $_POST['phone'], 'Teléfono');
  $contact->add_message( $_POST['company'] ?? 'Particular', 'Empresa');
  
  // Add products if provided
  if(isset($_POST['products'])) {
    $products = json_decode($_POST['products'], true);
    $product_list = "\n\nProductos solicitados:\n";
    foreach($products as $product) {
      $product_list .= "- " . $product['name'] . " (Cantidad: " . $product['quantity'] . ")\n";
    }
    $contact->add_message( $product_list, 'Productos', 20);
  }
  
  // Add any additional notes
  if(isset($_POST['notes']) && !empty($_POST['notes'])) {
    $contact->add_message( $_POST['notes'], 'Notas adicionales', 10);
  }

  echo $contact->send();
?>