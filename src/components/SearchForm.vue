<template>
  <form class="search-form" @submit.prevent="search({origin, destination})">
    <ul class="fields">
      <li>
        <label for="origin">Origin:</label>
        <div :class="{ 'control': true }">
          <input v-model="origin" :class="{'input': true, 'is-danger': errors.has('origin')}" name="origin" id="origin" placeholder="Origin" type="text" data-vv-delay="1000" v-validate="'required'">
          <div v-show="errors.has('origin')" class="help is-danger">{{ errors.first('origin') }}</div>
        </div>
        </li>
      <li>
        <label for="destination">Destination:</label>
        <div :class="{ 'control': true }">
          <input v-model="destination" :class="{'input': true, 'is-danger': errors.has('destination')}" name="destination" id="destination" placeholder="Destination" type="text" data-vv-delay="1000" v-validate="'required'">
          <div v-show="errors.has('destination')" class="help is-danger">{{ errors.first('destination') }}</div>
        </div>
      </li>
    </ul>
    <input type="submit" value="Search" v-bind:disabled="isSearchDisabled">
    <input type="button" value="Reset" @click="onReset()" v-bind:disabled="isResetDisabled">
    <div class="is-danger search-error">{{searchError}}</div>
  </form>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import deepEqual from 'deep-equal'

import {initialWeatherState} from '../store/initialState'

export default {
  name: 'search-form',
  computed: {
    origin: {
      get () {
        return this.$store.state.weather.origin
      },
      set (value) {
        this.$store.commit('setOrigin', value)
      }
    },
    destination: {
      get () {
        return this.$store.state.weather.destination
      },
      set (value) {
        this.$store.commit('setDestination', value)
      }
    },
    isSearchDisabled: function () {
      const { origin, destination, isSearchInProgress } = this.$store.state.weather
      return !origin || !destination || isSearchInProgress
    },
    isResetDisabled: function () {
      const isInitialState = deepEqual(this.$store.state.weather, initialWeatherState())
      const { isSearchInProgress } = this.$store.state.weather
      return isInitialState || isSearchInProgress
    },
    ...mapState({
      searchError: state => state.weather.searchError
    })
  },
  methods: {
    onReset: function () {
      this.errors.clear()
      this.$store.commit('reset')
    },
    ...mapActions([
      'search'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  form {
    margin: 0 auto;
  }
  ul {
    padding: 0;
  }
  .fields {
    list-style: none;
  }
  label {
    width: 150px;
    display: inline-block;
    text-align: right;
    vertical-align: top;
  }
  input {
    font-size: 0.75em;
    width: 200px;
  }
  .control {
    display: inline-block;
  }
  .help {
    font-size: 0.6em;
    text-align: left;
  }
  .help.is-danger, .search-error {
    color: red;
  }
  .search-error {
    font-size: 0.6em;
    margin-top: 10px;
  }
  input.is-danger {
    outline: 1px solid red
  }
</style>
