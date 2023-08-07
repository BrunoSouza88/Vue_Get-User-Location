<template>
  <section class="ui two column centered grid">
    <div class="column">
      <form class="ui segment large form">
        <div class="ui message red"></div>
        <div class="ui segment">
          <div class="field">
            <div class="ui right icon input larg">
              <input type="text" placeholder="Enter your address">
              <i class="dot circle link icon" @click="locatorBtnPressed"></i>
            </div>
          </div>
        </div>
        <button class="ui button">Go</button>
      </form>
    </div>
  </section>
</template>


<script>
import axios from 'axios';

const getAddressFrom = (lat, long) => {
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat}, ${long}&key=${GOOGLE_API_KEY}`)
    .then((response) => {
      if (response.data.error_message) {
        console.log(response.data.error_message);
      } else {
        console.log(response.data.results[0].formatted_address);
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const getCurrentPosition = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    getAddressFrom(position.coords.latitude, position.coords.longitude);
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
  },
  (error) => {
    alert(error.message);
  });
};

export default {
  methods: {
    locatorBtnPressed() {
      if (navigator.geolocation) {
        getCurrentPosition();
      } else {
        alert('Browser does not suport HTML Geolocalization');
      }
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
