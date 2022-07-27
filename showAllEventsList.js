import eventListElement from  './eventListElement.js'
export default {
  components: {
    eventListElement
  },
  data() {
    return {
      list: [],
      err: ""
    }
  },
  mounted() {
    console.log("Lista dostępnych wydarzeń");
    const xhttp = new XMLHttpRequest();
    let self = this;
    xhttp.onload = function () {
      if(this.responseText == "false") {
        console.log("Sesja wygasła");
      }
      else {
        self.list = JSON.parse(this.responseText);
  //      self.err = JSON.parse(this.responseText);
  //      console.log(this.responseText);
      }
    }
    xhttp.open("GET", "showAllEventsList.php?q=" + window.sessionStorage.getItem("token"), true);
    xhttp.send();

  },
  template:`
  <h1>Aktualne wydarzenia</h1><br>
  <eventListElement v-for="item in list"
    :eventId = "item.eventId"
    :eventName = "item.eventName"
    :place = "item.place"
    :dateStart = "item.dateStart"
    :timeStart = "item.timeStart"
    :name = "item.name"
    :surname = "item.surname"
    :organisation = "item.organisation"
    :dateStopRegistration = "item.dateStopRegistration"
    :timeStopRegistration = "item.timeStopRegistration"

  ></eventListElement>
  {{err}}
  `
}
