
<template>
  <div>
    <section class="ui two column centered grid" id="formPosition">
      <div class="column">
        <form class="ui segment large form">
          <div class="ui message red" v-show="error">{{ error }}</div>
          <div class="ui segment">
            <div class="field">
              <div class="ui right icon input larg" :class="{loading:loaded}">
                <input
                  type="text"
                  id="autocomplete"
                  placeholder="Enter your address"
                  v-model="address"
                />
                <i class="dot circle link icon" @click="locatorBtnPressed"></i>
              </div>
            </div>
          </div>
          <button class="ui primary button" @click="searchAddress">Search</button>
        </form>
      </div>
    </section>
    <section id="map"></section>
  </div>
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

  mounted() {
    // eslint-disable-next-line no-new, no-undef
    const autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      {
        // eslint-disable-next-line no-undef
        bounds: new google.maps.LatLngBounds(
          // eslint-disable-next-line no-undef
          new google.maps.LatLng(-8.05428, -34.8813),
        ),
      },
    );

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      const placeLat = place.geometry.location.lat();
      const placeLng = place.geometry.location.lng();
      this.showUserLocationOnMap(placeLat, placeLng);
    });
  },

  methods: {
    locatorBtnPressed() {
      this.loaded = true;
      if (navigator.geolocation) {
        this.getCurrentPosition();
      } else {
        this.error = 'Browser does not support HTML Geolocation';
      }
    },
    getCurrentPosition() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const positionLat = position.coords.latitude;
          const positionLgn = position.coords.longitude;
          this.getAddressFrom(
            positionLat,
            positionLgn,
          );
          this.loaded = false;
          this.showUserLocationOnMap(
            positionLat,
            positionLgn,
          );
        },
        () => {
          this.error = 'Unable to find your address. Please type your address';
          this.loaded = false;
        },
      );
    },
    getAddressFrom(lat, long) {
      const GOOGLE_API_KEY = 'AIzaSyAu-ciK-vpok-W7SvxZLEfKge5E339Gslo';
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${GOOGLE_API_KEY}`,
        )
        .then(({ data }) => {
          const { errorMessage, results } = data;
          if (!data) {
            this.error = errorMessage;
            this.loaded = false;
          } else {
            this.address = results[0].formatted_address;
            this.loaded = false;
            this.error = '';
          }
        })
        .catch((error) => {
          this.error = error.message;
          this.loaded = false;
        });
    },
    showUserLocationOnMap(latitude, longitude) {
      // eslint-disable-next-line no-undef, no-new
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        // eslint-disable-next-line no-undef
        center: new google.maps.LatLng(latitude, longitude),
        // eslint-disable-next-line no-undef
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });
      // eslint-disable-next-line no-undef, no-new
      new google.maps.Marker({
        // eslint-disable-next-line no-undef
        position: new google.maps.LatLng(latitude, longitude),
        map,
      });
    },
    searchAddress() {
      if (this.address) {
        const GOOGLE_API = 'AIzaSyAu-ciK-vpok-W7SvxZLEfKge5E339Gslo';
        axios
          .get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(this.address)}&key=${GOOGLE_API}`,
          )
          .then(({ data }) => {
            const { errorMessage, results } = data;
            if (errorMessage) {
              this.error = errorMessage;
              this.loaded = false;
            } else {
              const { lat, lng } = results[0].geometry.location;
              this.getAddressFrom(lat, lng);
              this.showUserLocationOnMap(lat, lng);
            }
          })
          .catch((error) => {
            this.error = error.message;
            this.loaded = false;
          });
      } else {
        this.error = 'Please enter an address';
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

.pac-item {
  padding: 10px;
  font-size: 15px;
  cursor: pointer;
}

.pac-item:hover {
  background-color: #ececec;
}

#formPosition {
  position: relative;
  z-index: 1;
}

#map {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(238, 225, 250);
}
</style>
