import { action, computed, flow, makeObservable, observable } from "mobx"
import axios from "axios";
import { now } from "mobx-utils";

class WeatherdataStore {
    accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
    apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    @observable.ref weatherData = {};
    @observable.ref currentLocation = null;
    @observable.ref cityData = {}
    @observable searchingData = ''
    @observable language = 'en'

    constructor(rootStore) {
        this.rootstore = rootStore;
        makeObservable(this);
    }

    @flow
    *fetchWeatherData() {
        try {
            const response = yield axios.get(`http://api.weatherapi.com/v1/forecast.json?q=${this.searchingData}&q=${this.currentLocation[1]},${this.currentLocation[0]}&days=5&key=${this.apiKey}&lang=${this.language}`);
            this.weatherData = response.data;
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    @flow
    *fetchLocation() {
        try {
            const position = yield new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            const { latitude, longitude } = position.coords;
            this.setCurrentLocation(latitude, longitude);
        } catch (error) {
            console.error('Error fetching location:', error);  
        }
    }

    @flow
    *forwardGeocoding() {
        try {
            const response = yield axios.get(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.searchingData}.json?access_token=${this.accessToken}&language=${this.language}`
            )
            this.currentLocation = response.data.features[0].center
          } catch (error) {
            this.currentLocation = 'Unknown place'
            console.error('Error fetching weather data:', error)
          }
    }

    @flow
    *reverseGeocoding() {
        try {
            const response = yield axios.get(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.currentLocation}.json?access_token=${this.accessToken}&language=${this.language}`
            )
            this.cityData = response.data.features[response.data.features.length - 2]
          } catch (error) {
            console.error('Error fetching weather data:', error)
          }
    }

    @flow
    *init() {
        yield this.fetchLocation();
        yield this.fetchWeatherData();
        yield this.reverseGeocoding()
    }

    @action
    setCity(city) {
        this.searchingData = city;
    }

    @action
    setCurrentLocation(latitude, longitude) {
        this.currentLocation = [ longitude, latitude ];
    }

    @action
    setLanguage(language) {
        this.language = language
    }

    @computed
    get currentLatAndLon() {
        return this.cityData?.center;
    }

    @computed
    get currentDate() {
        const timezone = this.weatherData.location?.tz_id;
        const language = this.language === 'en' ? 'en-gb' : this.language
        return new Date(now()).toLocaleString(language, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: timezone });
    }   
    
    @computed
    get currentReview() {
        const review = {
            feels: Math.round(this.weatherData.current?.feelslike_c),
            humidity: this.weatherData.current?.humidity,
            uv: this.weatherData.current?.uv,
            wind: Math.round(this.weatherData.current?.wind_mph)
        }
        return review;
    }

    @computed
    get currentPlace() {
        return this.cityData?.place_name
    }

    @computed
    get currentHour() {
        const timezone = this.weatherData.location?.tz_id;
        return new Date(now()).toLocaleString('en-gb', { hour: '2-digit', timeZone: timezone });
    }

    @computed
    get currentTemperature() {
        return Math.round(this.weatherData.current?.temp_c);
    }

    @computed
    get weatherIcon() {
        return this.weatherData.current?.condition?.icon;
    }

    @computed
    get futureData() {
        return this.weatherData.forecast?.forecastday?.slice(1);
    }
}

export default WeatherdataStore