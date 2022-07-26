<?php
$q = $_REQUEST["q"];
$data = $_REQUEST["d"];

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
  $sql2 = "SELECT ORGANIZATOR.EMAIL, ORGANIZATOR.TELEFON, WYDARZENIE_DANE.INFO FROM ORGANIZATOR, WYDARZENIE_DANE
  WHERE WYDARZENIE_DANE.WYDARZENIE_ID = '" . $data . "'
  AND WYDARZENIE_DANE.ORGANIZATOR_ID = ORGANIZATOR.ORGANIZATOR_ID;";

  $result2 = $conn->query($sql2);
  $row2 = $result2->fetch_assoc();
  $resOb["email"] =  $row2["EMAIL"];
  $resOb["phone"] = $row2["TELEFON"];
  $resOb["info"] = $row2["INFO"];

  $sql3 = "SELECT KLASA.NAZWA FROM WYDARZENIE_KLASA, KLASA WHERE WYDARZENIE_KLASA.WYDARZENIE_ID = '" . $data ."'
  AND WYDARZENIE_KLASA.KLASA_ID = KLASA.KLASA_ID;";

  $allCats = array();
  $result3 = $conn->query($sql3);
  while($row = $result3->fetch_assoc()) {
    array_push($allCats, $row["NAZWA"]);
  }
  $resOb["categories"] = $allCats;

  $sql4 = "SELECT KLASA.NAZWA FROM WYDARZENIE_KLASA, KLASA, REJESTRACJA, UZYTKOWNIK
  WHERE UZYTKOWNIK.LOGIN = '" . $login . "' AND UZYTKOWNIK.UZYTKOWNIK_ID = REJESTRACJA.UZYTKOWNIK_ID
  AND WYDARZENIE_KLASA.WYDARZENIE_ID = '" . $data . "' AND REJESTRACJA.WYDARZENIE_KLASA_ID = WYDARZENIE_KLASA.WYDARZENIE_KLASA_ID
  AND WYDARZENIE_KLASA.KLASA_ID = KLASA.KLASA_ID;";

  $regCats = array();
  $result4 = $conn->query($sql4);
  while($row = $result4->fetch_assoc()) {
    array_push($regCats, $row["NAZWA"]);
  }
  $resOb["registired"] = $regCats;
  
  echo json_encode($resOb);
}
else {
  echo "false";
}

$conn->close();
?>
