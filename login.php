<?php
$login = $_REQUEST["login"];
$pass = $_REQUEST["pass"];

$servername = "localhost";
$username = "lnkoc";
$password = "lnkoc";
$dbname = "sozdb";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Brak połączenia z bazą danych ". $conn->connect_error);
}

$sql = "SELECT login, haslo FROM ORGANIZATOR;";
$result = $conn->query($sql);

$correctLogin = false;
$correctPass = false;

while ($row = $result->fetch_assoc()) {
  if (!strcmp($row["login"], $login)) {
    $correctLogin = true;
    if (!strcmp($row["haslo"], $pass)) {
      $correctPass = true;
    }
  }
}

$loginObj->loginCheck = $correctLogin;
$loginObj->passCheck = $correctPass;

if ($correctLogin && $correctPass) {
  $loginObj->token = $login . date("Y-m-d");
  $sql2 = "INSERT INTO SESJA (LOGIN, TOKEN, DATA_UTWORZENIA) VALUES ('" . $login . "', '" . $loginObj->token . "', '" . date("Y-m-d") . "');";
  $conn->query($sql2);
}
else {
  $loginObj->token = "";
  $sql2 = "";
}

$loginJson = json_encode($loginObj);
echo $loginJson;
$conn->close();
?>
