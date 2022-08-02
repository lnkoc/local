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
      <button class="eventButton" v-if="!showElement" @click="openEvent">Rowzwiń</button><br>
    </div>
    <div v-if="showElement">
      Lista zarejestrowanych zawodników:<br><br>
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
      <button class="eventButton" v-if="showElement" @click="closeEvent">Zamknij</button>
      <button class="eventButton" v-if="showElement && !showDetails" @click="showEventDetails">Szczegóły</button><br>
      <div v-if="showDetails"><br>
        Miejse: <br> {{details.place}}<br>
        Opis: <br> {{details.description}}<br>
        Data i czas rozpoczęcia: <br> {{details.dateStart}} {{details.timeStart}}<br><br>
        <button class="eventButton" @click="hideDetails">Zamknij szczegóły</button>
      </div>
      {{err}}
    </div>
  </div>
  `
}
