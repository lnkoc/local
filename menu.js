export default {
  data() {
    return {
      showAddEventForm: false,
    }
  },
  emits:['logout'],
  methods: {
    addEvent() {
      this.showAddEventForm = true;
    },
    showList() {

    },
    myAccount() {

    },
    logOut() {
      window.sessionStorage.clear();
      this.$emit("logout");
    },
    created() {
      this.showAddEventForm = false;
    },
  },

  template:`
    <div class="menuItems">
      <button @click="addEvent">Dodaj wydarzenie</button>
      <button @click="showList">Moje wydarzenia</button>
      <button @click="myAccount">Moje konto</button>
      <button @click="logOut">Wyloguj</button>
    </div>
    <div class="main">
      <add-event v-if="showAddEventForm" @eventCreated="created"></add-event>
    </div>
  `
}
