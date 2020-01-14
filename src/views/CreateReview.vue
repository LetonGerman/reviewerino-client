<template>
    <div>
        <v-container class="_cont">
            <v-dialog v-model="reviewSubmitted" persistent max-width="350">
                <v-card>
                    <v-card-text class="justify-center">Your response was submitted!</v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn :to="'/restaurant/' + 1" color="green darken-1" flat @click="reviewSubmitted = false">
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
                            <v-card outlined tile class="pl-1 pb-2" max-width="500px" color="light">
                                <v-list-item-title class="headline mb-1">
                                    <v-progress-circular
                                            v-if="updating.name"
                                            indeterminate size="24"
                                            color="blue"
                                    ></v-progress-circular>
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    <v-progress-circular
                                            v-if="updating.address"
                                            indeterminate size="24"
                                            color="blue"
                                    ></v-progress-circular>
                                </v-list-item-subtitle>
                                <v-list-item-title
                                        v-if="!updating.address"
                                        class="headline mb-1"
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
                        action="POST"
                        @submit.prevent="validateReview"
                >
                    <v-card-title>
                        Your name
                    </v-card-title>
                    <v-text-field
                            class="pl-4 pr-4"
                            filled
                            outlined
                            dense
                            required
                            placeholder="Ivan"
                            v-model="name"
                            @input="$v.name.$touch()"
                            @blur="$v.name.$touch()"
                            @onpaste="$v.name.$touch()"
                            :error-messages="nameErrors"
                    >

                    </v-text-field>
                    <v-card-title>
                        Your email
                    </v-card-title>
                    <v-text-field
                            class="pl-4 pr-4"
                            filled
                            outlined
                            dense
                            required
                            placeholder="example@mail.com"
                            v-model="email"
                            @input="$v.email.$touch()"
                            @blur="$v.email.$touch()"
                            @onpaste="$v.email.$touch()"
                            :error-messages="emailErrors"
                    >

                    </v-text-field>
                    <v-card-title>
                        How would your rate this restaurant overall?
                    </v-card-title>
                    <v-rating
                            v-model="rating"
                            class="pl-4 pr-4"
                            background-color="grey darken-2"
                            large
                            half-increments
                            hover
                            required
                            @change="$v.rating.$touch()"
                            @blur="$v.rating.$touch()"
                            :error-messages="ratingErrors"
                    ></v-rating>
                    <p
                            v-if="ratingErrors"
                            class="red--text pl-4"
                    >
                        {{ ratingErrors[0] }}
                    </p>
                    <v-card-title>
                        Review description
                    </v-card-title>
                    <v-text-field
                            class="pl-4 pr-4"
                            filled
                            outlined
                            dense
                            required
                            placeholder="A happy ending in a nice restaurant"
                            v-model="reviewDescription"
                            @input="$v.reviewDescription.$touch()"
                            @blur="$v.reviewDescription.$touch()"
                            @onpaste="$v.reviewDescription.$touch()"
                            :error-messages="reviewDescriptionErrors"
                    >

                    </v-text-field>
                    <v-card-title>
                        Your review
                    </v-card-title>
                    <v-textarea
                            class="pl-4 pr-4"
                            auto-grow
                            filled
                            outlined
                            counter
                            dense
                            requried
                            placeholder="Your thoughts..."
                            v-model="reviewText"
                            @input="$v.reviewText.$touch()"
                            @blur="$v.reviewText.$touch()"
                            @onpaste="$v.reviewText.$touch()"
                            :error-messages="reviewTextErrors"
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
                                    borderless
                                    tile
                                    class="pl-4"
                                    color="blue accent-3"
                                    v-model="companyType"
                                    required
                                    @change="$v.companyType.$touch()"
                                    @blur="$v.companyType.$touch()"
                            >
                                <v-btn
                                        v-for="(type, i) in companyTypes"
                                        :key="i"
                                        class="mr-3 grey lighten-2"
                                >
                                    {{ type }}
                                </v-btn>
                            </v-btn-toggle>
                        </v-col>
                    </v-row>
                    <p
                            v-if="companyErrors"
                            class="red--text pl-4"
                    >
                        {{ companyErrors[0] }}
                    </p>
                    <v-card-title>
                        What did you have?
                    </v-card-title>
                    <v-select
                            filled
                            outlined
                            dense
                            required
                            :items="mealTypes"
                            :placeholder="mealTypes[0]"
                            class="pl-4 pr-4"
                            v-model="mealType"
                            @change="$v.mealType.$touch()"
                            @blur="$v.mealType.$touch()"
                            :error-messages="mealErrors"
                    >
                    </v-select>
                    <v-card-title>
                        How much did you pay (approximately)?
                    </v-card-title>
                    <v-text-field
                            filled
                            outlined
                            required
                            prefix="₽"
                            class="pl-4 pr-4"
                            placeholder="1337"
                            v-model="check"
                            @input="$v.check.$touch()"
                            @blur="$v.check.$touch()"
                            @onpaste="$v.check.$touch()"
                            :error-messages="checkErrors"
                    >
                    </v-text-field>
                    <v-card-title>
                        Confirm your review
                    </v-card-title>
                    <v-checkbox
                            align="top"
                            :label="confirmMessage"
                            class="pl-4 pr-4"
                            required
                            v-model="agreement"
                            @change="$v.agreement.$touch()"
                            @blur="$v.agreement.$touch()"
                            :error-messages="agreementErrors"
                    >
                    </v-checkbox>
                    <v-row
                            justify="center"
                            class="mb-12 pb-6"
                    >
                        <v-btn
                                large
                                class="pink white--text"
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
  import {email, integer, maxLength, minLength, required} from 'vuelidate/lib/validators';
  import axios from 'axios';

  export default {
    name: 'CreateReview',
    props: {
      placeid: {
        required: true
      }
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

        },
      },
      infoDescriptor: {
        address: 'Address',
       // owner: 'Owner',
       // averagechk: 'Average bill',
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
        address: true
      }
    }),
    created() {
      axios
          .get('http://localhost:3000/find/info/?placeid=' + this.placeid)
          .then(response => {
            this.restaurant.name = response.data.result.name;
            this.updating.name = false;
            this.restaurant.info.address = response.data.result.formatted_address;
            this.updating.address = false;
            // eslint-disable-next-line no-console
            console.log(response);
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
        !this.$v.reviewText.minLength && errors.push('Name must be at least 20 characters long');
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

        if (!this.$v.name.$dirty &&
            !this.$v.email.$dirty &&
            !this.$v.rating.$dirty &&
            !this.$v.reviewDescription.$dirty &&
            !this.$v.reviewText.$dirty &&
            !this.$v.companyType.$dirty &&
            !this.$v.mealType.$dirty &&
            !this.$v.check.$dirty &&
            !this.$v.agreement.$dirty) {
          this.sendReview();
        } else {
          return;
        }
      },
      sendReview() {
        this.$v.rating.$touch();
        let review = {
          name: this.$v.name.$model,
          email: this.$v.email.$model,
          rating: this.$v.rating.$model,
          reviewDescription: this.$v.reviewDescription.$model,
          reviewText: this.$v.reviewText.$model,
          companyType: this.companyTypes[this.$v.companyType.$model],
          mealType: this.$v.mealType.$model,
          check: this.$v.check.$model,
        };
        // eslint-disable-next-line no-console
        console.log(review);
        this.reviewSubmitted = true;
      },
    },
  };
</script>

<style scoped>
    ._cont {
        padding: 0 25%;
    }
</style>
