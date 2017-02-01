<template>
  <div>
    <div v-if="isShowSearchResult && !isSearchCompleted">
      Getting results...<ring-loader :loading="!isSearchCompleted" color="#0000ff" size="20px"/>
    </div>
    <div v-if="isSearchCompleted" class="search-result">
      <p>The best route from {{origin}} to {{ destination }} takes {{travelTime}}.</p>
      <p>The temperature in {{ destination }} is {{destinationTemperature}}&deg;{{temperatureUnits}}</p>
      <p>Travel is <span class="recommended"><span v-if="!isTravelRecommended">not</span> recommended</span></p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import RingLoader from 'vue-spinner/src/RingLoader.vue'

export default {
  name: 'search-result',

  components: {
    RingLoader
  },
  computed: {
    isTravelRecommended: function () { // using an arrow function here leads to this === undefined
      const {travelTime, destinationTemperature} = this.$store.state.weather
      console.log(travelTime)
      let hours = 0
      const hoursLabel = 'hours'
      const hoursLabelIndex = travelTime.indexOf(hoursLabel)
      if (hoursLabelIndex) {
        const hoursString = travelTime.substr(0, hoursLabelIndex + hoursLabel.length)
        hours = parseFloat(hoursString)
      }
      return hours < 12 && destinationTemperature >= 15 && destinationTemperature <= 35
    },
    ...mapState({
      isShowSearchResult: state => state.weather.isSearchInProgress || state.weather.isSearchCompleted,
      isSearchCompleted: state => state.weather.isSearchCompleted,
      origin: state => state.weather.origin,
      destination: state => state.weather.destination,
      travelTime: state => state.weather.travelTime,
      destinationTemperature: state => state.weather.destinationTemperature.toFixed(0),
      temperatureUnits: state => state.weather.temperatureUnits
    })
  }}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .v-spinner {
    display: inline-block;
  }
  .recommended {
    font-style: italic;
    font-weight: bold;
  }
</style>
