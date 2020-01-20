<template>
    <div>
        <v-container class="outerCont">
            <p align="center" class="display-1">
                Top-10 restaurants in Saint-Petersburg
            </p>
            <div v-if="!isLoading">
                <v-card
                        :key="i"
                        :to="'/restaurant/' + restaurant.place_id"
                        class="mb-3"
                        flat
                        tile
                        v-for="(restaurant, i) in restaurants"
                >
                    <v-card-title>{{ i + 1 }}. {{restaurant.name}}</v-card-title>
                    <v-card-subtitle>{{restaurant.formatted_address}}</v-card-subtitle>

                    <v-card-text>
                        <v-row
                                align="center"
                                class="mx-0"
                        >
                            <v-rating
                                    :value="restaurant.average_rating"
                                    color="amber"
                                    dense
                                    half-increments
                                    readonly
                                    size="14"
                            ></v-rating>

                            <div class="grey--text ml-4">{{restaurant.average_rating}} ({{ restaurant.votes }})</div>
                        </v-row>

                        <div class="my-4 subtitle-1 black--text">
                            ₽ {{restaurant.average_check}} • {{restaurant.tags.join(', ')}}
                        </div>

                        <div> {{restaurant.description}}</div>
                    </v-card-text>

                </v-card>
            </div>
            <div v-if="isLoading && !nothingToShow">
                <v-row align="center" justify="center">
                    <v-progress-circular class="mt-2 mb-2" color="blue" indeterminate size="64"></v-progress-circular>
                </v-row>
            </div>
            <div style="min-height: 200px; position: relative; display: flex; justify-content: center"
                 v-if="nothingToShow">
                <p class="display-2" style="position: absolute; top: 50%;">
                    No restaurants to show...
                </p>
            </div>
        </v-container>
    </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'TopRestaurants',
    data: () => ({
      descriptionLimit: 60,
      infoDescriptor: {
        address: 'Address',
        owner: 'Owner',
        averagechk: 'Average bill',
      },
      restaurants: [],
      companyTypes: ['Couple', 'Family', 'Friends', 'Solo'],
      mealTypes: ['Breakfast', 'Lunch', 'Dinner'],
      isLoading: true,
      nothingToShow: false,
      model: null,
      search: null,
    }),
    created() {
      axios.get('http://localhost:3000/restaurant/top').then(res => {
        this.restaurants = res.data.data;
        this.isLoading = false;
        if (this.restaurants.length === 0) {
          this.nothingToShow = true;
        }
      });
    },
    methods: {},
  };
</script>

<style scoped>

    .outerCont {
        padding: 20px 20% 0 20%;
    }

</style>
