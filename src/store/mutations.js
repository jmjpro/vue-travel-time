import {initialWeatherState} from './initialState'

// mutations are operations that actually mutate the state.
// each mutation handler gets the entire state tree as the first argument, followed by additional
// payload arguments.
// mutations must be synchronous and can be recorded by plugins for debugging purposes
export default {
  reset (state) {
    state.weather = initialWeatherState()
  },
  setOrigin (state, origin) {
    state.weather.origin = origin
    state.weather.isSearchCompleted = false
  },
  setDestination (state, destination) {
    state.weather.destination = destination
    state.weather.isSearchCompleted = false
  },
  setTravelTime (state, travelTime) {
    state.weather.travelTime = travelTime
  },
  setIsSearchInProgress (state, isSearchInProgress) {
    state.weather.isSearchInProgress = isSearchInProgress
  },
  setIsSearchCompleted (state, isSearchCompleted) {
    state.weather.isSearchCompleted = isSearchCompleted
  },
  setDestinationTemperature (state, destinationTemperature) {
    state.weather.destinationTemperature = destinationTemperature
  },
  setSearchError (state, error) {
    state.weather.searchError = error
  }
}
