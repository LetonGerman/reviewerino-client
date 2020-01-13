<template>
  <v-app>
    <v-app-bar
      app
      color="grey lighten-5"
      dark
    >
      <div class="d-flex align-center">
          <router-link :to="'/home'">
            <v-img
              alt="Reviewerino Logo"
              class="shrink mr-2"
              contain
              src="https://static.thenounproject.com/png/29338-200.png"
              transition="scale-transition"
              width="50"
            />
          </router-link>
        <router-link :to="'/home'">
          <v-img
            :src="require('../public/reviewerino.png')"
            alt="Reviewerino Name"
            class="shrink mt-2 hidden-sm-and-down"
            contain
            min-width="100"
            width="240"
          />
        </router-link>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        v-for="(link, i) in links"
        :key="i"
        :to="link.route"
        color="black"
        text
        x-large
        class="mr-2"
      >
        {{ link.name }}
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    links: [
      {name: 'Restaurants', route: '/restaurants'},
      {name: 'Top-10', route: '/top'}
    ]
  }),
};
</script>
