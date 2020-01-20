<template>
    <div>
        <v-container class="_cont" fluid>
            <v-card
                    flat
                    tile>
                <v-list>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title
                                    align="center"
                                    class="display-2 mb-1"
                            >
                                {{ restaurant.name }}
                            </v-list-item-title>
                            <v-list-item-subtitle
                                    :key="i"
                                    align="center"
                                    class="subtitle-1"
                                    v-for="(value, name, i) in restaurant.info"
                            >
                                {{ value }}
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>
            <v-divider></v-divider>
            <div v-if="isLoading && !nothingToShow">
                <v-card
                        :key="i+100"
                        flat
                        tile v-for="(skeleton, i) in 3"
                >
                    <v-overlay :absolute="true" opacity="0">
                        <v-progress-circular color="blue" indeterminate size="64"></v-progress-circular>
                    </v-overlay>
                    <v-skeleton-loader
                            :boilerplate="false"
                            :tile="true"
                            class="mx-auto pl-4 pr-4"
                            ref="skeleton"
                            type="table-heading, card"
                    >
                    </v-skeleton-loader>
                    <v-divider></v-divider>
                </v-card>
            </div>
            <div v-if="!isLoading">
                <v-card
                        :key="i"
                        flat
                        tile
                        v-for="(review, i) in reviews">
                    <v-row class="pb-0 mb-0" cols="12">
                        <v-col lg="3">
                            <v-card-subtitle class="subtitle-1 pb-0">
                                Reviewed by {{review.review.name}}
                            </v-card-subtitle>
                        </v-col>
                        <v-col lg="4">
                            <v-chip
                                    class="mt-3 mr-4"
                                    label
                                    tile
                            >
                                {{ review.review.companyType }}
                            </v-chip>
                            <v-chip
                                    class="mt-3 mr-4"
                                    label
                            >
                                {{ review.review.mealType }}
                            </v-chip>
                            <v-chip
                                    class="mt-3"
                                    label
                            >
                                ₽{{ review.review.check }}
                            </v-chip>
                        </v-col>
                        <v-col lg="5">
                            <v-rating
                                    :value="review.review.rating"
                                    background-color="grey darken-2"
                                    class="pl-4"
                                    half-increments
                                    readonly
                                    size="36"
                            ></v-rating>
                        </v-col>
                    </v-row>
                    <v-card-title class="headline">
                        {{ review.review.reviewDescription }}
                    </v-card-title>
                    <v-card-text class="pb-0">
                        <v-textarea
                                :value="review.review.reviewText"
                                auto-grow
                                class=""
                                filled
                                placeholder=""
                                readonly
                                single-line
                                solo
                        >
                        </v-textarea>
                    </v-card-text>
                    <v-card-text class="pt-0">
                        <b>Reviewed</b> {{review.created}}
                    </v-card-text>
                    <v-divider></v-divider>
                </v-card>
            </div>
            <div style="min-height: 200px; position: relative; display: flex; justify-content: center"
                 v-if="nothingToShow">
                <p class="display-2" style="position: absolute; top: 50%;">
                    No reviews to show...
                </p>
            </div>
        </v-container>
    </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'ViewReview',
    props: {
      placeid: {
        required: true,
      },
    },
    data: () => ({
      descriptionLimit: 60,
      name: 'Ivan',
      email: '',
      rating: 4.5,
      reviewDescription: 'Dinner superb and supreme',
      reviewText: 'I was told this relatively new restaurant was really good, so decided to try it out for a family birthday celebration and it did not disappoint. The menu is extensive, as is the wine list and enormous selection of cocktails and special drinks. The place is light and airy both from natural large window lighting, as well as being well lit when dusk or dark. The staff are well trained and efficient and courteious. The service from the kitchen is perhaps a little slow, but well worth the wait... but if you are in a hurry... be sure to see if they can meet your time limits before you dine. The vast menu with a true Georgian influence is outstanding and caters for every whim and fancy and the quality is good. The presentation also excellent... perhaps a touch on the \'designer\' side, but that is the case with most dining in good restaurants these days. From cold and hot starters and soups, to fish dishes, a bonanza of main courses witha smaller selection of desserts to die for... you\'ll enjoy the experience of one of Pushkin\'s finest, without doubt and will not come away disappointed or feeling cheated... as the prices are extremely reasonable and realistic... so on a value for money scale, it definitely ranks highly. Give MZE a chance to show you what they can do and you\'ll come away extremely satisfied. If you know your way around the town... you can walk back to the Cathedral and town centre quite easily... if you have a car... there is adequate on street parking at all times as the restaurant is situated on one of Pushkin\'s major roads/avenues.',
      companyType: 1,
      mealType: null,
      check: 1488,
      agreement: false,
      date: '12.01.2020',
      restaurant: {
        name: 'Il Milanese',
        info: {
          address: 'Yolo ave. 21',
        },
      },
      reviews: [],
      infoDescriptor: {
        address: 'Address',
        owner: 'Owner',
        averagechk: 'Average bill',
      },
      companyTypes: ['Couple', 'Family', 'Friends', 'Solo'],
      mealTypes: ['Breakfast', 'Lunch', 'Dinner'],
      confirmMessage: '                                I certify that this review is based on my own experience and is my genuine opinion of\n' +
          '                                this restaurant, and that I have no personal or business relationship with this\n' +
          '                                establishment, and have not been offered any incentive or payment originating from the\n' +
          '                                establishment to write this review. I will not post multiple reviews unless my opinion\n' +
          '                                changes over time.',
      isLoading: true,
      nothingToShow: false,
      model: null,
      search: null,
    }),
    created() {
      axios.get('http://localhost:3000/find/info/?placeid=' + this.placeid).then(response => {
        this.restaurant.name = response.data.result.name;
        this.restaurant.info.address = response.data.result.formatted_address;
      });

      axios.get('http://localhost:3000/review/' + this.placeid).then(res => {
        this.reviews = res.data.data;
        // eslint-disable-next-line no-console
        console.log(this.reviews);
        setTimeout(() => {
          this.isLoading = false;
          if (this.reviews.length === 0) {
            this.nothingToShow = true;
          }
        }, 1500);
      });
    },
  };
</script>

<style scoped>
    ._cont {
        padding: 0 30%;
    }

</style>
