<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed'
    ]);
    exit;
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);
if (!is_array($data)) {
    $data = [];
}

$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$message = trim($data['message'] ?? '');

if ($name === '' || $email === '' || $message === '') {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Required fields missing'
    ]);
    exit;
}

$to = getenv('COMPANY_EMAIL') ?: getenv('EMAIL_USER') ?: 'info@teenscreations.com';
$subject = 'New Contact Form Submission – ' . (!empty($data['projectTitle']) ? $data['projectTitle'] : 'No Title');
$body = sprintf(
    "Name: %s\nEmail: %s\nPhone: %s\nService: %s\nProject Title: %s\n\nMessage:\n%s",
    $name,
    $email,
    $data['phone'] ?? 'N/A',
    $data['service'] ?? 'N/A',
    $data['projectTitle'] ?? 'N/A',
    $message
);

$headers = [];
$headers[] = 'From: Teens Creations Website <info@teenscreations.com>';
$headers[] = 'Reply-To: ' . $email;
$headers[] = 'Content-Type: text/plain; charset=UTF-8';

$sent = mail($to, $subject, $body, implode("\r\n", $headers));

if ($sent) {
    echo json_encode([
        'success' => true,
        'message' => 'Message sent successfully'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to send email'
    ]);
}
