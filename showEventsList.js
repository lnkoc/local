import listElement from './listElement.js'

export default {
  components: {
    listElement
  },
  data() {
    return {
      list: []
    }
  },
  created() {
    let self = this;
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
      if (this.responseText == "false") {
        console.log("Sesja wygasła");
      }
      else {
          self.list = JSON.parse(this.responseText);
      }
    }
    xhttp.open("GET", "getEventsList.php?q=" + window.sessionStorage.getItem("token"), true);
    xhttp.send();

  },
  template: `
    <h2>Otwarte rejestracje</h2>
    <div v-for="item in list">
      <div class="event">
        <div class="title">{{item.eventName}}</div><br>
        Koniec rejestracji: {{item.dateStop}} {{item.timeStop}} <br><br>
        <listElement
          :eventId="item.eventId"
          :eventName="item.eventName"
          :dateStop="item.dateStop"
          :timeStop="item.timeStop">
        </listElement>
      </div>
      <br>
    </div>

  `
}
