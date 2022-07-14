<?php

$q = $_REQUEST["q"];

$servername = "localhost";
$username = "lnkoc";
$password = "lnkoc";
$dbname = "sozdb";

$conn = new mysqli($servername, $username, $password, $dbname);

if($conn->connect_error) {
  die("Brak połączenia z bazą danych: " . $conn->connect_error);
}
$sql = "SELECT LOGIN FROM ORGANIZATOR;";
$result = $conn->query($sql);

while($row = $result->fetch_assoc()) {
    $logins[] = $row["LOGIN"];
}

$response = "false";
foreach ($logins as $key) {
  if (!strcmp($key, $q)) {
    $response = "true";
  }
}

echo $response;

$result->free_result();
$conn->close();
?>
