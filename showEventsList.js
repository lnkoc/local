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
  mounted() {
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
    <h2>Moje wydarzenia</h2>
    <listElement
      v-for="item in list"
      :eventId="item.eventId"
      :eventName="item.eventName"
      :dateStop="item.dateStop"
      :timeStop="item.timeStop">
    </listElement>
  `
}
