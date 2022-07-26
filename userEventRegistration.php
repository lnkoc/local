<?php
$q = $_REQUEST["q"];
$eventId = $_REQUEST["d"];
$class = $_REQUEST["c"];

$servername = 'localhost';
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
  if(!strcmp($row["TOKEN"], $q)) {
    $logged = true;
    $login = $row["LOGIN"];
  }
}
if($logged) {
  $sql2 = "SELECT UZYTKOWNIK_ID FROM UZYTKOWNIK WHERE LOGIN='" .$login. "';";
  $result2 = $conn->query($sql2);
  $row = $result2->fetch_assoc();
  $event->userId = $row["UZYTKOWNIK_ID"];

  $sql3 = "SELECT WYDARZENIE_KLASA_ID FROM WYDARZENIE_KLASA, KLASA
  WHERE WYDARZENIE_KLASA.WYDARZENIE_ID = '" . $eventId . "' AND WYDARZENIE_KLASA.KLASA_ID = KLASA.KLASA_ID
  AND KLASA.NAZWA = '" . $class . "';";
  $result3 = $conn->query($sql3);
  $row = $result3->fetch_assoc();
  $event->eventClassId = $row["WYDARZENIE_KLASA_ID"];

  $sql4 = "INSERT INTO REJESTRACJA(WYDARZENIE_KLASA_ID, UZYTKOWNIK_ID) VALUES ('" . $event->eventClassId . "', '" . $event->userId . "');";
  // echo $sql4;
  $conn->query($sql4);
}
else {
  echo "false";
}
$conn->close();
?>
