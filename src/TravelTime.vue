<template>
  <div id="travel_time">
    <h1>Get travel time and weather</h1>
    <SearchForm></SearchForm>
    <SearchResult v-show="isShowSearchResult"></SearchResult>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SearchForm from './components/SearchForm'
import SearchResult from './components/SearchResult'

export default {
  name: 'TravelTime',

  computed: mapState({
    isShowSearchResult: state => state.weather.isSearchInProgress || state.weather.isSearchCompleted
  }),
  components: {
    SearchForm,
    SearchResult
  }
}
</script>

<style>
#travel_time {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 1.5em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 800px;
  margin: 0 auto;
  padding: 0 0 40px 0;
  border: 1px solid black;
}
</style>
