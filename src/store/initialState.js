const initialWeatherState = function () {
  return {
    origin: null,
    destination: null,
    isSearchInProgress: false,
    isSearchCompleted: false,
    travelTime: null,
    destinationTemperature: null,
    temperatureUnits: 'C',
    searchError: null
  }
}

export { initialWeatherState }
