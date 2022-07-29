export default {
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


      disabled: true,
      err: "",
    }
  },
  mounted() {
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
        self.phone = data.phone

        self.err = this.responseText;
      }
    }
    xhttp.open("GET", "getAdminDetails.php?q=" + window.sessionStorage.getItem("token"), true);
    xhttp.send();

  },
  methods: {
    editForm(){
      this.disabled = false;
    },
    sendForm() {

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
      <fieldset :disabled="disabled">
        Imię*:<br>
        <input v-model="name" maxlength="20" id="name" > <label for="name">{{nameWarning}}</label>
        <br>
        Nazwisko*:<br>
        <input v-model="surname" maxlength="25" id="surname"> <label for="surname">{{surnameWarning}}</label>
        <br>
        e-mail*:<br>
        <input v-model="email" maxlength="254" id="email"> <label for="email">{{emailWarning}}</label>
        <br>
        Telefon:<br>
        <input v-model="phone" maxlength="15" id="phone"> <label for="phone">{{phoneWarning}}</label>
        <br>
        Aeroklub/Organizacja:<br>
        <textarea v-model="organisation" maxlength="255" id="org"></textarea> <label for="org" v-if="!disabled">Pozostało znaków: {{255 - organisation.length}}</label>
        <br>
      </fieldset>
      <button v-if="disabled" @click.prevent="editForm">Edytuj dane</button>
      <button v-if="!disabled" @click.prevent="sendForm">Zatwierdź</button>
    </form>
    <br>
    * Pola obowiązkowe<br>
    {{err}}
  `
}
