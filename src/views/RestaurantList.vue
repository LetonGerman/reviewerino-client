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
                                    v-if="!isLoading"
                            >
                                <v-card-title class="blue pb-1 pt-1 justify-center align-center"> Minimal Rating
                                </v-card-title>

                                <v-slider
                                        :max="stars[1]"
                                        :min="stars[0]"
                                        class="pt-9 pb-0 pl-3 pr-3"
                                        step="0.5"
                                        thumb-label="always"
                                        ticks="always"
                                        v-model="filters.starsRange"
                                >
                                </v-slider>

                            </v-card>
                            <v-card
                                    class="mb-3"
                                    v-if="isLoading"
                            >
                                <v-card-title class="blue pb-1 pt-1 justify-center align-center"> Minimal Rating
                                </v-card-title>

                                <v-row align="center" justify="center">
                                    <v-progress-circular class="mt-2 mb-2" color="blue" indeterminate
                                                         size="64"></v-progress-circular>
                                </v-row>

                            </v-card>
                            <v-card
                                    class="mb-3"
                                    v-if="!isLoading"
                            >
                                <v-card-title class="blue pb-1 pt-1 justify-center align-center">Pricing</v-card-title>

                                <v-range-slider
                                        :max="billRange[1]"
                                        :min="billRange[0]"
                                        :step="1"
                                        class="pt-9 pb-0 pl-3 pr-3"
                                        thumb-label="always"
                                        v-model="filters.pricingRange"
                                >
                                </v-range-slider>
                                <v-row>
                                    <v-col cols="6">
                                        <v-text-field
                                                class="mt-0 pt-0 pl-5 justify-start"
                                                hide-details
                                                outlined
                                                prefix="₽"
                                                rounded
                                                single-line
                                                type="number"
                                                v-model="filters.pricingRange[0]"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-text-field
                                                class="mt-0 pt-0 pb-6 pr-5 pr-2 justify-end"
                                                hide-details
                                                outlined
                                                prefix="₽"
                                                rounded
                                                single-line
                                                type="number"
                                                v-model="filters.pricingRange[1]"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <v-card
                                    class="mb-3"
                                    v-if="isLoading"
                            >
                                <v-card-title class="blue pb-1 pt-1 justify-center align-center">Pricing</v-card-title>
                                <v-row align="center" justify="center">
                                    <v-progress-circular class="mt-2 mb-2" color="blue" indeterminate
                                                         size="64"></v-progress-circular>
                                </v-row>
                            </v-card>
                            <v-card
                                    class="mb-3"
                                    v-if="!isLoading"
                            >
                                <v-card-title class="blue pb-1 pt-1 justify-center align-center">Tags</v-card-title>

                                <v-card-text>
                                    <v-chip-group
                                            active-class="primary--text"
                                            class="pt-5 pb-0"
                                            column
                                            multiple
                                            v-model="filters.chosenTags"
                                    >
                                        <v-chip :key="tag" filter v-for="tag in tags">
                                            {{ tag }}
                                        </v-chip>
                                    </v-chip-group>
                                </v-card-text>

                            </v-card>
                            <v-card

                                    class="mb-3"
                                    v-if="isLoading"
                            >
                                <v-card-title class="blue pb-1 pt-1 justify-center align-center">Tags</v-card-title>

                                <v-row align="center" justify="center">
                                    <v-progress-circular class="mt-2 mb-2" color="blue" indeterminate
                                                         size="64"></v-progress-circular>
                                </v-row>

                            </v-card>
                        </v-card>
                    </v-container>
                </v-col>
                <v-col cols="8">
                    <v-container class="innerCont">
                        <p align="center" class="display-1">
                            Restaurants in Saint-Petersburg
                        </p>
                        <v-flex>
                            <v-text-field
                                    append-icon="search"
                                    class="pt-2"
                                    label="Search"
                                    v-model="filters.search"
                            ></v-text-field>
                        </v-flex>
                        <div v-if="!isLoading && !nothingToShow">
                            <v-card
                                    :key="i"
                                    :to="'/restaurant/' + restaurant.place_id"
                                    class="mb-3"
                                    flat
                                    tile
                                    v-for="(restaurant, i) in filteredRestaurants"
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

                                        <div class="grey--text ml-4">{{restaurant.average_rating}} ({{ restaurant.votes
                                            }})
                                        </div>
                                    </v-row>

                                    <div class="my-4 subtitle-1 black--text">
                                        ₽ {{restaurant.average_check}} • {{restaurant.tags.join(', ')}}
                                    </div>
                                </v-card-text>
                                <v-btn
                                        :to="'/review/' + i"
                                        block
                                        class="grey lighten-1"
                                        depressed
                                >
                                    Review this restaurant
                                </v-btn>
                            </v-card>
                        </div>
                        <div v-if="isLoading && !nothingToShow">
                            <v-row align="center" justify="center">
                                <v-progress-circular class="mt-2 mb-2" color="blue" indeterminate
                                                     size="64"></v-progress-circular>
                            </v-row>
                        </div>
                        <div style="min-height: 200px; position: relative; display: flex; justify-content: center"
                             v-if="nothingToShow">
                            <p class="display-2" style="position: absolute; top: 50%;">
                                No restaurants to show...
                            </p>
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
        search: '',
      },
      infoDescriptor: {
        address: 'Address',
        owner: 'Owner',
        averagechk: 'Average bill',
      },
      restaurants: [
        {
          place_id: '',
          name: '',
          formatted_address: '',
          average_rating: 0,
          average_check: 0,
          checks: [],
          ratings: [],
          tags: [],
          votes: null,
        }],
      companyTypes: ['Couple', 'Family', 'Friends', 'Solo'],
      mealTypes: ['Breakfast', 'Lunch', 'Dinner'],
      tags: ['Lodging', 'Cafe', 'Restaurant', 'Bar', 'Night Club'],
      isLoading: true,
      nothingToShow: false,
      model: null,
      restaurantSearch: '',
    }),
    computed: {
      filteredRestaurants() {
        if (this.filters.chosenTags.length > 0) {
          return this.restaurants.filter((res) => {
            return res.name.toLowerCase().match(this.filters.search.toLowerCase());
          }).filter((res) => {
            return this.filters.chosenTags.some(r => res.tags.indexOf(this.tags[r]) >= 0);
          }).filter((res) => {
            return ((res.average_check >= this.filters.pricingRange[0]) &&
                (res.average_check <= this.filters.pricingRange[1]));
          }).filter((res) => {
            return res.average_rating >= this.filters.starsRange;
          });
        } else {
          return this.restaurants.filter((res) => {
            return res.name.toLowerCase().match(this.filters.search.toLowerCase());
          }).filter((res) => {
            return ((res.average_check >= this.filters.pricingRange[0]) &&
                (res.average_check <= this.filters.pricingRange[1]));
          }).filter((res) => {
            return res.average_rating >= this.filters.starsRange;
          });
        }
      },
      billRange() {
        let min = Math.min(this.restaurants.map(o => o.average_check));
        let max = Math.max(this.restaurants.map(o => o.average_check));
        return [min, max];
      },
    },
    watch: {},
    created() {
      axios.get('http://localhost:3000/restaurant/').then(res => {
        this.restaurants = res.data.data;
        // eslint-disable-next-line no-console
        let tempTags = [];
        if (this.restaurants.length > 0) {
          this.restaurants.forEach((restaurant) => {
            restaurant.tags.forEach(tag => {
              tempTags.indexOf(tag) === -1 ? tempTags.push(tag) : -1;
            })
          })
          // eslint-disable-next-line no-console
          console.log(tempTags);
          if (tempTags.length > 0) {
            this.tags = tempTags;
          }
        }
        if (this.restaurants.length === 0) {
          this.nothingToShow = true;
        }
        this.isLoading = false;
      });

      this.filters.pricingRange = this.billRange;
    },
  };
</script>

<style scoped>
    .outerCont {
        padding: 20px 5% 0 10%;
    }
</style>
