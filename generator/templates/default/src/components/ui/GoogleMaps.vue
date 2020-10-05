<template>
    <div v-show="show">
        <div class="grid">
            <div class="grid-col grid-col--full">
                <p class="typo-hint">
                  Du kannst den Marker verschieben um die Geokoordinaten zu verändern.
                </p>
                <div class="map"/>
            </div>
        </div>
    </div>
</template>

<style lang="scss" rel="stylesheet/scss" scoped>
    .map {
        height: 300px;
    }

    .typo-hint {
        margin-bottom: 5px;
    }
</style>

<script>
/* global google */
import Vue from 'vue';
import debounce from 'lodash/debounce';
import store from '../../store';
import CountryCodes from '../util/CountryCodes';

export default {
  name: 'GoogleMaps',

  props: {
    address: { type: Object, default: null },
    show: { type: Boolean, default: true },
    resetIfNotFound: { type: Boolean, default: false },
  },

  data() {
    return {
      map: null,
      marker: null,
    };
  },

  watch: {
    'address.street': function () {
      if (this.checkAddress()) {
        this.locate();
      }
    },
    'address.streetNumber': function () {
      if (this.checkAddress()) {
        this.locate();
      }
    },
    'address.postalCode': function () {
      if (this.checkAddress()) {
        this.locate();
      }
    },
    'address.city': function () {
      if (this.checkAddress()) {
        this.locate();
      }
    },
    'address.countryId': function () {
      if (this.checkAddress()) {
        this.locate();
      }
    },
    'address.stateId': function () {
      if (this.checkAddress()) {
        this.locate();
      }
    },

    show() {
      if (this.show) {
        Vue.nextTick(() => {
          google.maps.event.trigger(this.map, 'resize');
          this.map.setCenter(this.marker.position);
        });
      }
    },
  },

  created() {
    // TODO
    // this.$store.dispatch(actions.LOAD_COUNTRIES);
    // this.$store.dispatch(actions.LOAD_STATES);
  },

  mounted() {
    if (this.address && parseFloat(this.address.lat) && parseFloat(this.address.lng)) {
      this.loadGoogleMaps(parseFloat(this.address.lat), parseFloat(this.address.lng));
    } else {
      // if no coordinates are set default to Donaupromenade 1, 4020 Linz
      this.loadGoogleMaps(
        process.env.VUE_APP_GMAPS_DEFAULT_LOCATION_LAT,
        process.env.VUE_APP_GMAPS_DEFAULT_LOCATION_LNG,
      );

      // try to find coordinates if we already have a valid address
      if (this.checkAddress()) {
        this.locate();
      }
    }
  },

  methods: {
    /**
             * Load Google Maps JavaScript API only once.
             */
    loadGoogleMaps(lat, lng) {
      if (document.querySelector('script[class=google-maps-script]') === null) {
        const body = document.getElementsByTagName('body')[0];
        const script = document.createElement('script');
        const url = `${process.env.VUE_APP_GMAPS_URL}?key=${process.env.VUE_APP_GMAPS_TOKEN}`;

        script.type = 'text/javascript';
        script.setAttribute('class', 'google-maps-script');
        script.src = url;

        // create map after Google Maps is loaded
        script.onload = function () {
          this.createMap(lat, lng);
          google.maps.event.addListener(this.marker, 'mouseup', () => {
            this.saveMarkerPosition();
          });
        }.bind(this);

        body.appendChild(script);
      } else {
        // create map if Google Maps is already loaded
        this.createMap(lat, lng);
      }
    },

    /**
             * Initial create map method.
             */
    createMap(lat, lng) {
      this.map = new google.maps.Map(this.$el.querySelector('.map'), {
        center: { lat, lng },
        scrollwheel: false,
        zoom: 15,
      });

      this.addMarker(lat, lng);
    },

    /**
             * Locate the given address on the map.
             */
    locate: debounce(function () {
      if (this.checkAddress()) {
        // disable geocoding for nightwatch tests to get rid of external dependencies
        if (process.env.VUE_APP_GMAPS_DISABLE_GEOCODING) {
          this.changeMarkerPosition(
            process.env.VUE_APP_GMAPS_DEFAULT_LOCATION_LAT,
            process.env.VUE_APP_GMAPS_DEFAULT_LOCATION_LNG,
          );
          this.$root.$snackbar.error('Geocoding ist deaktiviert!');
          return;
        }

        const geocoder = new google.maps.Geocoder();

        geocoder.geocode(this.buildGeocoderRequestObject(), (results, status) => {
          if (this.isValidGeocoderResponse(results, status)) {
            const lat = results[0].geometry.location.lat();
            const lng = results[0].geometry.location.lng();

            this.changeMarkerPosition(lat, lng);
            this.map.setCenter(results[0].geometry.location);
          } else if (this.resetIfNotFound) {
            this.saveMarkerPosition('', '');
          }
        });
      } else {
        this.$root.$snackbar.error('Bitte Straße, Hausnummer, Postleitzahl und Ort eingeben!');
      }
    }, 500),

    buildGeocoderRequestObject() {
      const geocoderRequest = { address: this.formattedAddress() };
      const restrictions = {};
      const countryName = this.countryName();
      const stateCode = CountryCodes.getStateCode(this.stateName());

      if (countryName) {
        restrictions.country = CountryCodes.getCountryCode(countryName) || countryName;
      }

      if (stateCode) {
        restrictions.administrativeArea = stateCode;
      }

      if (this.address.postalCode) {
        restrictions.postalCode = this.address.postalCode;
      }

      if (Object.keys(restrictions).length > 0) {
        geocoderRequest.componentRestrictions = restrictions;
      }

      return geocoderRequest;
    },

    /**
             * Formatted address for Google Geocoding API request.
             */
    formattedAddress() {
      if (!this.address.street) {
        return '';
      }

      const a = this.address;
      const stateName = this.stateName();
      const countryName = this.countryName();

      let address = a.street + (a.streetNumber ? ` ${a.streetNumber}` : '');

      if (a.postalCode || a.city) {
        address += `, ${a.postalCode ? a.postalCode : ''} ${a.city ? a.city : ''}`;
      }

      address += (stateName ? `, ${stateName}` : '') + (countryName ? `, ${countryName}` : '');

      return address;
    },

    /**
     * Check if the result returned from the google Geocoding API is actually correct for the
     * input address
     * It looks like restricting the response to a state via the request objects
     * componentRestrictions doesn't always work properly. For example for locations near the
     * border to another state, the Geocoding
     * API returns a valid response with both states (but not with others).
     * Example: Veilchenstraße 1, 4484 Kronstorf (works restricted to Oberösterreich and
     * Niederösterreich)
     * This method checks if the requested state is contained in the address components
     * from the Geocoding API
     * response.
     */
    isValidGeocoderResponse(results, status) {
      if (status !== google.maps.GeocoderStatus.OK || results.length === 0) {
        return false;
      }

      const stateName = this.stateName();

      if (stateName) {
        let stateFound = false;

        Object.keys(results[0].address_components).forEach((key) => {
          if (results[0].address_components[key].long_name === stateName) {
            stateFound = true;
          }
        });

        return stateFound;
      }

      return true;
    },

    /**
     * Initial Google Maps marker call.
     */
    addMarker(lat, lng) {
      this.marker = new google.maps.Marker({
        map: this.map,
        position: { lat, lng },
        draggable: true,
      });
    },

    /**
     * Change position of existing Google Maps marker.
     */
    changeMarkerPosition(lat, lng) {
      this.marker.setPosition(new google.maps.LatLng(lat, lng));
      this.saveMarkerPosition();
    },

    /**
     * Check if all address fields are filled.
     */
    checkAddress() {
      return !!(
        this.address.street
          && this.address.streetNumber
          && this.address.postalCode
          && this.address.city
          && this.address.countryId
      );
    },

    /**
             * Emit current marker position.
             */
    saveMarkerPosition(
      lat = this.marker.position.lat(),
      lng = this.marker.position.lng(),
    ) {
      this.$emit('lat', lat);
      this.$emit('lng', lng);
    },

    /**
     * Get text label for the currently selected country.
     */
    countryName() {
      const { countryId } = this.address;

      const selectedCountry = this.$store.getters.getCountryDropdownOptions.find(
        (option) => option.value === countryId,
      );

      return selectedCountry ? selectedCountry.label : '';
    },

    /**
     * Get text label for the currently selected state.
     */
    stateName() {
      const { stateId } = this.address;

      const selectedState = this.$store.getters.getStateDropdownOptions.find(
        (option) => option.value === stateId,
      );

      return selectedState ? selectedState.label : '';
    },
  },
};
</script>
