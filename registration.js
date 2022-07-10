export default {
  data() {
    return {
      nick: "",
      pass: "",
      pass2: "",
      name: "",
      surname: "",
      email: "",
      type: "",
      organisation: "",
      licence: "",
      phone: "",
    }
  },
  watch: {
    //TODO dopisać walidację elementów
    // stworzyć formę i nadpisać wysyłanie przyciskiem
    // uzupełnić szablon
    // wysyłanie formy na serwer

    }
  },
  template: `
    Nazwa użytkownika: <input v-model="nick"><br>

    Hasło: <input v-model="pass"><br>
    Powtórz hasło: <input v-model="pass2"><br>

    Typ konta:
  <br>
    Imię: <input v-model="name"><br>
    Nazwisko: <input v-model="surname"><br>
    e-mail: <input v-model="email"><br>
    Aeroklub/Organizacja/Stoważyszenie: <input v-model="organisation"><br>
    Numer licencji: <input v-model="licence"><br>
    telefon: <input v-model="phone"><br>
  `
}
