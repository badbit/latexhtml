<?php
$nombre = $_POST["nombre"];
$email = $_POST["email"];
$comentarios = $_POST["comentarios"];
if($nombre=="" OR $email=="" OR $comentarios=="")
	HEADER("Location: contacto.html");
else
	{
$myname = $nombre; 
$myemail = $email; 

$contactname = "Mensaje!!!!"; 
$contactemail = "micorreo"; 

$message = $nombre.'<br>'.$email.'<br>'.$comentarios; 
$subject = "Comentario de la Pagina -".$tema."-";

$headers .= "MIME-Version: 1.0\r\n"; 
$headers .= "Content-type: text/html; charset=iso-8859-1\r\n"; 
$headers .= "From: ".$myname." <".$myemail.">\r\n"; 
$headers .= "To: ".$contactname." <".$contactemail.">\r\n"; 
//$headers .= "Cc: ".$contactname." <".$contactemail.">\r\n"; 
$headers .= "Reply-To: ".$myname." <$myreplyemail>\r\n"; 
$headers .= "X-Priority: 1\r\n"; 
$headers .= "X-MSMail-Priority: High\r\n"; 
$headers .= "X-Mailer: Just My Server"; 

mail($contactemail, $subject, $message, $headers); 

HEADER("Location:http://misitio/index.htm");
	}
?>
