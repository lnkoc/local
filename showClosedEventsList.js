import listElement from './listElement.js'
export default {
  components: {
    listElement
  },
  data() {
    return {
      list: [],
      err: ""
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
        self.list = JSON.parse(this.responseText);
    //    self.err = this.responseText;
      }
    }
    xhttp.open("GET", "getClosedEventsList.php?q=" + window.sessionStorage.getItem("token"), true);
    xhttp.send();
  },
  // methods: {
  //   // showParticipants() {
  //   //   this.showElement = true;
  //   //   const xhttp = new XMLHttpRequest();
  //   //   let self = this;
  //   //   xhttp.onload = function () {
  //   //     if (this.responseText == "false") {
  //   //       console.log("Sesja wygasła");
  //   //     }
  //   //     else {
  //   //       self.participants = JSON.parse(this.responseText);
  //   //     }
  //   //   }
  //   //   xhttp.open("GET", "getEventParticipants.php?q=" + window.sessionStorage.getItem("token") + "&d=" + this.eventId, true);
  //   //   xhttp.send();
  //   // },
  //   // deleteEvent(item) {
  //     // let self = this;
  //     // const xhttp = new XMLHttpRequest();
  //     // xhttp.open("GET", "deleteEvent.php?q=" + window.sessionStorage.getItem("token") + "&d=" + item.eventId, true);
  //     // xhttp.onload = function () {
  //     //   self.err = this.responseText;
  //     //   let index = self.list.indexOf(item);
  //     //   self.list.splice(index, 1);
  //     // }
  //     // xhttp.send();
  //   // }
  // },
  template:`
    <h2>Zamknięte rejestracje</h2>
    <div v-for="item in list">
      <div class="event">
        {{item.name}} <br>
        Rozpoczęcie: {{item.dateStart}} {{item.timeStart}}
        <listElement
          :eventId="item.eventId"
          :eventName="item.eventName"
          :dateStop="item.dateStop"
          :timeStop="item.timeStop">
        </listElement>
<!---      <button @click="deleteEvent(item)">Usuń wydarzenie</button> --->
      </div>
      <br>
    </div>
    {{err}}
  `

}
