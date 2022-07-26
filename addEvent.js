export default {
  data() {
    return {
      eventName: "",
      place: "",
      availableCats: [],
      selectedCats: [],
      description: "", // możliwy null
      dateStart: "",
      timeStart: "",
      dateStopRegistration: "",
      timeStopRegistration: "",
      err: "",

      nameWarning: "",
      placeWarning: "",
      selectedCatsWarning: "",
      descriptionWarning: ""
    }
  },
  methods: {
    addEvent() {

      if(this.eventName.legnth != 0 &&
        this.place.length != 0 &&
        this.dateStart.length != 0 &&
        this.timeStart.length != 0 &&
        this.dateStopRegistration != 0 &&
        this.timeStopRegistration != 0) {

        console.log(this.dateStart);
        console.log(this.timeStart);

        let data = {
          token: window.sessionStorage.getItem("token"),
          eventName: this.eventName,
          place: this.place,
          selectedCats: this.selectedCats,
          description: this.description,
          dateStart: this.dateStart,
          timeStart: this.timeStart,
          dateStopRegistration: this.dateStopRegistration,
          timeStopRegistration: this.timeStopRegistration
        };
        let obJson = JSON.stringify(data);
        let xhttp = new XMLHttpRequest();
        let self = this;
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {

              if (this.responseText == "false") {
                console.log("Sesja wygasła");
              }
              console.log(this.responseText);
              self.err =  this.responseText;
            }
          }
        }
        xhttp.open("POST", "addEvent.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(obJson);

        //TODO DOPISAĆ OBSŁUGĘ I PRZENIEŚĆ DO MOICH WYDARZEŃ
        this.$emit("eventCreated");
      }
      else {
        //TODO dpisać czego brakuje
        //TODO DOPISAĆ PRZYCISK ANULUJ
        console.log("rejestracja wstrzymana");
      }
    }

  },
  mounted() {
    let self = this;
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      if (this.responseText == "false") {
        console.log("Sesja wygasła.");
      }
      else {
        self.availableCats = JSON.parse(this.responseText);
        console.log(self.availableCats);
      }
    }
    xhttp.open("GET", "getCats.php?q=" + window.sessionStorage.getItem("token"), true);
    xhttp.send();
  },
  watch: {
    eventName(newName, oldName) {
      if(newName.length == 0) {
        this.nameWarning = "Wprowadź nazwę wydarzenia";
      }
      else {
        this.nameWarning = "Pozostało " + Number(300 - newName.length) + " znaków"
      }
    },
    place(newPlace, oldPlace) {
      if(newPlace.length == 0) {
        this.placeWarning = "Wprowadź miejsce wydarzenia";
      }
      else {
        this.placeWarning = "Pozostało " + Number(300 - newPlace.length) + " znaków";
      }
    },
    selectedCats(newSelectedCats, oldSelectedCats) {
      if(newSelectedCats.length == 0) {
        this.selectedCatsWarning = "Wybierz co najmniej jedną z kategorii";
      }
      else {
        this.selectedCatsWarning = "";
      }
      console.log(newSelectedCats);
    },
    description(newDescription, oldDescription) {
      this.descriptionWarning = "Pozostało " + Number(500 - newDescription.length) + " znaków";
    }
  },
  template:`
  <div>
    <form>
      <h2>Nazwa wydarzenia:</h2>
      <textarea v-model="eventName" maxlength="500"></textarea><br>
      {{nameWarning}}<br>

      <h2>Miejsce:</h2>
      <textarea v-model="place" maxlength="500"></textarea><br>
      {{placeWarning}}<br>

      <h2>Kategorie:</h2>
      <template v-for="item in availableCats">
        <input v-model="selectedCats" type="checkbox" :value="item" id="item">
        <label for id="item">{{item}}</label>
      </template>
      <br>
      {{selectedCatsWarning}}
      <br>

      <h2>Dodatkowe informacje:</h2>
      <textarea v-model="description" maxlength="500"></textarea><br>
      {{descriptionWarning}}<br>

      <h2>Data i godzina rozpoczęcia wydarzenia:</h2>
      <input v-model="dateStart" type="date"> <input v-model="timeStart" type="time"><br>

      <h2>Zakończenie rejestracji:</h2>
      <input v-model="dateStopRegistration" type="date"> <input v-model="timeStopRegistration" type="time"><br>
      <br>
      <input type="submit" @click.prevent="addEvent">
    </form>
    <br>
    {{err}}
  </div>
  `
}
