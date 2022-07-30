<?php
$q = $_REQUEST["q"];
$pass = $_REQUEST["pass"];
$newPass = $_REQUEST["newpass"];

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
    $login = $row["LOGIN"];
    $logged = true;
  }
}
if($logged) {
    $sql2 = "SELECT HASLO FROM ORGANIZATOR WHERE LOGIN = '" . $login . "';";
    $result2 = $conn->query($sql2);
    $passDb = $result2->fetch_assoc();

    if(!strcmp($passDb["HASLO"], $pass)) {
      $sql3 = "UPDATE ORGANIZATOR SET HASLO = '" . $newPass. "' WHERE ORGANIZATOR.LOGIN = '" . $login . "';";
      $conn->query($sql3);
    }
    else {
      echo "passIncorrect";
    }
}
else {
  echo "false";
}
$conn->close();

?>
