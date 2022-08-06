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
  AND concat(WYDARZENIE_DANE.DATA_STOP_REJESTRACJA,' ',WYDARZENIE_DANE.CZAS_STOP_REJESTRACJA) >= NOW()
  ORDER BY WYDARZENIE_DANE.DATA_START, WYDARZENIE_DANE.CZAS_START";

  $result2 = $conn->query($sql2);
  $obArray = array();

  while($row = $result2->fetch_assoc()) {
    $rowArr["eventId"] = $row["WYDARZENIE_ID"];
    $rowArr["eventName"] = $row["NAZWA"];
    $rowArr["place"] = $row["MIEJSCE"];
    $rowArr["dateStart"] = $row["DATA_START"];
    $rowArr["timeStart"] = $row["CZAS_START"];
    $rowArr["name"] = $row["IMIE"];
    $rowArr["surname"] = $row["NAZWISKO"];
    $rowArr["organisation"] = $row["ORGANIZACJA"];
    $rowArr["dateStopRegistration"] = $row["DATA_STOP_REJESTRACJA"];
    $rowArr["timeStopRegistration"] = $row["CZAS_STOP_REJESTRACJA"];
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
