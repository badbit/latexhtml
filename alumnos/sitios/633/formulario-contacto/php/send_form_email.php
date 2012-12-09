<?php
if(isset($_POST['email'])) {
     
    // EDITA LAS SIGUIENTES DOS LÍNEAS
    $email_to = "miguel-angel.lozano@cobachbc.edu.mx";
    $email_subject = "Quiero saber más sobre su empresa";
     
     
    function died($error) {
        // your error code can go here
        echo "Lo sentimos mucho, pero hay algunos errores en su formulario. ";
        echo "Los errores aparecen a continuación.<br /><br />";
        echo $error."<br /><br />";
        echo "Por favor regrese y arregle estos errores.<br /><br />";
        die();
    }
     
    // validation expected data exists
    if(!isset($_POST['first_name']) ||
        !isset($_POST['last_name']) ||
        !isset($_POST['email']) ||
        !isset($_POST['telephone']) ||
        !isset($_POST['comments'])) {
        died('Lo sentimos, pero al parecer hay errores con el formulario que avaba de enviar.');      
    }
     
    $first_name = $_POST['first_name']; // required
    $last_name = $_POST['last_name']; // required
    $email_from = $_POST['email']; // required
    $telephone = $_POST['telephone']; // not required
    $comments = $_POST['comments']; // required
     
    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
  if(!preg_match($email_exp,$email_from)) {
    $error_message .= 'El correo electrónico no es válido.<br />';
  }
    $string_exp = "/^[A-Za-z .'-]+$/";
  if(!preg_match($string_exp,$first_name)) {
    $error_message .= 'El nombre que introdujo no es válido.<br />';
  }
  if(!preg_match($string_exp,$last_name)) {
    $error_message .= 'El apellido que introdujo no es válido.<br />';
  }
  if(strlen($comments) < 2) {
    $error_message .= 'Los comentarios que introdujo no son válidos.<br />';
  }
  if(strlen($error_message) > 0) {
    died($error_message);
  }
    $email_message = "Los detalles del formulario se encuentran a continuación.\n\n";
     
    function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    }
     
    $email_message .= "Nombre: ".clean_string($first_name)."\n";
    $email_message .= "Apellido: ".clean_string($last_name)."\n";
    $email_message .= "Correo electrónico: ".clean_string($email_from)."\n";
    $email_message .= "Teléfono: ".clean_string($telephone)."\n";
    $email_message .= "Comentarios: ".clean_string($comments)."\n";
     
     
// create email headers
$headers = 'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'X-Mailer: PHP/' . phpversion();
@mail($email_to, $email_subject, $email_message, $headers); 
?>
 
<!-- include your own success html here -->
 
Gracias por contactarnos. Nos pondremos en contacto con usted lo más pronto posible.

<?php
}
?>