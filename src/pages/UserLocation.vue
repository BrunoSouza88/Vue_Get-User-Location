<template>
  <section class="ui two column centered grid">
    <div class="column">
      <form class="ui segment large form">
        <div class="ui message red"></div>
        <div class="ui segment">
          <div class="field">
            <div class="ui right icon input larg">
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
    };
  },
  methods: {
    locatorBtnPressed() {
      if (navigator.geolocation) {
        this.getCurrentPosition();
      } else {
        alert('Browser does not suport HTML Geolocalization');
      }
    },
    getCurrentPosition() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.getAddressFrom(position.coords.latitude, position.coords.longitude);
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
      },
      (error) => {
        alert(error.message);
      });
    },
    getAddressFrom(lat, long) {
      const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat}, ${long}&key=${GOOGLE_API_KEY}`)
        .then((response) => {
          if (response.data.error_message) {
            console.log(response.data.error_message);
          } else {
            this.address = response.data.results[0].formatted_address;
          }
        })
        .catch((error) => {
          console.log(error.message);
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
