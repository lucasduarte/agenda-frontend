<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>mdi-calendar</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Calendário</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/evento">
          <v-list-item-action>
            <v-icon>mdi-calendar-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Eventos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/responsavel">
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Responsáveis</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/sala">
          <v-list-item-action>
            <v-icon>mdi-map-marker</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Salas</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Agenda</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2020</span>
    </v-footer>
  </v-app>
</template>
<script>
import Calendario from "./components/Calendario";

export default {
  name: "App",

  props: {
    source: String
  },

  components: {
    Calendario
  },

  data: () => ({
    drawer: null
  })
};
</script>
