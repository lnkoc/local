<?php
$json = file_get_contents('php://input');
$data = json_decode($json);

$servername = "localhost";
$username = "lnkoc";
$password = "lnkoc";
$dbname = "sozdb";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
  die("Brak połączenia z bazą danych " . $conn->connect_error);
}

$sql = "SELECT LOGIN, TOKEN FROM SESJA;";
$result = $conn->query($sql);

$logged = false;
while ($row = $result->fetch_assoc()) {
   if (!strcmp($row["TOKEN"], $data->token)) {
     $logged = true;
     $user = $row["LOGIN"];
    }
}

if ($logged) {
  //rejestruj wydarzenie
    $sql2 = "SELECT ORGANIZATOR_ID FROM ORGANIZATOR
    WHERE LOGIN = '" . $user . "';";

    $resultId = $conn->query($sql2);
    $userId = $resultId->fetch_assoc();

    $sql3 = "INSERT INTO WYDARZENIE_DANE(NAZWA, MIEJSCE, INFO, DATA_START, TIME_START, DATA_STOP_REGISTRATION, TIME_STOP_REGISTRATION, ORGANIZATOR_ID)
      VALUES ('"
        . $data->eventName . "','"
        . $data->place . "','"
        . $data->description . "', '"
        . $data->dateStart . "', '"
        . $data->timeStart . "', '"
        . $data->dateStopRegistration . "', '"
        . $data->timeStopRegistration . "', '"
        . $userId["ORGANIZATOR_ID"] . "');";

    $conn->query($sql3);

    $sql4 = "SELECT WYDARZENIE_ID FROM WYDARZENIE_DANE
    WHERE ORGANIZATOR_ID = '" . $userId["ORGANIZATOR_ID"] . "' ORDER BY WYDARZENIE_ID DESC LIMIT 1;";

    $resultEventId = $conn->query($sql4);
    $eventId = $resultEventId->fetch_assoc();

    foreach ($data->selectedCats as $key) {

      $sql5 = "SELECT KLASA_ID FROM KLASA WHERE NAZWA = '" . $key . "';";

      $resultClassId = $conn->query($sql5);
      $classId = $resultClassId->fetch_assoc();

      $sql6 = "INSERT INTO WYDARZENIE_KLASA (WYDARZENIE_ID, KLASA_ID)
      VALUES ('" . $eventId["WYDARZENIE_ID"] . "', '" . $classId["KLASA_ID"] . "');";

      $conn->query($sql6);
    }
    echo "Wydarzenie dodane pomyślnie";
}
else {
  echo "false";
}
$conn->close();

?>
