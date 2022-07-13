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

      loginWarning: "Minimum 4 znaki",
      passWarning: "Minimum 5 znaków",
      pass2Warning: "Powtórz hasło",
      nameWarning: "Minimum 2 znaki",
      surnameWarning: "Minimum 2 znaki",
      emailWarning: "Podaj poprawny email",
      phoneWarning: "Cyfry",
    }
  },
  methods: {
    send(e){
      e.preventDefault();
      if (!(this.loginWarning ||
        this.passWarning ||
        this.pass2Warning ||
        this.nameWarning ||
        this.surnameWarning ||
        this.emailWarning)) {
          let data = {login: this.login,
                      pass: this.pass,
                      name: this.name,
                      surname: this.surname,
                      email: this.email,
                      organisation: this.organisation,
                      phone: this.phone};

          let obJson = JSON.stringify(data);
          let xhttp = new XMLHttpRequest();
          xhttp.open("POST", "registration.php", true);
          xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          xhttp.send(obJson);
        }
        else {
          //TODO
          console.log("popraw dane w formularzu");
        }
      }
    },

  watch: {
    login(newLogin, oldLogin) {
      if (newLogin.length < 4) {
        this.loginWarning = "Minimum 4 znaki";

      }
      else {
        const xhttp = new XMLHttpRequest();
        let self = this;
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {
              if (this.responseText == "true") {
                self.loginWarning = "Ta nazwa jest zajęta, wybierz inną";
              }
              else {
                 self.loginWarning = null;
              }
            }
          }
        }
        xhttp.open("GET", "checkLogin.php?q=" + newLogin, true);
        xhttp.send();
      }
    },
    pass(newPass, oldPass) {
      if (newPass.length < 5) {
        this.passWarning = "Minimum 5 znaków";
      }
      else {
        this.passWarning = null;
      }
    },
    pass2(newPass2, oldPass2) {
      if(newPass2.length == this.pass.length) {
        if(newPass2.valueOf() !== this.pass.valueOf()) {
          this.pass2Warning = "Wprowadzone hasła nie są identyczne";
        }
        else {
          this.pass2Warning = null;
        }
      }
      else {
        this.pass2Warning = "Powtórz hasło"
      }
    },
    name(newName, oldName) {
      if (newName.length < 2) {
        this.nameWarning = "Minimum 2 znaki";
      }
      else {
        this.nameWarning = null;
      }
    },
    surname(newSurname, oldSurame) {
      if (newSurname.length < 2) {
        this.surnameWarning = "Minimum 2 znaki";
      }
      else {
        this.surnameWarning = null;
      }
    },
    email(newEmail, oldEmail) {
      let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (re.test(newEmail)) {
        this.emailWarning = null;
      }
      else {
        this.emailWarning = "Podaj poprawny email";
      }
    },
    phone(newPhone, oldPhone) {
      let re = /^[0-9\+]{8,15}$/;
      if (re.test(newPhone)) {
        this.phoneWarning = null;
      }
      else {
        this.phoneWarning = "Cyfry"
      }
    }
  },
  template:`
  <div class="reg">
    <h1>Utwórz konto</h1>
    <form>
      Nazwa użytkownika*:<br>
      <input v-model="login" maxlength="20" > {{loginWarning}}<br><br>

      Hasło*:<br>
      <input v-model="pass" type="password" maxlength="20"> {{passWarning}}<br><br>

      Powtórz hasło*:<br>
      <input v-model="pass2" type="password" maxlength="20"> {{pass2Warning}}<br><br>

      Imię*:<br>
      <input v-model="name" maxlength="20"> {{nameWarning}}<br><br>

      Nazwisko*:<br>
      <input v-model="surname" maxlength="25"> {{surnameWarning}}<br><br>

      e-mail*:<br>
      <input v-model="email" maxlength="254"> {{emailWarning}}<br><br>

      Aeroklub/Organizacja<br>
      <textarea v-model="organisation" maxlength="255"></textarea> Pozostało znaków: {{255 - organisation.length}}<br><br>

      Telefon:<br>
      <input v-model="phone" maxlength="15"> {{phoneWarning}}<br>

      <br>
      * Pola obowiązkowe.<br><br>
      <input type="submit" @click="send">
    </form>
  </div>
  `
}
