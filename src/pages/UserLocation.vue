<template>
  <section class="ui two column centered grid">
    <div class="column">
      <form class="ui segment large form">
        <div class="ui message red" v-show="error">{{ error }}</div>
        <div class="ui segment">
          <div class="field">
            <div class="ui right icon input larg" :class="{loading:loaded}">
              <input type="text" placeholder="Enter your address" v-model="address">
              <i class="dot circle link icon" @click="locatorBtnPressed"></i>
            </div>
          </div>
        </div>
        <button class="ui button">Search</button>
      </form>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      address: '',
      error: '',
      loaded: false,
    };
  },
  methods: {
    locatorBtnPressed() {
      this.loaded = true;
      if (navigator.geolocation) {
        this.getCurrentPosition();
      } else {
        this.error = 'Browser does not suport HTML Geolocalization';
      }
    },
    getCurrentPosition() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.getAddressFrom(position.coords.latitude, position.coords.longitude);
        this.loaded = false;
      },
      () => {
        this.error = 'Unable to find find your address. Please type your address';
        this.loaded = false;
      });
    },
    getAddressFrom(lat, long) {
      const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat}, ${long}&key=${GOOGLE_API_KEY}`)
        .then((response) => {
          if (response.data.error_message) {
            this.error = response.data.error.message;
            this.loaded = false;
          } else {
            this.address = response.data.results[0].formatted_address;
            this.loaded = false;
          }
        })
        .catch((error) => {
          this.error = error.message;
          this.loaded = false;
        });
    },
  },
};
</script>

<style>
  .ui.button,
  .dot.circle.icon {
    background-color: #ff5a5f;
    color: white;
  }
</style>
