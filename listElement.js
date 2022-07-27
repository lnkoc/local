export default {
  data(){
    return {
      participants: [],
      showElement: false,
      err: ""
    }
  },
  props: ['eventName', 'eventId', 'dateStop', 'timeStop'],
  methods: {
    openEvent() {
      this.showElement = true;
      const xhttp = new XMLHttpRequest();
      let self = this;
      xhttp.onload = function () {
        if (this.responseText == "false") {
          console.log("Sesja wygasła");
        }
        else {
          self.participants = JSON.parse(this.responseText);
        }
      }
      xhttp.open("GET", "getEventDetails.php?q=" + window.sessionStorage.getItem("token") + "&d=" + this.eventId, true);
      xhttp.send();
    },
    closeEvent() {
      this.showElement = false;
    }
  },
  template:`
  <div>
  {{eventName}} <br>
  Koniec rejestracji: {{dateStop}} {{timeStop}} <br>
  <button v-if="!showElement" @click="openEvent">Rozwiń</button><br>
  </div>
  <div v-if="showElement">
  Lista zarejestrowanych zawodników:
  <table>
    <tr>
      <th>Kategoria</th>
      <th>Imię</th>
      <th>Nazwisko</th>
      <th>Organizacja</th>
      <th>Licencja</th>
    </tr>
    <tr v-for="item in participants">
      <th>{{item.category}}</th>
      <th>{{item.name}}</th>
      <th>{{item.surname}}</th>
      <th>{{item.organisation}}</th>
      <th>{{item.license}}</th>
    </tr>
  </table><br>
  <button v-if="showElement" @click="closeEvent">Zwiń</button><br>
  {{err}}
  </div>
  `
}
