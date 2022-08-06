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

  $sql3 = "SELECT KLASA.NAZWA FROM KLASA, WYDARZENIE_KLASA WHERE WYDARZENIE_KLASA.WYDARZENIE_ID = '". $eventId ."'
  AND WYDARZENIE_KLASA.KLASA_ID = KLASA.KLASA_ID;";

  $result3 = $conn->query($sql3);
  $resArr = array();
  while($row = $result3->fetch_assoc()) {

    $sql2 = "SELECT UZYTKOWNIK.IMIE, UZYTKOWNIK.NAZWISKO, UZYTKOWNIK.ORGANIZACJA, UZYTKOWNIK.LICENCJA
    FROM WYDARZENIE_KLASA, KLASA, REJESTRACJA, UZYTKOWNIK
    WHERE WYDARZENIE_KLASA.WYDARZENIE_ID = '" . $eventId . "'
    AND WYDARZENIE_KLASA.KLASA_ID = KLASA.KLASA_ID
    AND KLASA.NAZWA = '" . $row["NAZWA"] . "'
    AND WYDARZENIE_KLASA.WYDARZENIE_KLASA_ID = REJESTRACJA.WYDARZENIE_KLASA_ID
    AND REJESTRACJA.UZYTKOWNIK_ID = UZYTKOWNIK.UZYTKOWNIK_ID;";

    $resultUsers = $conn->query($sql2);
    $classArr = array();
    while($rowUser = $resultUsers->fetch_assoc()) {
        $resRow["name"] = $rowUser["IMIE"];
        $resRow["surname"] = $rowUser["NAZWISKO"];
        $resRow["organisation"] = $rowUser["ORGANIZACJA"];
        $resRow["license"] = $rowUser["LICENCJA"];
        array_push($classArr, $resRow);
    }
    $resClass["class"] = $row["NAZWA"];
    $resClass["users"] = $classArr;
    array_push($resArr, $resClass);
  }
  echo json_encode($resArr);

}
else {
  echo "false";
}
$conn->close();
?>
