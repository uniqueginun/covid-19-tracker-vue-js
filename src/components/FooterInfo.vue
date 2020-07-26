<template>
  <v-footer dark padless>
    <v-card flat tile class="indigo lighten-1 white--text text-center">
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon.icon"
          @click="redirect(icon.link)"
          class="mx-4 white--text"
          icon
        >
          <v-icon size="24px">{{ icon.icon }}</v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">{{ aboutMe }}</v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} —
        <strong>Powered by Vue & Vuetify</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: [
      {
        icon: "mdi-facebook",
        link: "https://www.facebook.com/othman.mohammed.98434/"
      },
      {
        icon: "mdi-twitter",
        link: "https://twitter.com/oson70"
      },
      {
        icon: "mdi-linkedin",
        link: "https://www.linkedin.com/in/uniqueginun/"
      },
      {
        icon: "mdi-github",
        link: "https://github.com/uniqueginun"
      }
    ],
    aboutMe:
      "Hello, my name is othman mohammed. I am a Full Stack Web Developer experienced in php, javascript and php Laravel framework but recently i engaged in mobile development using react-native to build mobile apps and what I actually do include Design and implement web applications, prototypes, user interfaces, and websites for clients, Maintain and support existing systems and websites and realize it is just as important challenging as building new apps. Analyze a clients needs develop the appropriate functionality, while not overbuilding Implement tasks in accordance with schedule budget goals Engage in problem definition solution implementation according to client needs"
  }),
  methods: {
    redirect: function(url) {
      window.open(url, "_blank");
    }
  }
};
</script>
