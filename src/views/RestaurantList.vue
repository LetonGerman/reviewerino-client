<template>
    <div>
        <v-container class="outerCont">
            <v-row cols="11">
                <v-col cols="3">
                    <v-container>
                        <p class="display-1">
                            Filters
                        </p>
                        <v-card
                        flat
                        tile>
                            <v-card
                                    class="mb-3"
                            >
                                <v-card-title class="blue pb-1 pt-1 justify-center align-center"> Minimal Rating</v-card-title>

                                <v-slider
                                        class="pt-9 pb-0 pl-3 pr-3"
                                        :min="stars[0]"
                                        :max="stars[1]"
                                        step="0.5"
                                        ticks="always"
                                        thumb-label="always"
                                        v-model="filters.starsRange"
                                >
                                </v-slider>

                            </v-card>
                            <v-card
                                    class="mb-3"
                                    v-if="!isLoading"
                            >
                                <v-card-title class="blue pb-1 pt-1 justify-center align-center">Pricing</v-card-title>

                                <v-range-slider
                                        class="pt-9 pb-0 pl-3 pr-3"
                                        v-model="filters.pricingRange"
                                        :max="billRange[1]"
                                        :min="billRange[0]"
                                        :step="1"
                                        thumb-label="always"
                                >
                                </v-range-slider>
                                <v-row>
                                    <v-col cols="6">
                                        <v-text-field
                                                prefix="₽"
                                                v-model="filters.pricingRange[0]"
                                                class="mt-0 pt-0 pl-5 justify-start"
                                                hide-details
                                                single-line
                                                outlined
                                                rounded
                                                type="number"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field
                                                prefix="₽"
                                                v-model="filters.pricingRange[1]"
                                                class="mt-0 pt-0 pb-6 pr-5 pr-2 justify-end"
                                                hide-details
                                                single-line
                                                outlined
                                                rounded
                                                type="number"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <v-card
                                    class="mb-3"
                                    v-if="isLoading"
                            >
                                <v-card-title class="blue pb-1 pt-1 justify-center align-center">Pricing</v-card-title>

                                <v-range-slider
                                        class="pt-9 pb-0 pl-3 pr-3"
                                >
                                </v-range-slider>
                                <v-row>
                                    <v-col cols="6">
                                        <v-text-field
                                                prefix="₽"
                                                class="mt-0 pt-0 pl-5 justify-start"
                                                hide-details
                                                single-line
                                                outlined
                                                rounded
                                                type="number"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field
                                                prefix="₽"
                                                class="mt-0 pt-0 pb-6 pr-5 pr-2 justify-end"
                                                hide-details
                                                single-line
                                                outlined
                                                rounded
                                                type="number"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <v-card

                                    class="mb-3"
                            >
                                <v-card-title class="blue pb-1 pt-1 justify-center align-center">Tags</v-card-title>

                                <v-card-text>
                                    <v-chip-group
                                            multiple
                                            column
                                            active-class="primary--text"
                                            class="pt-5 pb-0"
                                            v-model="filters.chosenTags"
                                    >
                                        <v-chip filter v-for="tag in tags" :key="tag">
                                            {{ tag }}
                                        </v-chip>
                                    </v-chip-group>
                                </v-card-text>

                            </v-card>
                        </v-card>
                    </v-container>
                </v-col>
                <v-col cols="8">
                    <v-container class="innerCont">
                        <p class="display-1" align="center">
                            Restaurants in Saint-Petersburg
                        </p>
                        <v-flex>
                            <v-text-field
                                    v-model="filters.search"
                                    label="Search"
                                    append-icon="search"
                                    class="pt-2"
                            ></v-text-field>
                        </v-flex>
                        <div v-if="!isLoading">
                            <v-card
                                    v-for="(restaurant, i) in filteredRestaurants"
                                    :key="i"
                                    :to="'/restaurant/' + restaurant.place_id"
                                    flat
                                    tile
                                    class="mb-3"
                            >
                                <v-card-title>{{restaurant.name}}</v-card-title>
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
                                </v-card-text>
                                <v-btn
                                        block
                                        depressed
                                        class="grey lighten-1"
                                        :to="'/review/' + i"
                                >
                                    Review this restaurant
                                </v-btn>
                            </v-card>
                        </div>
                    </v-container>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'RestaurantList',
    data: () => ({
      descriptionLimit: 60,
      range: [0, 12000],
      stars: [0, 5],
      filters: {
        pricingRange: [],
        starsRange: 0,
        chosenTags: [],
        search: ''
      },
      infoDescriptor: {
        address: 'Address',
        owner: 'Owner',
        averagechk: 'Average bill',
      },
      restaurants: [{
        place_id: '',
        name: '',
        formatted_address: '',
        average_rating: 0,
        average_check: 0,
        checks: [],
        ratings: [],
        tags: [],
        votes: null
      }],
      companyTypes: ['Couple', 'Family', 'Friends', 'Solo'],
      mealTypes: ['Breakfast', 'Lunch', 'Dinner'],
      tags: ['Lodging', 'Cafe', 'Restaurant', 'Bar', 'Night Club'],
      isLoading: true,
      model: null,
      restaurantSearch: '',
    }),
    computed: {
      filteredRestaurants() {
        if (this.filters.chosenTags.length > 0) {
          return this.restaurants.filter((res) => {
            return res.name.toLowerCase().match(this.filters.search.toLowerCase())
          }).filter((res) => {
            return this.filters.chosenTags.some(r => res.tags.indexOf(this.tags[r]) >= 0)
          }).filter((res) => {
            return ((res.average_check >= this.filters.pricingRange[0]) && (res.average_check <= this.filters.pricingRange[1]))
          }).filter((res) => {
            return res.average_rating >= this.filters.starsRange;
          })
        } else {
          return this.restaurants.filter((res) => {
            return res.name.toLowerCase().match(this.filters.search.toLowerCase())
          }).filter((res) => {
            // eslint-disable-next-line no-console
            // console.log(res.averageBill);
            // eslint-disable-next-line no-console
            // console.log(this.filters.pricingRange[0] + ' ' + this.filters.pricingRange[1])
            return ((res.average_check >= this.filters.pricingRange[0]) && (res.average_check <= this.filters.pricingRange[1]))
          }).filter((res) => {
            return res.average_rating >= this.filters.starsRange;
          })
        }
      },
      billRange() {
        let min = Math.min.apply(Math, this.restaurants.map(function(o) { return o.average_check; }));
        let max = Math.max.apply(Math, this.restaurants.map(function(o) { return o.average_check; }));
        return [min, max];
      }
    },
    watch: {

    },
    created() {
      axios
      .get('http://localhost:3000/restaurant/')
      .then(res => {
        this.restaurants = res.data.data;
        // eslint-disable-next-line no-console
        console.log(this.restaurants);
        let tempTags = [];
        if(this.restaurants.length > 0) {
          for (let restaurant in this.restaurants) {
            for (let tag in restaurant.tags) {
              // eslint-disable-next-line no-console
              tempTags.indexOf(tag) === -1 ? tempTags.push(tag) : console.log("This item already exists");
            }
          }
          // this.tags = tempTags;
          // eslint-disable-next-line no-console
          console.log(tempTags);
        }
        this.isLoading = false;
      });

      this.filters.pricingRange = this.range;
    },
    updated() {
      // eslint-disable-next-line no-console
      // console.log(this.filters.chosenTags);
    }
  };
</script>

<style scoped>
.outerCont {
    padding: 20px 5% 0 15%;
}
</style>
