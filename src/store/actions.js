import fetch from 'isomorphic-fetch'

// actions are functions that cause side effects and can involve asynchronous operations.
export default {
  search: ({ commit }, { origin, destination }) => {
    if (!origin || !destination) {
      console.error('Required parameter missing')
      return
    }

    commit('setSearchError', null)
    commit('setIsSearchInProgress', true)
    commit('setIsSearchCompleted', false)

    fetchDirections(origin, destination)
    .then(data => {
      return parseDirections(data)
    })
    .then(resDirections => {
      const { travelTime, destinationCoordinates } = resDirections
      commit('setTravelTime', travelTime)
      console.debug(travelTime)
      console.debug(destinationCoordinates)
      return destinationCoordinates
    })
    .then(destinationCoordinates => {
      fetchWeather(destinationCoordinates)
      .then(data => {
        commit('setDestinationTemperature', parseWeather(data))
        // timeout here is to force the GUI loader to display just for fun :-)
        setTimeout(() => {
          commit('setIsSearchInProgress', false)
          commit('setIsSearchCompleted', true)
        }, 2000)
      })
    })
    .catch(error => {
      commit('setIsSearchInProgress', false)
      commit('setSearchError', error.message)
      console.error(error)
    })
  }
}
// end actions

// action helper functions (plain javascript)
const fetchDirections = function (origin, destination) {
  const endpoint = 'https://maps.googleapis.com/maps/api/directions/json'
  const key = 'AIzaSyATm1_r80KPHKGwRdFxxUnynLDadFnSJlw'
  const url = `${endpoint}?language=en&key=${key}&origin=${origin}&destination=${destination}`
  console.log(`fetching ${url}`)
  return new Promise((resolve, reject) => {
    /*
    resolve(
      new Promise((resolve, reject) => { resolve({}) })
    )
    return
    */
    fetch(url)
    .then(response => {
      if (response.ok) {
        resolve(response.json())
      } else {
        var error = new Error(`${response.status} ${response.statusText}`)
        error.prefix = 'Server error:\n\n'
        error.response = response
        reject(error)
      }
    })
  })
}

const parseDirections = function (directionsData) {
  if (!(directionsData && 'routes' in directionsData && directionsData.routes.length > 0 && 'legs' in directionsData.routes[0])) {
    throw new Error("Couldn't find directions between the origin and destination")
  }
  const leg = directionsData.routes[0].legs[0]
  return {
    travelTime: leg.duration.text, // '11 hours 15 minutes'
    destinationCoordinates: leg.end_location // {lat: 31.7684934, lng: 35.2134956}
  }
}

const fetchWeather = function (coordinates) {
  const endpoint = 'http://api.openweathermap.org/data/2.5/weather'
  const appId = '0baf41155af3452ac20cf703c24893af'
  // const lat = 31.7673951
  // const lon = 35.2112653
  return new Promise((resolve, reject) => {
    if (!coordinates) {
      reject('coordinates are required to fetch weather')
    }
    const url = `${endpoint}?lat=${coordinates.lat}&lon=${coordinates.lng}&APPID=${appId}`
    console.log(`fetching ${url}`)
    /*
    resolve(
      new Promise((resolve, reject) => { resolve({main: {temp: 285}}) })
    )
    return
    */
    fetch(url)
    .then(response => {
      if (response.ok) {
        resolve(response.json())
      } else {
        var error = new Error(`${response.status} ${response.statusText}`)
        error.prefix = 'Server error:\n\n'
        error.response = response
        reject(error)
      }
    })
  })
}

const parseWeather = function (weatherData) {
  if (!(weatherData && 'main' in weatherData && 'temp' in weatherData.main)) {
    throw new Error("Couldn't find directions between the origin and destination")
  }
  const KELVIN_TO_CELSIUS_OFFSET = -273.15
  return weatherData.main.temp + KELVIN_TO_CELSIUS_OFFSET
  // return 12.03
}
// end plain javascript functions
