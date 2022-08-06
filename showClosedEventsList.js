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
  created() {
    let self = this;
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
      if(this.responseText == "false") {
        console.log("Sesja wygasła");
      }
      else {
        self.list = JSON.parse(this.responseText);
        for(let item in self.list) {
          self.list[item].dateStart = self.list[item].dateStart.split('-').reverse().join('-');
        }
      }
    }
    xhttp.open("GET", "getClosedEventsList.php?q=" + window.sessionStorage.getItem("token"), true);
    xhttp.send();
  },
  template:`
    <h2>Zamknięte rejestracje</h2>
    <div v-for="item in list">
      <div class="event">
      <div class="title">
        {{item.name}}
        </div><br>
        Rozpoczęcie: {{item.dateStart}} {{item.timeStart}}<br><br>
        <listElement
          :eventId="item.eventId"
          :eventName="item.eventName"
          :dateStop="item.dateStop"
          :timeStop="item.timeStop">
        </listElement>
      </div>
      <br>
    </div>
    {{err}}
  `

}
