<template>
    <div>
        <v-container class="innerCont">
            <p class="display-1" align="center">
                {{ restaurants[0].name }}
            </p>
            <v-card
                    v-for="(restaurant, i) in restaurants"
                    :key="i"
                    flat
                    tile
                    class="mb-3"
            >
                <v-card-title>{{restaurant.name}}</v-card-title>

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
                </v-card-text>

            </v-card>
        </v-container>
    </div>
</template>

<script>
  export default {
    name: 'ReviewList',
    data: () => ({
      restaurants: [{
        name: 'Cafe Baldilico',
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
        averageBill: 777,
        tags: ['Polish', 'Restaurant'],
        description: 'Whatever again.'
      }]
    })
  };
</script>

<style scoped>

</style>
