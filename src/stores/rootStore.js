import WeatherdataStore from './weatherdataStore'

class RootStore {
  constructor() {
    this.weatherdataStore = new WeatherdataStore(this)
  }
}

export default RootStore
