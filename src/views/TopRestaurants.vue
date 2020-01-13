<template>
    <div>
        <v-container class="outerCont">
            <p class="display-1" align="center">
                Top-10 restaurants in Saint-Petersburg
            </p>
            <v-card
                v-for="(restaurant, i) in sortPlaces(restaurants)"
                :key="i"
                flat
                tile
                class="mb-3"
            >
                <v-card-title>{{ i + 1 }}. {{restaurant.name}}</v-card-title>

                <v-card-text>
                    <v-row
                        align="center"
                        class="mx-0"
                    >
                        <v-rating
                                :value="restaurant.rating"
                                color="amber"
                                dense
                                half-increments
                                readonly
                                size="14"
                        ></v-rating>

                        <div class="grey--text ml-4">{{restaurant.rating}} ({{ restaurant.votes }})</div>
                    </v-row>

                    <div class="my-4 subtitle-1 black--text">
                        ₽ {{restaurant.averageBill}} • {{restaurant.tags.join(', ')}}
                    </div>

                    <div> {{restaurant.description}}</div>
                    <v-divider class="mx-4"></v-divider>
                    <p>Recent reviews:</p>
                </v-card-text>

            </v-card>
        </v-container>
    </div>
</template>

<script>
  export default {
    name: 'TopRestaurants',
    data: () => ({
      descriptionLimit: 60,
      infoDescriptor: {
        address: 'Address',
        owner: 'Owner',
        averagechk: 'Average bill',
      },
      restaurants: [{
        name: 'Cafe Badilico',
        rating: 4.5,
        votes: 413,
        averageBill: 300,
        tags: ['Italian', 'Cafe'],
        description: 'Small plates, salads & sandwiches an inteimate setting with 12 indoor seats plus patio seating.'
      }, {
        name: 'Il Milanese',
        rating: 5.0,
        votes: 666,
        averageBill: 760,
        tags: ['Italian', 'Pizza', 'Restaurant'],
        description: 'Whatever.'
      }, {
        name: 'teskno',
        rating: 3.5,
        votes: 666,
        averageBill: 760,
        tags: ['Polish', 'Restaurant'],
        description: 'Whatever again.'
      }],
      companyTypes: ['Couple', 'Family', 'Friends', 'Solo'],
      mealTypes: ['Breakfast', 'Lunch', 'Dinner'],
      isLoading: false,
      model: null,
      search: null,
    }),
    methods: {
      sortPlaces(places) {
        return places.slice().sort((a, b) => (a.rating < b.rating) ? 1 : -1)
      }
    },
  };
</script>

<style scoped>

    .outerCont{
        padding: 20px 20% 0 20%;
    }

</style>
