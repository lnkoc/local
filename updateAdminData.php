<?php

$obJson = file_get_contents('php://input');
$data = json_decode($obJson);

$servername = "localhost";
$username = "lnkoc";
$password = "lnkoc";
$dbname = "sozdb";

$conn = new mysqli($servername, $username, $password, $dbname);
if($conn->connect_error) {
  die("Błąd połączenia z bazą danych " . $conn->connect_error);
}
$sql = "SELECT LOGIN, TOKEN FROM SESJA;";
$result = $conn->query($sql);
$logged = false;
while($row = $result->fetch_assoc()) {
  if(!strcmp($row["TOKEN"], $data->token)) {
    $login = $row["LOGIN"];
    $logged = true;
  }
}
if($logged) {
  $sql2 = "UPDATE ORGANIZATOR SET IMIE = '" . $data->name . "', NAZWISKO = '" . $data->surname . "',
    EMAIL = '" . $data->email . "', TELEFON = '" . $data->phone . "', ORGANIZACJA = '" . $data->organisation . "'
    WHERE LOGIN = '" . $login . "';";
  $conn->query($sql2);
}
else {
  echo "Sesja wygasła";
}
$conn->close();
?>
