<?php
$q = $_REQUEST["q"];
$eventId = $_REQUEST["d"];

$servername = 'localhost';
$username = 'lnkoc';
$password = 'lnkoc';
$dbname = 'sozdb';

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
 $sql2 = "SELECT MIEJSCE, INFO, DATA_START, CZAS_START FROM WYDARZENIE_DANE WHERE WYDARZENIE_ID = '" . $eventId . "';";
 $result2 = $conn->query($sql2);
 $row2 = $result2->fetch_assoc();

 $obRes->place = $row2["MIEJSCE"];
 $obRes->description = $row2["INFO"];
 $obRes->dateStart = $row2["DATA_START"];
 $obRes->timeStart = $row2["CZAS_START"];

 echo json_encode($obRes);
}
else {
  echo "false";
}

$conn->close();
?>
