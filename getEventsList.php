<?php

$token = $_REQUEST["q"];

$servername = "localhost";
$username = "lnkoc";
$password = "lnkoc";
$dbname = "sozdb";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("Błąd połączenia z bazą danych " . $conn->connect_error);
}

$sql = "SELECT LOGIN, TOKEN FROM SESJA;";
$result = $conn->query($sql);

$logged = false;
while($row = $result->fetch_assoc()) {
  if(!strcmp($row["TOKEN"], $token)) {
    $logged = true;
    $login = $row["LOGIN"];
  }
}

if($logged) {

  $sql2 = "SELECT WYDARZENIE_DANE.NAZWA AS NAZWA, WYDARZENIE_DANE.WYDARZENIE_ID AS WYDARZENIE_ID,
  WYDARZENIE_DANE.DATA_STOP_REJESTRACJA AS DATA_STOP, WYDARZENIE_DANE.CZAS_STOP_REJESTRACJA AS CZAS_STOP
  FROM WYDARZENIE_DANE, ORGANIZATOR
  WHERE WYDARZENIE_DANE.ORGANIZATOR_ID = ORGANIZATOR.ORGANIZATOR_ID
  AND concat(WYDARZENIE_DANE.DATA_STOP_REJESTRACJA,' ',WYDARZENIE_DANE.CZAS_STOP_REJESTRACJA) >= NOW()
  AND ORGANIZATOR.LOGIN = '" . $login . "'ORDER BY WYDARZENIE_DANE.DATA_START, WYDARZENIE_DANE.CZAS_START;";

  $result2 = $conn->query($sql2);
  $obArray = array();

  while($row = $result2->fetch_assoc()) {
    $rowArr["eventName"] = $row["NAZWA"];
    $rowArr["eventId"] = $row["WYDARZENIE_ID"];
    $rowArr["dateStop"] = $row["DATA_STOP"];
    $rowArr["timeStop"] = $row["CZAS_STOP"];
    array_push($obArray, $rowArr);
  }

  echo json_encode($obArray);
}
else {
  echo "false";
}

$conn->close();

?>
