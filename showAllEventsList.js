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
  created() {
    console.log("Lista dostępnych wydarzeń");
    const xhttp = new XMLHttpRequest();
    let self = this;
    xhttp.onload = function () {
      if(this.responseText == "false") {
        console.log("Sesja wygasła");
      }
      else {
        self.list = JSON.parse(this.responseText);
        for(let item in self.list) {
          self.list[item].dateStart = self.list[item].dateStart.split('-').reverse().join('-');
          self.list[item].dateStopRegistration = self.list[item].dateStopRegistration.split('-').reverse().join('-');
        }
  //      self.err = JSON.parse(this.responseText);
  //      console.log(this.responseText);
      }
    }
    xhttp.open("GET", "showAllEventsList.php?q=" + window.sessionStorage.getItem("token"), true);
    xhttp.send();

  },
  template:`
  <div class="eventList">
  <h2>Aktualne wydarzenia</h2><br>
    <div >
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
      >
      </eventListElement>
    </div>
  </div>
  {{err}}
  `
}
