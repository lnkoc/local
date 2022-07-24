CREATE DATABASE sozdb;
CREATE USER 'lnkoc'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON `sozdb`.* TO 'lnkoc'@'localhost';
FLUSH PRIVILEGES;
USE sozdb;
CREATE TABLE ORGANIZATOR(
  ORGANIZATOR_ID INT(11) NOT NULL AUTO_INCREMENT,
  LOGIN VARCHAR(20) NOT NULL,
  HASLO VARCHAR(20) NOT NULL,
  IMIE VARCHAR(20) NOT NULL,
  NAZWISKO VARCHAR(25) NOT NULL,
  EMAIL VARCHAR(255) NOT NULL,
  ORGANIZACJA VARCHAR(255),
  TELEFON VARCHAR(15),
  CONSTRAINT organizator_pk PRIMARY KEY (ORGANIZATOR_ID)
);
CREATE TABLE SESJA(
  SESJA_ID INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  LOGIN VARCHAR(20) NOT NULL,
  TOKEN VARCHAR(30) NOT NULL,
  DATA_UTWORZENIA DATE NOT NULL
);
CREATE TABLE KLASA(
  KLASA_ID INT(5) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  NAZWA VARCHAR(20) NOT NULL
);
INSERT INTO KLASA (NAZWA) VALUES ('F1A'), ('F1B'), ('F1C');

CREATE TABLE WYDARZENIE_DANE(
  WYDARZENIE_ID INT(12) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  NAZWA VARCHAR(500) NOT NULL,
  MIEJSCE VARCHAR(500) NOT NULL,
  INFO VARCHAR(500),
  DATA_START DATE NOT NULL,
  TIME_START TIME NOT NULL,
  DATA_STOP_REGISTRATION DATE NOT NULL,
  TIME_STOP_REGISTRATION TIME NOT NULL,
  ORGANIZATOR_ID INT(11) NOT NULL,
  CONSTRAINT organizator_fk FOREIGN KEY (ORGANIZATOR_ID) REFERENCES ORGANIZATOR(ORGANIZATOR_ID)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);
CREATE TABLE WYDARZENIE_KLASA(
  WYDARZENIE_KLASA_ID INT(12) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  WYDARZENIE_ID INT(12) NOT NULL,
  KLASA_ID INT(5) NOT NULL,
  CONSTRAINT wydarzenie_id_fk FOREIGN KEY (WYDARZENIE_ID) REFERENCES WYDARZENIE_DANE(WYDARZENIE_ID)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  CONSTRAINT klasa_id_fk FOREIGN KEY (KLASA_ID) REFERENCES KLASA(KLASA_ID)
  ON DELETE CASCADE
  ON UPDATE CASCADE
);
