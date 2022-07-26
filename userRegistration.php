<?php
// TODO
//zrzucić gdzieś obsługę błędów
$json = file_get_contents('php://input');
$data = json_decode($json);

$servername = "localhost";
$username = "lnkoc";
$password = "lnkoc";
$dbname = "sozdb";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Brak połączenia z bazą danych: ". $conn->connect_error);
};
echo "Połączono z bazą danych.<br>";

$sql = "INSERT INTO UZYTKOWNIK (LOGIN, HASLO, IMIE, NAZWISKO, ORGANIZACJA, LICENCJA)
VALUES ('"
  . $data->login . "', '"
  . $data->pass . "', '"
  . $data->name . "', '"
  . $data->surname . "', '"
  . $data->organisation . "', '"
  . $data->license . "
  ');";

if ($conn->query($sql) === TRUE) {
  echo "Poprawnie dodano użytkownika";
}
else {
  echo "Błąd dodawania użytkownika " . $conn->error;
}
$conn->close();

?>
