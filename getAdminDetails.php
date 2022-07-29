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

$sql = "SELECT TOKEN, LOGIN FROM SESJA;";
$result = $conn->query($sql);
$logged = false;

while($row = $result->fetch_assoc()) {
  if(!strcmp($row["TOKEN"], $token)) {
    $logged = true;
    $login = $row["LOGIN"];
  }
}

if($logged) {
  $sql2 = "SELECT IMIE, NAZWISKO, EMAIL, ORGANIZACJA, TELEFON FROM ORGANIZATOR
  WHERE LOGIN = '" . $login . "';";
  $result2 = $conn->query($sql2);
  $row2 = $result2->fetch_assoc();

  $retOb["name"] = $row2["IMIE"];
  $retOb["surname"] = $row2["NAZWISKO"];
  $retOb["email"] = $row2["EMAIL"];
  $retOb["organisation"] = $row2["ORGANIZACJA"];
  $retOb["phone"] = $row2["TELEFON"];

  echo json_encode($retOb);
}
else {
  echo "false";
}

$conn->close();

?>
