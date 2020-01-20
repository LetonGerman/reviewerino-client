<template>
    <v-container
            fill-height
            fluid
    >
        <v-layout
                align-center
                justify-center
                wrap
        >
            <v-flex
                    md6
                    sm8
                    xs12
            >
                {{ chosenId }}
                <div class="d-flex justify-end align-end">
                    <v-spacer></v-spacer>
                    <v-img
                            :src="require('../../public/powered_by_google_on_white.png')"
                            class=""
                            contain
                            height="30"
                            style="max-width: 144px"
                    ></v-img>
                </div>
                <v-autocomplete
                        :items="items"
                        :loading="isLoading"
                        :search-input.sync="search"
                        filled
                        hide-no-data
                        hide-selected
                        item-text="Description"
                        item-value="API"
                        label="Restaurants of Saint-Petersburg"
                        placeholder="Start typing the name"
                        prepend-icon="mdi-food"
                        return-object
                        tile
                        v-model="model"
                >
                </v-autocomplete>
                <v-expand-transition>
                    <v-list class="blue lighten-3 pb-0" tile v-if="model">
                        <v-list-item
                                :key="i"
                                v-for="(field, i) in fields"
                        >
                            <v-list-item-content>
                                <v-list-item-title v-text="field.value"></v-list-item-title>
                                <v-list-item-subtitle v-text="field.key"></v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item
                        >
                            <v-list-item-title v-text="'Tags'"></v-list-item-title>
                        </v-list-item>
                        <v-list-item
                        >
                                    <v-chip :key="tag" label v-for="tag in tags" class="mt-0 mr-2 mb-2">
                                        {{ tag }}
                                    </v-chip>
                        </v-list-item>
                        <v-btn
                                :to="'/review/' + model.place_id"
                                block
                                class="grey lighten-2"
                                depressed
                                tile
                                v-if="model"
                        >
                            Review this restaurant
                        </v-btn>
                    </v-list>
                </v-expand-transition>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'HelloWorld',

    data: () => ({
      descriptionLimit: 65,
      entries: [],
      isLoading: false,
      model: null,
      search: null,
      location: null,
      gettingLocation: false,
      errorStr: null,
      info: null,
      chosenId: null,
    }),

    computed: {
      fields() {
        if (!this.model) return [];
        return Object.keys(this.model).map(key => {
          if (key === 'description') {
            return {
              key,
              value: this.model[key] || 'n/a',
            };
          }
        }).filter(obj => {
          return obj !== undefined;
        });
      },
      items() {
        return this.entries.filter(entry => {
          return (entry.types.includes('restaurant') || entry.types.includes('food'));
        }).map(entry => {
          return {
            description: entry.description,
            Description: entry.terms[0].value + ', ' + entry.terms[1].value,
            id: entry.id,
            place_id: entry.place_id,
            reference: entry.reference,
            tags: entry.types.join(', ').replace(/_/g, ' '),
          };
        });
      },
      tags() {
        return this.model['tags'].replace(/_/g, ' ').split(', ');
      },
    },

    watch: {
      // eslint-disable-next-line no-unused-vars
      search(val) {
        if (this.isLoading) return;

        this.isLoading = true;

        axios.get('http://localhost:3000/find/?latitude=' + this.location.coords.latitude + '&longitude=' +
            this.location.coords.longitude + '&input=' + this.search).then(res => {
          this.entries = res.data.predictions;
        }).catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
        }).finally(() => (this.isLoading = false));
      },
    },
    created() {

      if (!('geolocation' in navigator)) {
        this.errorStr = 'Geolocation is not available.';
        return;
      }

      this.gettingLocation = true;
      navigator.geolocation.getCurrentPosition(pos => {
        this.gettingLocation = false;
        this.location = pos;
        axios.get('http://localhost:3000/find/?latitude=' + this.location.coords.latitude + '&longitude=' +
            this.location.coords.longitude + '&input=a').then(response => {
          this.info = response.data.predictions;
        });
      }, err => {
        this.gettingLocation = false;
        this.errorStr = err.message;
      });
    },
  };
</script>
