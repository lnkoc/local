export default {
  data(){
    return{
      login: "",
      pass: "",
      pass2: "",
      name: "",
      surname: "",
      email: "",
      organisation: "",
      phone: "",

      loginWarning: "",
    }
  },
  methods: {
    send(e){
      e.preventDefault();
    }
  },
  watch: {
    login(newLogin, oldLogin){
      if (newLogin.length <= 3) {
        this.loginWarning = "Za krótki login. Podaj minimum 3 znaki.";
      }
      else {
        const xhttp = new XMLHttpRequest();
        let self = this;
        xhttp.onload = function() {
          if (this.responseText == "true") {
            self.loginWarning = "Wybrana nazwa użytkownika już istnieje, wybierz inną.";
          }
      //    self.loginWarning = this.responseText;
        }
        xhttp.open("GET", "checkLogin.php?" + newLogin);
        xhttp.send();

      }
    },
  },
  template:`
  <h1>Utwórz konto</h1>
  <form>
    Nazwa użytkownika*:<br>
    <input v-model="login" maxlength="20"><br>{{loginWarning}}<br>

    Hasło*:<br>
    <input v-model="pass" type="password" maxlength="20"><br>

    Powtórz hasło*:<br>
    <input v-model="pass2" type="password" maxlength="20"><br>

    Imię*:<br>
    <input v-model="name" maxlength="20"><br>

    Nazwisko*:<br>
    <input v-model="surname" maxlength="25"><br>

    e-mail*:<br>
    <input v-model="email" maxlength="254"><br>

    Aeroklub/Organizacja<br>
    <textarea v-model="organisation" maxlength="255"></textarea><br>

    telefon:<br>
    <input v-model="phone" maxlength="15"><br>

    <br>
    <button @click="send">Wyślij</button>
  </form>
  `
}
