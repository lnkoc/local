import adminPassChange from './adminPassChange.js'
export default {
  components: {
    adminPassChange
  },
  data() {
    return {
      name: "",
      surname: "",
      email: "",
      organisation: "",
      phone: "",

      nameWarning: "",
      surnameWarning: "",
      emailWarning: "",
      phoneWarning: "",

      disabledForm: true,
      openEditPassword: false,
      err: "",
    }
  },
  created() {
    let self = this;
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
      if(this.responseText == "false") {
        console.log("Sesja wygasła");
      }
      else {
        let data = JSON.parse(this.responseText);
        self.name = data.name;
        self.surname = data.surname;
        self.email = data.email;
        self.organisation = data.organisation;
        self.phone = data.phone;
      }
    }
    xhttp.open("GET", "getAdminDetails.php?q=" + window.sessionStorage.getItem("token"), true);
    xhttp.send();

  },
  methods: {
    editForm(){
      this.disabledForm = false;
    },
    sendForm() {
      if(!(this.nameWarning || this.surnameWarning || this.emailWarning )){
        let updatedData = { token: window.sessionStorage.getItem("token"),
                            name: this.name,
                            surname: this.surname,
                            email: this.email,
                            phone: this.phone,
                            organisation: this.organisation
                            }
        let obJson = JSON.stringify(updatedData);
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if(this.readyState == 4) {
            if(this.status == 200) {
              console.log(this.responseText);
            }
          }
        };
       xhttp.open("POST", "updateAdminData.php", true);
       xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
       xhttp.send(obJson);
       this.disabledForm = true;
      }
      else {
        console.log("Nie można uaktualnić danych. Błędne dane.");
      }
    },
    editPassword() {
      this.openEditPassword = true;
    },
    closeEditPassword() {
      this.openEditPassword = false;
    }
  },
  watch: {
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
    <h2>Moje konto</h2>
    <form>
      <fieldset>
        Imię*:<br>
        <input class="input" v-model="name" maxlength="20" id="name" :disabled="disabledForm"> <label for="name">{{nameWarning}}</label>
        <br>
        Nazwisko*:<br>
        <input class="input" v-model="surname" maxlength="25" id="surname" :disabled="disabledForm"> <label for="surname">{{surnameWarning}}</label>
        <br>
        e-mail*:<br>
        <input class="input" v-model="email" maxlength="254" id="email" :disabled="disabledForm"> <label for="email">{{emailWarning}}</label>
        <br>
        Telefon:<br>
        <input class="input" v-model="phone" maxlength="15" id="phone" :disabled="disabledForm"> <label for="phone">{{phoneWarning}}</label>
        <br>
        Aeroklub/Organizacja:<br>
        <textarea class="input" v-model="organisation" maxlength="255" id="org" :disabled="disabledForm"></textarea> <label for="org" v-if="!disabledForm">Pozostało znaków: {{255 - organisation.length}}</label>
        <br>
        * Pola obowiązkowe<br>
        <button class="inputAdminButton" v-if="disabledForm" @click.prevent="editForm">Edytuj dane</button>
        <button class="inputAdminButton" v-if="!disabledForm" @click.prevent="sendForm">Zatwierdź</button>
      </fieldset>

    </form>
    <br>
    <button class="inputAdminButton" v-if="!openEditPassword" @click.prevent="editPassword">Zmiana hasła</button>
    <button class="inputAdminButton" v-if="openEditPassword" @click.prevent="closeEditPassword">Zamknij formularz zmiany hasła</button>
    <div v-if="openEditPassword">
      <adminPassChange></adminPassChange>
    </div>
    {{err}}
  `
}
