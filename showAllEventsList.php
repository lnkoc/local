<?php
$token = $_REQUEST["q"];

$servername = "localhost";
$username = "lnkoc";
$password = "lnkoc";
$dbname = "sozdb";

$conn = new mysqli($servername, $username, $password, $dbname);

if($conn->connect_error) {
  die("Błąd połączenia z bazą danych ". $conn->connect_error);
}

$sql = "SELECT TOKEN FROM SESJA;";
$result = $conn->query($sql);


$logged = false;
while($row = $result->fetch_assoc()) {
  if(!strcmp($row["TOKEN"], $token)) {
    $logged = true;
  }
}
if($logged) {
  $sql2 = "SELECT WYDARZENIE_DANE.WYDARZENIE_ID, WYDARZENIE_DANE.NAZWA, WYDARZENIE_DANE.MIEJSCE,
  WYDARZENIE_DANE.DATA_START, WYDARZENIE_DANE.CZAS_START, ORGANIZATOR.IMIE, ORGANIZATOR.NAZWISKO,
  ORGANIZATOR.ORGANIZACJA, WYDARZENIE_DANE.DATA_STOP_REJESTRACJA, WYDARZENIE_DANE.CZAS_STOP_REJESTRACJA
  FROM WYDARZENIE_DANE, ORGANIZATOR
  WHERE WYDARZENIE_DANE.ORGANIZATOR_ID = ORGANIZATOR.ORGANIZATOR_ID
  AND concat(WYDARZENIE_DANE.DATA_START,' ',WYDARZENIE_DANE.CZAS_START) >= NOW()
  AND concat(WYDARZENIE_DANE.DATA_STOP_REJESTRACJA,' ',WYDARZENIE_DANE.CZAS_STOP_REJESTRACJA) >= NOW()";

  $result2 = $conn->query($sql2);
  $obArray = array();

  while($row = $result2->fetch_assoc()) {
    $rowArr["eventId"] = utf8_encode($row["WYDARZENIE_ID"]);
    $rowArr["eventName"] = utf8_encode($row["NAZWA"]);
    $rowArr["place"] = utf8_encode($row["MIEJSCE"]);
    $rowArr["dateStart"] = utf8_encode($row["DATA_START"]);
    $rowArr["timeStart"] = utf8_encode($row["CZAS_START"]);
    $rowArr["name"] = utf8_encode($row["IMIE"]);
    $rowArr["surname"] = utf8_encode($row["NAZWISKO"]);
    $rowArr["organisation"] = utf8_encode($row["ORGANIZACJA"]);
    $rowArr["dateStopRegistration"] = utf8_encode($row["DATA_STOP_REJESTRACJA"]);
    $rowArr["timeStopRegistration"] = utf8_encode($row["CZAS_STOP_REJESTRACJA"]);
    array_push($obArray, $rowArr);
  }
  $obJson = json_encode($obArray);
  echo $obJson;
}
else {
  echo "false";
}

$conn->close();

?>
