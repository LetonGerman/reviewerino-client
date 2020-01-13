<template>
    <div>
        <v-container fluid class="_cont">
            <v-card
                    flat
                    tile>
                <v-list>
                    <v-list-item>
                        <v-list-item-content>
                                <v-list-item-title
                                        class="display-2 mb-1"
                                        align="center"
                                >
                                    {{ restaurant.name }}
                                </v-list-item-title>
                                <v-list-item-subtitle
                                        v-for="(value, name, i) in restaurant.info"
                                        :key="i"
                                        class="subtitle-1"
                                        align="center"
                                >
                                    {{ value }}
                                </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>
            <v-divider></v-divider>
            <v-card
                flat
                tile
            >
                <v-overlay absolute="true" opacity="0">
                    <v-progress-circular indeterminate size="64" color="blue"></v-progress-circular>
                </v-overlay>
                <v-skeleton-loader
                        ref="skeleton"
                        :boilerplate="false"
                        type="table-heading, card"
                        :tile="true"
                        class="mx-auto pl-4 pr-4"
                >
                </v-skeleton-loader>
                <v-divider></v-divider>
            </v-card>
            <v-card
                    v-for="(review, i) in reviews"
                    :key="i"
                    flat
                    tile>
                <v-row cols="12" class="pb-0 mb-0">
                    <v-col lg="3">
                        <v-card-subtitle class="subtitle-1 pb-0">
                            Reviewed by {{review.name}}
                        </v-card-subtitle>
                    </v-col>
                    <v-col lg="4">
                        <v-chip
                                label
                                tile
                                class="mt-3 mr-4"
                        >
                            {{ companyTypes[review.companyType] }}
                        </v-chip>
                        <v-chip
                                label
                                class="mt-3 mr-4"
                        >
                            {{ mealTypes[review.mealType] }}
                        </v-chip>
                        <v-chip
                                label
                                class="mt-3"
                        >
                            ₽{{ review.check }}
                        </v-chip>
                    </v-col>
                    <v-col lg="5">
                        <v-rating
                                :value="review.rating"
                                class="pl-4"
                                background-color="grey darken-2"
                                half-increments
                                size="36"
                                readonly
                        ></v-rating>
                    </v-col>
                </v-row>
                    <v-card-title class="headline">
                        {{ review.reviewDescription }}
                    </v-card-title>
                <v-card-text class="pb-0">
                    <v-textarea
                            class=""
                            auto-grow
                            filled
                            single-line
                            readonly
                            solo
                            placeholder="Your thoughts..."
                            :value="review.reviewText"
                    >
                    </v-textarea>
                </v-card-text>
                <v-card-text class="pt-0">
                    <b>Reviewed</b> {{review.date}}
                </v-card-text>
                <v-divider></v-divider>
            </v-card>
        </v-container>
    </div>
</template>

<script>
  export default {
    name: 'ViewReview',
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
          owner: 'queen poki',
          averagechk: '$50',

        },
      },
      reviews: [
        {
        name: 'Vasya',
        rating: 3,
        reviewDescription: 'Dinner superb and supreme',
        reviewText: 'I was told this relatively new restaurant was really good, so decided to try it out for a family birthday celebration and it did not disappoint. The menu is extensive, as is the wine list and enormous selection of cocktails and special drinks. The place is light and airy both from natural large window lighting, as well as being well lit when dusk or dark. The staff are well trained and efficient and courteious. The service from the kitchen is perhaps a little slow, but well worth the wait... but if you are in a hurry... be sure to see if they can meet your time limits before you dine. The vast menu with a true Georgian influence is outstanding and caters for every whim and fancy and the quality is good. The presentation also excellent... perhaps a touch on the \'designer\' side, but that is the case with most dining in good restaurants these days. From cold and hot starters and soups, to fish dishes, a bonanza of main courses witha smaller selection of desserts to die for... you\'ll enjoy the experience of one of Pushkin\'s finest, without doubt and will not come away disappointed or feeling cheated... as the prices are extremely reasonable and realistic... so on a value for money scale, it definitely ranks highly. Give MZE a chance to show you what they can do and you\'ll come away extremely satisfied. If you know your way around the town... you can walk back to the Cathedral and town centre quite easily... if you have a car... there is adequate on street parking at all times as the restaurant is situated on one of Pushkin\'s major roads/avenues.',
        companyType: 1,
        mealType: 2,
        check: 1488,
        date: '12.01.2020',
        },
        {
          name: 'Vasya',
          rating: 3,
          reviewDescription: 'Dinner superb and supreme',
          reviewText: 'I was told this relatively new restaurant was really good, so decided to try it out for a family birthday celebration and it did not disappoint. The menu is extensive, as is the wine list and enormous selection of cocktails and special drinks. The place is light and airy both from natural large window lighting, as well as being well lit when dusk or dark. The staff are well trained and efficient and courteious. The service from the kitchen is perhaps a little slow, but well worth the wait... but if you are in a hurry... be sure to see if they can meet your time limits before you dine. The vast menu with a true Georgian influence is outstanding and caters for every whim and fancy and the quality is good. The presentation also excellent... perhaps a touch on the \'designer\' side, but that is the case with most dining in good restaurants these days. From cold and hot starters and soups, to fish dishes, a bonanza of main courses witha smaller selection of desserts to die for... you\'ll enjoy the experience of one of Pushkin\'s finest, without doubt and will not come away disappointed or feeling cheated... as the prices are extremely reasonable and realistic... so on a value for money scale, it definitely ranks highly. Give MZE a chance to show you what they can do and you\'ll come away extremely satisfied. If you know your way around the town... you can walk back to the Cathedral and town centre quite easily... if you have a car... there is adequate on street parking at all times as the restaurant is situated on one of Pushkin\'s major roads/avenues.',
          companyType: 1,
          mealType: 2,
          check: 1488,
          date: '12.01.2020',
        },
        {
          name: 'Vasya',
          rating: 3,
          reviewDescription: 'Dinner superb and supreme',
          reviewText: 'I was told this relatively new restaurant was really good, so decided to try it out for a family birthday celebration and it did not disappoint. The menu is extensive, as is the wine list and enormous selection of cocktails and special drinks. The place is light and airy both from natural large window lighting, as well as being well lit when dusk or dark. The staff are well trained and efficient and courteious. The service from the kitchen is perhaps a little slow, but well worth the wait... but if you are in a hurry... be sure to see if they can meet your time limits before you dine. The vast menu with a true Georgian influence is outstanding and caters for every whim and fancy and the quality is good. The presentation also excellent... perhaps a touch on the \'designer\' side, but that is the case with most dining in good restaurants these days. From cold and hot starters and soups, to fish dishes, a bonanza of main courses witha smaller selection of desserts to die for... you\'ll enjoy the experience of one of Pushkin\'s finest, without doubt and will not come away disappointed or feeling cheated... as the prices are extremely reasonable and realistic... so on a value for money scale, it definitely ranks highly. Give MZE a chance to show you what they can do and you\'ll come away extremely satisfied. If you know your way around the town... you can walk back to the Cathedral and town centre quite easily... if you have a car... there is adequate on street parking at all times as the restaurant is situated on one of Pushkin\'s major roads/avenues.',
          companyType: 1,
          mealType: 2,
          check: 1488,
          date: '12.01.2020',
        },
        {
          name: 'Vasya',
          rating: 3,
          reviewDescription: 'Dinner superb and supreme',
          reviewText: 'I was told this relatively new restaurant was really good, so decided to try it out for a family birthday celebration and it did not disappoint. The menu is extensive, as is the wine list and enormous selection of cocktails and special drinks. The place is light and airy both from natural large window lighting, as well as being well lit when dusk or dark. The staff are well trained and efficient and courteious. The service from the kitchen is perhaps a little slow, but well worth the wait... but if you are in a hurry... be sure to see if they can meet your time limits before you dine. The vast menu with a true Georgian influence is outstanding and caters for every whim and fancy and the quality is good. The presentation also excellent... perhaps a touch on the \'designer\' side, but that is the case with most dining in good restaurants these days. From cold and hot starters and soups, to fish dishes, a bonanza of main courses witha smaller selection of desserts to die for... you\'ll enjoy the experience of one of Pushkin\'s finest, without doubt and will not come away disappointed or feeling cheated... as the prices are extremely reasonable and realistic... so on a value for money scale, it definitely ranks highly. Give MZE a chance to show you what they can do and you\'ll come away extremely satisfied. If you know your way around the town... you can walk back to the Cathedral and town centre quite easily... if you have a car... there is adequate on street parking at all times as the restaurant is situated on one of Pushkin\'s major roads/avenues.',
          companyType: 1,
          mealType: 2,
          check: 1488,
          date: '12.01.2020',
        },
        {
          name: 'Vasya',
          rating: 3,
          reviewDescription: 'Dinner superb and supreme',
          reviewText: 'I was told this relatively new restaurant was really good, so decided to try it out for a family birthday celebration and it did not disappoint. The menu is extensive, as is the wine list and enormous selection of cocktails and special drinks. The place is light and airy both from natural large window lighting, as well as being well lit when dusk or dark. The staff are well trained and efficient and courteious. The service from the kitchen is perhaps a little slow, but well worth the wait... but if you are in a hurry... be sure to see if they can meet your time limits before you dine. The vast menu with a true Georgian influence is outstanding and caters for every whim and fancy and the quality is good. The presentation also excellent... perhaps a touch on the \'designer\' side, but that is the case with most dining in good restaurants these days. From cold and hot starters and soups, to fish dishes, a bonanza of main courses witha smaller selection of desserts to die for... you\'ll enjoy the experience of one of Pushkin\'s finest, without doubt and will not come away disappointed or feeling cheated... as the prices are extremely reasonable and realistic... so on a value for money scale, it definitely ranks highly. Give MZE a chance to show you what they can do and you\'ll come away extremely satisfied. If you know your way around the town... you can walk back to the Cathedral and town centre quite easily... if you have a car... there is adequate on street parking at all times as the restaurant is situated on one of Pushkin\'s major roads/avenues.',
          companyType: 1,
          mealType: 2,
          check: 1488,
          date: '12.01.2020',
        },
        {
          name: 'Vasya',
          rating: 3,
          reviewDescription: 'Dinner superb and supreme',
          reviewText: 'I was told this relatively new restaurant was really good, so decided to try it out for a family birthday celebration and it did not disappoint. The menu is extensive, as is the wine list and enormous selection of cocktails and special drinks. The place is light and airy both from natural large window lighting, as well as being well lit when dusk or dark. The staff are well trained and efficient and courteious. The service from the kitchen is perhaps a little slow, but well worth the wait... but if you are in a hurry... be sure to see if they can meet your time limits before you dine. The vast menu with a true Georgian influence is outstanding and caters for every whim and fancy and the quality is good. The presentation also excellent... perhaps a touch on the \'designer\' side, but that is the case with most dining in good restaurants these days. From cold and hot starters and soups, to fish dishes, a bonanza of main courses witha smaller selection of desserts to die for... you\'ll enjoy the experience of one of Pushkin\'s finest, without doubt and will not come away disappointed or feeling cheated... as the prices are extremely reasonable and realistic... so on a value for money scale, it definitely ranks highly. Give MZE a chance to show you what they can do and you\'ll come away extremely satisfied. If you know your way around the town... you can walk back to the Cathedral and town centre quite easily... if you have a car... there is adequate on street parking at all times as the restaurant is situated on one of Pushkin\'s major roads/avenues.',
          companyType: 1,
          mealType: 2,
          check: 1488,
          date: '12.01.2020',
        },

      ],
      infoDescriptor: {
        address: 'Address',
        owner: 'Owner',
        averagechk: 'Average bill',
      },
      companyTypes: ['Couple', 'Family', 'Friends', 'Solo'],
      mealTypes: ['Breakfast', 'Lunch', 'Dinner'],
      confirmMessage: "                                I certify that this review is based on my own experience and is my genuine opinion of\n" +
          "                                this restaurant, and that I have no personal or business relationship with this\n" +
          "                                establishment, and have not been offered any incentive or payment originating from the\n" +
          "                                establishment to write this review. I will not post multiple reviews unless my opinion\n" +
          "                                changes over time.",
      isLoading: false,
      model: null,
      search: null,
    }),
  };
</script>

<style scoped>
    ._cont {
        padding: 0 30%;
    }

</style>
