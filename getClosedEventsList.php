<?php
$q = $_REQUEST["q"];

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
  if(!strcmp($row["TOKEN"], $q)) {
    $logged = true;
    $login = $row["LOGIN"];
  }
}
if($logged) {
  $sql2 = "SELECT WYDARZENIE_DANE.NAZWA, WYDARZENIE_DANE.WYDARZENIE_ID, WYDARZENIE_DANE.DATA_START,
    WYDARZENIE_DANE.CZAS_START FROM WYDARZENIE_DANE, ORGANIZATOR WHERE
    concat(WYDARZENIE_DANE.DATA_STOP_REJESTRACJA,' ',WYDARZENIE_DANE.CZAS_STOP_REJESTRACJA) < NOW()
    AND ORGANIZATOR.LOGIN = '". $login ."'
    AND WYDARZENIE_DANE.ORGANIZATOR_ID = ORGANIZATOR.ORGANIZATOR_ID
    ORDER BY WYDARZENIE_DANE.DATA_START, WYDARZENIE_DANE.CZAS_START;";
    $result2 = $conn->query($sql2);
    $retOb = array();
    while($row2 = $result2->fetch_assoc()) {
      $res["eventId"] = $row2["WYDARZENIE_ID"];
      $res["name"] = $row2["NAZWA"];
      $res["dateStart"] = $row2["DATA_START"];
      $res["timeStart"] = $row2["CZAS_START"];
      array_push($retOb, $res);
    }
    echo json_encode($retOb);
}
else {
  echo "false";
}
$conn->close();
?>
