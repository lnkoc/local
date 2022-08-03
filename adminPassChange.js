export default {
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      newPassword2: "",
      oldPassWarning: "Minimum 5 znaków",
      newPassWarning: "Minimum 5 znaków",
      newPass2Warning: "Powtórz hasło",
      disabledForm: true
    }
  },
  methods: {
    confirm() {
      if(!(this.oldPassWarning || this.newPassWarning || this.newPass2Warning)) {
        let self = this;
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
          if(this.responseText == "false") {
            console.log("Sesja wygasła")
          }
          else {
            if(this.responseText == "passIncorrect") {
              self.oldPassWarning = "Niepoprawne hasło";
            }
          }
        }
        xhttp.open("GET", "adminPassChange.php?q=" + window.sessionStorage.getItem("token")
          + "&pass=" + this.oldPassword + "&newpass=" + this.newPassword, true);
        xhttp.send();
      }
      if(!(this.oldPassWarning || this.newPassWarning || this.newPass2Warning)) {
        this.disabledForm = true;
      }
    },
    editForm() {
      this.disabledForm = false;
    }
  },
  watch: {
    oldPassword(newPass, oldPass) {
      if(newPass.length < 5){
        this.oldPassWarning = "Minimum 5 znaków";
      }
      else {
        this.oldPassWarning = null;
      }
    },
    newPassword(newPass, oldPass) {
      if(newPass.length < 5) {
        this.newPassWarning = "Minimum 5 znaków";
      }
      else {
        this.newPassWarning = null;
      }
    },
    newPassword2(newPass2, oldPass2) {
      if(newPass2.length == this.newPassword.length) {
        if(newPass2.valueOf() !== this.newPassword.valueOf()) {
          this.newPass2Warning = "Wprowadzone hasła nie są identyczne";
        }
        else {
          this.newPass2Warning = null;
        }
      }
      else {
        this.newPass2Warning = "Powtórz hasło"
      }
    },
  },
  template:`
  <h2>Formularz zmiany hasła</h2>
  <form>
    <fieldset>
      Stare hasło*:<br>
      <input class="input" v-model="oldPassword" type="password" maxlength="20" id="oldPass" :disabled="disabledForm"> <label for="oldPass">{{oldPassWarning}}</label><br>
      Nowe hasło*:<br>
      <input class="input" v-model="newPassword" type="password" maxlength="20" id="newPass" :disabled="disabledForm"> <label for="newPass">{{newPassWarning}}</label><br>
      Powtórz nowe hasło*:<br>
      <input class="input" v-model="newPassword2" type="password" maxlength="20" id="newPass2" :disabled="disabledForm"> <label for="newPass2">{{newPass2Warning}}</label><br>
      * Pola obowiązkowe<br>
      <button class="inputAdminButton" v-if="disabledForm" @click.prevent="editForm">Edytuj</button>
      <button class="inputAdminButton" v-if="!disabledForm" @click.prevent="confirm">Zatwierdź</button>
    </fieldset>

  </form>
  `
}
