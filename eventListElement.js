import eventElementDetails from "./eventElementDetails.js"
export default {
  components: {
    eventElementDetails
  },
  data() {
    return {
      showDetails: false
    }
  },
  methods: {
    openEvent(){
      this.showDetails = true;
    },
    hideEvent() {
      this.showDetails = false;
    }
  },
  props: ["eventId", "eventName", "place", "dateStart", "timeStart", "name", "surname",
    "organisation", "dateStopRegistration", "timeStopRegistration"],
  template: `
    <div class="event">
      <div class="title">{{eventName}}</div><br>
      Miejsce: {{place}} Rozpoczęcie: {{dateStart}} {{timeStart}}<br>
      Koniec rejstracji: {{dateStopRegistration}} {{timeStopRegistration}}<br>
      Organizator: {{name}} {{surname}}, {{organisation}}<br><br>
      <button v-if="!showDetails" @click="openEvent">Rozwiń szczegóły</button>
      <eventElementDetails v-if="showDetails" :eventId="eventId"></eventElementDetails><br>
      <button v-if="showDetails" @click="hideEvent">Zwiń szczegóły</button>
    </div><br>
  `
}
