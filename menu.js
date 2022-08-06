import addEvent from './addEvent.js'
import showEventsList from './showEventsList.js'
import showClosedEventsList from './showClosedEventsList.js'
import showMyAccount from './showMyAccount.js'

export default {
  components: {
    addEvent,
    showEventsList,
    showClosedEventsList,
    showMyAccount
  },
  data() {
    return {
      currentMenuItem: "showEventsList",
      addEventForm: false
    }
  },
  emits:['logout'],
  methods: {
    addEvent() {
      this.addEventForm = true;
      this.currentMenuItem = "addEvent";
    },
    showList() {
      this.addEventForm = false;
      this.currentMenuItem = "showEventsList";
    },
    showClosedList() {
      this.addEventForm = false;
      this.currentMenuItem = "showClosedEventsList";
    },
    myAccount() {
      this.addEventForm = false;
      this.currentMenuItem = "showMyAccount";
    },
    logOut() {
      this.addEventForm = false;
      window.sessionStorage.clear();
      this.$emit("logout");
    },

  },

  template:`
    <div class="menuAdminItems">
      <button @click="addEvent">Dodaj wydarzenie</button>
      <button @click="showList">Otwarte rejestracje</button>
      <button @click="showClosedList">Zamknięte rejestracje</button>
      <button @click="myAccount">Moje konto</button>
      <button @click="logOut">Wyloguj</button>
    </div>
    <div class="main">
      <addEvent v-if="addEventForm" @eventCreated="showList"></addEvent>
      <component :is="currentMenuItem"></component>
    </div>
  `
}
