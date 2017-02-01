import mutations from '../../../src/store/mutations'

describe('mutations', () => {
  it('should reset isSearchCompleted when setting origin', () => {
    const state = {
      weather: {
        isSearchCompleted: true
      }
    };
    mutations.setOrigin(state, 'some origin')
    expect(state.weather.isSearchCompleted).to.equal(false)
  })

  it('should reset isSearchCompleted when setting destination', () => {
    const state = {
      weather: {
        isSearchCompleted: true
      }
    };
    mutations.setDestination(state, 'some destination')
    expect(state.weather.isSearchCompleted).to.equal(false)
  })
})
