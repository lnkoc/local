<?php
$q= $_REQUEST["q"];
$eventId = $_REQUEST["d"];

$servername = "localhost";
$username = "lnkoc";
$password = "lnkoc";
$dbname = "sozdb";

$conn = new mysqli($servername, $username, $password, $dbname);
if($conn->connect_error) {
  die("Błąd połączenia z bazą danych " . $conn->connect_error);
}

$sql = "SELECT TOKEN FROM SESJA;";
$result = $conn->query($sql);
$logged = false;
while($row = $result->fetch_assoc()) {
  if(!strcmp($row["TOKEN"], $q)) {
    $logged = true;
  }
}
if($logged) {
  $sql2 = "DELETE FROM WYDARZENIE_DANE WHERE WYDARZENIE_DANE.WYDARZENIE_ID = '" . $eventId. "';";
  $conn->query($sql2);
  echo "Pomyślnie usunięto wydarzenie o id: " . $eventId;
}
else {
  echo "false";
}
$conn->close();
?>
