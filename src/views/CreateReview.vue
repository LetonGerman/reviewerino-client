<template>
    <div>
        <v-container class="_cont">
            <v-dialog max-width="350" persistent v-model="reviewSubmitted">
                <v-card>
                    <v-card-text class="justify-center text-center">Your response was submitted!</v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn :to="'/restaurant/' + this.placeid" @click="reviewSubmitted = false"
                               color="green darken-1"
                               text>
                            OK
                        </v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-card
                    flat
                    tile>
                <v-list>
                    <v-list-item>
                        <v-list-item-content class="justify-center text-center">
                            <p
                                    class="overline display-1"
                            >
                                You're writing a review for...
                            </p>
                            <v-card class="pl-1 pb-2" color="light" max-width="500px" outlined tile>
                                <v-list-item-title class="headline mb-1">
                                    <v-progress-circular
                                            color="blue"
                                            indeterminate size="24"
                                            v-if="updating.name"
                                    ></v-progress-circular>
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    <v-progress-circular
                                            color="blue"
                                            indeterminate size="24"
                                            v-if="updating.address"
                                    ></v-progress-circular>
                                </v-list-item-subtitle>
                                <v-list-item-title
                                        class="headline mb-1"
                                        v-if="!updating.address"
                                >
                                    {{ restaurant.name.toUpperCase() }}
                                </v-list-item-title>
                                <v-list-item-subtitle v-if="!updating.address">
                                    {{ restaurant.info.address }}
                                </v-list-item-subtitle>
                            </v-card>
                            <v-spacer></v-spacer>
                            <v-list-item-subtitle class="mt-2 font-weight-bold heading justify-center">
                                Your opinion is appreciated!
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>
            <v-divider></v-divider>
            <v-card
                    flat
                    tile>
                <form
                        @submit.prevent="validateReview"
                >
                    <v-card-title>
                        Your name
                    </v-card-title>
                    <v-text-field
                            :error-messages="nameErrors"
                            @blur="$v.name.$touch()"
                            @input="$v.name.$touch()"
                            @onpaste="$v.name.$touch()"
                            class="pl-4 pr-4"
                            dense
                            filled
                            outlined
                            placeholder="Ivan"
                            required
                            v-model="name"
                    >

                    </v-text-field>
                    <v-card-title>
                        Your email
                    </v-card-title>
                    <v-text-field
                            :error-messages="emailErrors"
                            @blur="$v.email.$touch()"
                            @input="$v.email.$touch()"
                            @onpaste="$v.email.$touch()"
                            class="pl-4 pr-4"
                            dense
                            filled
                            outlined
                            placeholder="example@mail.com"
                            required
                            v-model="email"
                    >

                    </v-text-field>
                    <v-card-title>
                        How would your rate this restaurant overall?
                    </v-card-title>
                    <v-rating
                            :error-messages="ratingErrors"
                            @blur="$v.rating.$touch()"
                            @change="$v.rating.$touch()"
                            background-color="grey darken-2"
                            class="pl-4 pr-4"
                            half-increments
                            hover
                            large
                            required
                            v-model="rating"
                    ></v-rating>
                    <p
                            class="red--text pl-4"
                            v-if="ratingErrors"
                    >
                        {{ ratingErrors[0] }}
                    </p>
                    <v-card-title>
                        Review description
                    </v-card-title>
                    <v-text-field
                            :error-messages="reviewDescriptionErrors"
                            @blur="$v.reviewDescription.$touch()"
                            @input="$v.reviewDescription.$touch()"
                            @onpaste="$v.reviewDescription.$touch()"
                            class="pl-4 pr-4"
                            dense
                            filled
                            outlined
                            placeholder="A happy ending in a nice restaurant"
                            required
                            v-model="reviewDescription"
                    >

                    </v-text-field>
                    <v-card-title>
                        Your review
                    </v-card-title>
                    <v-textarea
                            :error-messages="reviewTextErrors"
                            @blur="$v.reviewText.$touch()"
                            @input="$v.reviewText.$touch()"
                            @onpaste="$v.reviewText.$touch()"
                            auto-grow
                            class="pl-4 pr-4"
                            counter
                            dense
                            filled
                            outlined
                            placeholder="Your thoughts..."
                            requried
                            v-model="reviewText"
                    >
                    </v-textarea>
                    <v-card-title
                            class="pb-1">
                        Who did you visit with?
                    </v-card-title>
                    <v-row>
                        <v-col
                                cols="12"
                        >
                            <v-btn-toggle
                                    @blur="$v.companyType.$touch()"
                                    @change="$v.companyType.$touch()"
                                    borderless
                                    class="pl-4"
                                    color="blue accent-3"
                                    required
                                    tile
                                    v-model="companyType"
                            >
                                <v-btn
                                        :key="i"
                                        class="mr-3 grey lighten-2"
                                        v-for="(type, i) in companyTypes"
                                >
                                    {{ type }}
                                </v-btn>
                            </v-btn-toggle>
                        </v-col>
                    </v-row>
                    <p
                            class="red--text pl-4"
                            v-if="companyErrors"
                    >
                        {{ companyErrors[0] }}
                    </p>
                    <v-card-title>
                        What did you have?
                    </v-card-title>
                    <v-select
                            :error-messages="mealErrors"
                            :items="mealTypes"
                            :placeholder="mealTypes[0]"
                            @blur="$v.mealType.$touch()"
                            @change="$v.mealType.$touch()"
                            class="pl-4 pr-4"
                            dense
                            filled
                            outlined
                            required
                            v-model="mealType"
                    >
                    </v-select>
                    <v-card-title>
                        How much did you pay (approximately)?
                    </v-card-title>
                    <v-text-field
                            :error-messages="checkErrors"
                            @blur="$v.check.$touch()"
                            @input="$v.check.$touch()"
                            @onpaste="$v.check.$touch()"
                            class="pl-4 pr-4"
                            filled
                            outlined
                            placeholder="1337"
                            prefix="₽"
                            required
                            v-model="check"
                    >
                    </v-text-field>
                    <v-card-title>
                        Confirm your review
                    </v-card-title>
                    <v-checkbox
                            :error-messages="agreementErrors"
                            :label="confirmMessage"
                            @blur="$v.agreement.$touch()"
                            @change="$v.agreement.$touch()"
                            align="top"
                            class="pl-4 pr-4"
                            required
                            v-model="agreement"
                    >
                    </v-checkbox>
                    <v-row
                            class="mb-12 pb-6"
                            justify="center"
                    >
                        <v-btn
                                class="light-blue white--text"
                                large
                                type="submit"
                        >
                            Submit
                        </v-btn>
                    </v-row>
                </form>
            </v-card>
        </v-container>
    </div>
</template>

<script>
  /* eslint-disable no-console */

  import {email, integer, maxLength, minLength, required} from 'vuelidate/lib/validators';
  import axios from 'axios';

  export default {
    name: 'CreateReview',
    props: {
      placeid: {
        required: true,
      },
    },
    validations: {
      name: {required, maxLength: maxLength(15)},
      email: {required, email},
      rating: {required},
      reviewDescription: {required},
      reviewText: {required, minLength: minLength(20)},
      companyType: {required},
      mealType: {required},
      check: {required, integer},
      agreement: {
        checked(val) {
          return val;
        },
      },
    },
    data: () => ({
      descriptionLimit: 60,
      name: '',
      email: '',
      rating: null,
      reviewDescription: '',
      reviewText: '',
      companyType: null,
      mealType: null,
      check: null,
      agreement: false,
      reviewSubmitted: false,
      restaurant: {
        name: 'Il Milanese',
        info: {
          address: 'Yolo ave. 21',
          owner: 'queen poki',
          averagechk: '$50',
          tags: [],
        },
      },
      infoDescriptor: {
        address: 'Address',
      },
      companyTypes: ['Couple', 'Family', 'Friends', 'Solo'],
      mealTypes: ['Breakfast', 'Lunch', 'Dinner'],
      confirmMessage: '                                I certify that this review is based on my own experience and is my genuine opinion of\n' +
          '                                this restaurant, and that I have no personal or business relationship with this\n' +
          '                                establishment, and have not been offered any incentive or payment originating from the\n' +
          '                                establishment to write this review. I will not post multiple reviews unless my opinion\n' +
          '                                changes over time.',
      isLoading: false,
      model: null,
      search: null,
      updating: {
        name: true,
        address: true,
      },
    }),
    created() {
      axios.get('http://localhost:3000/find/info/?placeid=' + this.placeid).then(response => {
        this.restaurant.name = response.data.result.name;
        this.updating.name = false;
        this.restaurant.info.address = response.data.result.formatted_address;
        this.updating.address = false;
        this.restaurant.info.tags = response.data.result.types;
      });
    },
    computed: {
      nameErrors() {
        const errors = [];
        if (!this.$v.name.$dirty) return errors;
        !this.$v.name.maxLength && errors.push('Name must be at most 15 characters long');
        !this.$v.name.required && errors.push('Name is required.');
        return errors;
      },
      emailErrors() {
        const errors = [];
        if (!this.$v.email.$dirty) return errors;
        !this.$v.email.email && errors.push('Must be valid email');
        !this.$v.email.required && errors.push('Email is required');
        return errors;
      },
      ratingErrors() {
        const errors = [];
        if (!this.$v.rating.$dirty) return errors;
        !this.$v.rating.required && errors.push('Rating is required');
        return errors;
      },
      reviewDescriptionErrors() {
        const errors = [];
        if (!this.$v.reviewDescription.$dirty) return errors;
        !this.$v.reviewDescription.required && errors.push('Description is required');
        return errors;
      },
      reviewTextErrors() {
        const errors = [];
        if (!this.$v.reviewText.$dirty) return errors;
        !this.$v.reviewText.required && errors.push('Review text is required');
        !this.$v.reviewText.minLength && errors.push('Review must be at least 20 characters long');
        return errors;
      },
      companyErrors() {
        const errors = [];
        if (!this.$v.companyType.$dirty) return errors;
        !this.$v.companyType.required && errors.push('Type of your company is required');
        return errors;
      },
      mealErrors() {
        const errors = [];
        if (!this.$v.mealType.$dirty) return errors;
        !this.$v.mealType.required && errors.push('Type of your meal is required');
        return errors;
      },
      checkErrors() {
        const errors = [];
        if (!this.$v.check.$dirty) return errors;
        !this.$v.check.required && errors.push('Amount of your bill is required');
        !this.$v.check.integer && errors.push('Amount must be a number');
        return errors;
      },
      agreementErrors() {
        const errors = [];
        if (!this.$v.agreement.$dirty) return errors;
        !this.$v.agreement.checked && errors.push('You must agree to submit your review');
        return errors;
      },
    },
    methods: {
      validateReview() {
        this.$v.name.$touch();
        this.$v.email.$touch();
        this.$v.rating.$touch();
        this.$v.reviewDescription.$touch();
        this.$v.reviewText.$touch();
        this.$v.companyType.$touch();
        this.$v.mealType.$touch();
        this.$v.check.$touch();
        this.$v.agreement.$touch();

        if (this.nameErrors.length === 0 &&
            this.emailErrors.length === 0 &&
            this.reviewDescriptionErrors.length === 0 &&
            this.ratingErrors.length === 0 &&
            this.reviewTextErrors.length === 0 &&
            this.companyErrors.length === 0 &&
            this.mealErrors.length === 0 &&
            this.checkErrors.length === 0 &&
            this.agreementErrors.length === 0) {
          this.sendReview();
        }
      },
      sendReview() {
        const today = new Date();
        const date = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();
        this.$v.rating.$touch();
        let reviewBody = {
          name: this.$v.name.$model,
          email: this.$v.email.$model,
          rating: this.$v.rating.$model,
          reviewDescription: this.$v.reviewDescription.$model,
          reviewText: this.$v.reviewText.$model,
          companyType: this.companyTypes[this.$v.companyType.$model],
          mealType: this.$v.mealType.$model,
          check: parseInt(this.$v.check.$model, 10),
        };
        let review = {
          place_id: this.placeid,
          review: reviewBody,
          created: date,
        };

        axios.post('http://localhost:3000/restaurant', {
          place_id: this.placeid,
          name: this.restaurant.name,
          formatted_address: this.restaurant.info.address,
          tags: this.restaurant.info.tags,
        }).then(res => {
          if (res.status === 200) {
            axios.put('http://localhost:3000/restaurant',
                {place_id: this.placeid, rating: this.$v.rating.$model, check: this.$v.check.$model})
                // eslint-disable-next-line no-unused-vars
                .then(res => {
                });
          }
        });

        axios.post('http://localhost:3000/review', review)
            // eslint-disable-next-line no-unused-vars
            .then(res => {
              this.reviewSubmitted = true;
            });
      },
    },
  };
</script>

<style scoped>
    ._cont {
        padding: 0 25%;
    }
</style>
