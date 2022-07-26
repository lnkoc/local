export default {
  data(){
    return {
      showElement: false,
      err: "blad"
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
          self.err = this.responseText;
        }
      }
      xhttp.open("GET", "getEventDetails.php?q=" + window.sessionStorage.getItem("token") + "&d=" + this.eventId, true);
      xhttp.send();
    }
  },
  template:`
  <div>
  {{eventName}} <br> Koniec rejestracji: {{dateStop}} {{timeStop}} <br>
  {{eventId}} | <button @click="openEvent">Otwórz</button><br>
  </div>
  <div v-if="showElement">
  {{err}}
  </div>
  `
}
