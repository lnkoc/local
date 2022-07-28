export default {
  data(){
    return {
      participants: [],
      showElement: false,
      details: {},
      showDetails: false,
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
      xhttp.open("GET", "getEventParticipants.php?q=" + window.sessionStorage.getItem("token") + "&d=" + this.eventId, true);
      xhttp.send();
    },
    showEventDetails() {
      const xhttp = new XMLHttpRequest();
      let self = this;
      xhttp.onload = function () {
        if(this.responseText == "false") {
          console.log("Sesja wygasła");
        }
        else {
          self.details = JSON.parse(this.responseText);
          self.showDetails = true;
//          self.err = this.responseText;
        }
      }
      xhttp.open("GET", "getEventDetails.php?q=" + window.sessionStorage.getItem("token") + "&d=" + this.eventId, true);
      xhttp.send();
    },
    closeEvent() {
      this.showElement = false;
    },
    hideDetails() {
      this.showDetails = false;
    }
  },
  template:`
  <div>
    <div>
      {{eventName}} <br>

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
      <button v-if="showElement" @click="closeEvent">Zwiń</button>
      <button v-if="showElement && !showDetails" @click="showEventDetails">Pokaż szczegóły</button><br>
      <div v-if="showDetails">
        Miejse: {{details.place}}<br>
        Opis: {{details.description}}<br>
        Data i czas rozpoczęcia: {{details.dateStart}} {{details.timeStart}}<br>
        <button @click="hideDetails">Zamknij szczegóły</button>
      </div>
      {{err}}
    </div>
  </div>
  `
}
