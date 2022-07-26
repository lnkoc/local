export default {
  data() {
    return {
      info:"",
      categories: [],
      email: "",
      phone: false

    }
  },
  props: ["eventId"],
  mounted() {
    const xhttp = new XMLHttpRequest();
    let self = this;
    xhttp.onload = function () {
        let data = JSON.parse(this.responseText);
        self.info = data.info;
        self.phone = data.phone;
        self.email = data.email;
        self.categories = data.categories;
        console.log("Wydarzenie ID " + self.eventId);
    }
    xhttp.open("GET", "getEventElementDetails.php?q=" + window.sessionStorage.getItem("token") + "&d=" + this.eventId, true);
    xhttp.send();
  },
  template:`
    <div>
    {{eventId}}<br>
    e-mail: {{email}} <br>
      <div v-if="phone">Telefon: {{phone}}</div>
      Informacje: {{info}}<br>
      <button v-for="item in categories">{{item}}</button>
    </div>
  `
}
