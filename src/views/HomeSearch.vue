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
                ></v-autocomplete>
                <v-expand-transition>
                    <v-list v-if="model" class="blue lighten-3">
                        <v-list-item
                                v-for="(field, i) in fields"
                                :key="i"
                        >
                            <v-list-item-content>
                                <v-list-item-title v-text="field.value"></v-list-item-title>
                                <v-list-item-subtitle v-text="field.key"></v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-expand-transition>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',

    data: () => ({
      descriptionLimit: 60,
      entries: [],
      isLoading: false,
      model: null,
      search: null,
      location: null,
      gettingLocation: false,
      errorStr: null,
    }),

    computed: {
      fields() {
        if (!this.model) return [];

        return Object.keys(this.model).map(key => {
          return {
            key,
            value: this.model[key] || 'n/a',
          };
        });
      },
      items() {
        return this.entries.map(entry => {
          const Description = entry.Description.length > this.descriptionLimit
              ? entry.Description.slice(0, this.descriptionLimit) + '...'
              : entry.Description;

          return Object.assign({}, entry, {Description});
        });
      },
    },

    watch: {
      // eslint-disable-next-line no-unused-vars
      search(val) {
        // Items have already been loaded
        if (this.items.length > 0) return;

        // Items have already been requested
        if (this.isLoading) return;

        this.isLoading = true;

        // Lazily load input items
        fetch('https://api.publicapis.org/entries').then(res => res.json()).then(res => {
          const {count, entries} = res;
          this.count = count;
          this.entries = entries;
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
      }, err => {
        this.gettingLocation = false;
        this.errorStr = err.message;
      });
    },
  };
</script>
