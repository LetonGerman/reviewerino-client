<template>
    <v-container
            fluid
            fill-height
    >
        <v-layout
                wrap
                align-center
                justify-center
        >
            <v-flex
                    xs12
                    sm8
                    md6
            >
                {{ chosenId }}
                <div class="d-flex justify-end align-end">
                    <v-spacer></v-spacer>
                    <v-img
                            style="max-width: 144px"
                            contain
                            class=""
                            :src="require('../../public/powered_by_google_on_white.png')"
                            height="30"
                    ></v-img>
                </div>
                <v-autocomplete
                        v-model="model"
                        :items="items"
                        :loading="isLoading"
                        :search-input.sync="search"
                        hide-no-data
                        hide-selected
                        item-text="Description"
                        item-value="API"
                        label="Restaurants of Saint-Petersburg"
                        placeholder="Start typing the name"
                        prepend-icon="mdi-food"
                        return-object
                        filled
                        tile
                >
                </v-autocomplete>
                <v-expand-transition>
                    <v-list tile v-if="model" class="blue lighten-3 pb-0">
                        <v-list-item
                                v-for="(field, i) in fields"
                                :key="i"
                        >
                            <v-list-item-content>
                                <v-list-item-title v-text="field.value"></v-list-item-title>
                                <v-list-item-subtitle v-text="field.key"></v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                        <v-btn
                                tile
                                block
                                depressed
                                v-if="model"
                                class="grey lighten-2"
                                :to="'/review/' + model.place_id"
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
          if(key === 'description' || key === 'tags') {
            return {
              key,
              value: this.model[key] || 'n/a',
            };
          }
        }).filter(obj => {
          return obj != undefined;
        });
      },
      items() {
        return this.entries.filter(entry => {
          return (entry.types.includes('restaurant') || entry.types.includes('food'))
        }).map(entry => {
          // const Description = entry.description.length > this.descriptionLimit
          //     ? entry.description.slice(0, this.descriptionLimit) + '...'
          //     : entry.description;
          // eslint-disable-next-line no-console
            console.log(entry);
            return {
              description: entry.description,
              Description: entry.terms[0].value + ", " + entry.terms[1].value,
              id: entry.id,
              place_id: entry.place_id,
              reference: entry.reference,
              tags: entry.types.join(', ').replace(/_/g, " ")
            }
          // eslint-disable-next-line no-console
          // console.log(Object.assign({}, entry, {Description}));
          // return Object.assign({}, entry, {Description});
        });
      },
    },

    watch: {
      // eslint-disable-next-line no-unused-vars
      search(val) {
        // eslint-disable-next-line no-console
        console.log(this.search);
        // Items have already been loaded
        //if (this.items.length > 0) return;

        // Items have already been requested
        if (this.isLoading) return;

        this.isLoading = true;

        // Lazily load input items
        axios
            .get('http://localhost:3000/find/?latitude=' + this.location.coords.latitude + '&longitude=' + this.location.coords.longitude + '&input=' + this.search).then(res => {
              const entries = res.data.predictions;
              this.entries = entries;
          // eslint-disable-next-line no-console
              console.log(entries);
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
      // get position
      navigator.geolocation.getCurrentPosition(pos => {
        this.gettingLocation = false;
        this.location = pos;
        axios
            .get('http://localhost:3000/find/?latitude=' + this.location.coords.latitude + '&longitude=' + this.location.coords.longitude + '&input=a')
            .then(response => {
              this.info = response.data.predictions;
          // eslint-disable-next-line no-console
              console.log(this.info);
            });
        // eslint-disable-next-line no-console
        console.log(this.location);
      }, err => {
        this.gettingLocation = false;
        this.errorStr = err.message;
      });
    },
  };
</script>
