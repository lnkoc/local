import adminReg from './adminRegistration.js'
import menuItems from './menu.js'

export default {
  components: {
    adminReg,
    menuItems
  },
  emits:['logout'],
  data() {
    return {
      login: "",
      password: "",
      loginHint: "",
      passHint: "",
      createAdmin: false,
      logged: false
    }
  },
  methods: {
    openRegistration() {
      this.createAdmin = true;
    },
    adminLogin() {
    //TODO haslo md5

      let self = this;
      const xhttp = new XMLHttpRequest();
      xhttp.onload = function() {
        let resp = JSON.parse(this.responseText);
        if (!resp.loginCheck) {
          self.loginHint = "Niepoprawny login";
        }
        else {
          self.loginHint = "";
          if (!resp.passCheck) {
            self.passHint = "Niepoprawne hasło";
          }
          else {
            self.passHint = "";
            window.sessionStorage.setItem("token", resp.token);
            window.sessionStorage.setItem("login", self.login);
            self.logged = true;
            self.login = "";
            self.password = "";
            console.log("A teraz dalszy ciąg programu...");
          }
        }
      }
      xhttp.open("GET", "login.php?login=" + this.login + "&pass=" + this.password, true);
      xhttp.send();
    },
    openRegistration() {
      window.sessionStorage.setItem("registration", "true");
      this.createAdmin = true;
    },
    returnToMain() {
      this.logged = false;
      this.$emit("logout");
    }

  },
  template:`
  <div v-if="!createAdmin && !logged" class="admin">
    <div>
      <h1>Logowanie</h1><br>
      Organizator:<br>
      <input v-model="login"> {{loginHint}}<br>
      Hasło:<br>
      <input v-model="password" type="password"> {{passHint}}<br><br>
      <button @click="adminLogin" >Zaloguj</button><br><br>
      <h1>Utwórz konto organizatora:</h1>
      <button @click="openRegistration">Rejestracja organizatora</button><br>
    </div>
  </div>
  <div v-if="createAdmin">
    <adminReg @created="createAdmin=false; logged=false"></adminReg>
  </div>
  <div v-if=logged>
    <menuItems @logout="returnToMain"></menuItems>
  </div>
  `
}
