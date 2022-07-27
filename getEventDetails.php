<?php
$q = $_REQUEST["q"];
$eventId = $_REQUEST["d"];

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
if ($logged) {

  $sql2 = "SELECT KLASA.NAZWA, UZYTKOWNIK.IMIE, UZYTKOWNIK.NAZWISKO, UZYTKOWNIK.ORGANIZACJA, UZYTKOWNIK.LICENCJA
  FROM ORGANIZATOR, WYDARZENIE_DANE, WYDARZENIE_KLASA, KLASA, REJESTRACJA, UZYTKOWNIK
  WHERE ORGANIZATOR.LOGIN = '" . $login . "'
  AND WYDARZENIE_DANE.ORGANIZATOR_ID = ORGANIZATOR.ORGANIZATOR_ID
  AND WYDARZENIE_DANE.WYDARZENIE_ID = '" . $eventId . "'
  AND WYDARZENIE_DANE.WYDARZENIE_ID = WYDARZENIE_KLASA.WYDARZENIE_ID
  AND WYDARZENIE_KLASA.KLASA_ID = KLASA.KLASA_ID
  AND WYDARZENIE_KLASA.WYDARZENIE_KLASA_ID = REJESTRACJA.WYDARZENIE_KLASA_ID
  AND REJESTRACJA.UZYTKOWNIK_ID = UZYTKOWNIK.UZYTKOWNIK_ID
  ORDER BY KLASA.NAZWA;";

  $result2 = $conn->query($sql2);
  $resArr = array();
  while($row = $result2->fetch_assoc()) {
    $resRow["category"] = $row["NAZWA"];
    $resRow["name"] = $row["IMIE"];
    $resRow["surname"] = $row["NAZWISKO"];
    $resRow["organisation"] = $row["ORGANIZACJA"];
    $resRow["license"] = $row["LICENCJA"];
    array_push($resArr, $resRow);
  }


  echo json_encode($resArr);

  // echo "$sql2";
//TODO DOKOŃCZYĆ

}
else {
  echo "false";
}
$conn->close();
?>
