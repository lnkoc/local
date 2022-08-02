export default {
  data() {
    return {
      info:"",
      categories: [],
      registired: [],
      email: "",
      phone: false,
      err: ""
    }
  },
  props: ["eventId"],
  methods: {
    register(item) {
      this.registired.push(item);
      let index = this.categories.indexOf(item);
      if (index > -1) {
        this.categories.splice(index, 1);
      }
      console.log("Zarejestrowano w " + this.registired);
      console.log("Dostępne kategorie " + this.categories);

      const xhttp = new XMLHttpRequest();
      xhttp.onload = function () {
        if(this.responseText == "false") {
          console.log("Sesja wygasła.");
        }
        console.log(this.responseText);
      }
      xhttp.open("GET", "userEventRegistration.php?q=" + window.sessionStorage.getItem("token") + "&d=" + this.eventId + "&c=" + item);
      xhttp.send();
    }
  },
  mounted() {
    const xhttp = new XMLHttpRequest();
    let self = this;
    xhttp.onload = function () {
      if(this.responseText == "false") {
        console.log("Sesja wygasła.");
      }
      else {
        let data = JSON.parse(this.responseText);
        self.info = data.info;
        self.phone = data.phone;
        self.email = data.email;
        self.categories = data.categories;
        self.registired = data.registired;

        for(let item of self.registired) {
          let index = self.categories.indexOf(item);
          if(index > -1) {
            self.categories.splice(index, 1);
          }
        }
      }
    }
    xhttp.open("GET", "getEventElementDetails.php?q=" + window.sessionStorage.getItem("token") + "&d=" + this.eventId, true);
    xhttp.send();
  },
  template:`
    <div>
    e-mail: {{email}} <br>
      <div v-if="phone">Telefon: {{phone}}</div>
      Informacje: <br>{{info}}<br><br>
      <div v-for="item in registired"> Zarejestrowano w kategorii {{item}}
      </div><br>
      <button class="eventButton" v-for="item in categories" v-on:click="register(item)">Zarejestruj w kategorii {{item}}</button>
    </div>
    {{err}}
  `
}
