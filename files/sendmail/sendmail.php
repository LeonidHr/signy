<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/PHPMailer.php';
	require 'phpmailer/src/SMTP.php';

	$mail = new PHPMailer(true);
	$mail->CharSet = 'UTF-8';
	$mail->setLanguage('ru', 'phpmailer/language/');
	$mail->IsHTML(true);

	/*
	$mail->isSMTP();                                            //Send using SMTP
	$mail->Host       = 'smtp.example.com';                     //Set the SMTP server to send through
	$mail->SMTPAuth   = true;                                   //Enable SMTP authentication
	$mail->Username   = 'user@example.com';                     //SMTP username
	$mail->Password   = 'secret';                               //SMTP password
	$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
	$mail->Port       = 465;                 
	*/

	//Від кого лист
	$mail->setFrom('from@gmail.com', 'Signy'); // Вказати потрібний E-mail
	//Кому відправити
	$mail->addAddress('to@gmaili.com'); // Вказати потрібний E-mail
	//Тема листа
	$mail->Subject = 'Клиент Signy';

	//Тіло листа
	$body = '<h1>Клиент Signy!</h1>';

	if(trim(!empty($_POST['email']))){
		$body.='<p><strong>Имя клиента:</strong> '.$_POST['name'].'</p>';
	}	

	if(trim(!empty($_POST['email']))){
		$body.='<p><strong>Email клиента:</strong> '.$_POST['email'].'</p>';
	}	

	if(trim(!empty($_POST['phone']))){
		$body.='<p><strong>Телефон клиента:</strong> '.$_POST['phone'].'</p>';
	}	

	if(trim(!empty($_POST['message']))){
		$body.='<p><strong>Впрос клиента:</strong> '.$_POST['message'].'</p>';
	}	
	
	/*
	//Прикріпити файл
	if (!empty($_FILES['image']['tmp_name'])) {
		//шлях завантаження файлу
		$filePath = __DIR__ . "/files/sendmail/attachments/" . $_FILES['image']['name']; 
		//грузимо файл
		if (copy($_FILES['image']['tmp_name'], $filePath)){
			$fileAttach = $filePath;
			$body.='<p><strong>Фото у додатку</strong>';
			$mail->addAttachment($fileAttach);
		}
	}
	*/

	$mail->Body = $body;

	//Відправляємо
	if (!$mail->send()) {
		$message = 'Помилка';
	} else {
		$message = 'Дані надіслані!';
	}

	$response = ['message' => $message];

	header('Content-type: application/json');
	echo json_encode($response);
?>