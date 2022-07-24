<?php
$token = $_REQUEST["q"];

$servername = "localhost";
$username = "lnkoc";
$password = "lnkoc";
$dbname = "sozdb";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("Błąd połączenia z bazą dancyh " . $conn->connect_error);
}

$sql = "SELECT TOKEN FROM SESJA;";
$result = $conn->query($sql);

$logged = false;
while ($row = $result->fetch_assoc()) {
  if (!strcmp($row["TOKEN"], $token)) {
    $logged = true;
  };
}

if ($logged) {
  $sql2 = "SELECT NAZWA FROM KLASA;";
  $result = $conn->query($sql2);

  $tab = [];
  while ($row = $result->fetch_assoc()) {
    $tab[] = $row["NAZWA"];
  }
  echo json_encode($tab);
}
else {
  echo "false";
}
$conn->close();
?>
