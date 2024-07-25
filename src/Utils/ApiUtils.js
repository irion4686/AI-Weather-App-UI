class ApiUtils {
    constructor(baseURL) {
        this.baseURL = process.env.REACT_APP_BACKEND_URL;
    }

    async get(endpoint, headers = {}) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...headers,
                },
            });
            return await this.handleResponse(response);
        } catch (error) {
            this.handleError(error);
        }
    }

    async post(endpoint, data, headers = {}) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...headers,
                },
                body: JSON.stringify(data),
            });
            return await this.handleResponse(response);
        } catch (error) {
            this.handleError(error);
        }
    }

    async handleResponse(response) {
        if (!response.ok) {
            const error = await response.text();
            throw new Error(error);
        }
        return response.json();
    }

    handleError(error) {
        console.error('API call failed. ', error);
        throw error;
    }
    
    async getWeeklyForecast(zipcode)  {
        try {
            let body = {
                zipcode: zipcode
            }
            const result = await this.post('/forecast/weekly', body);
            return await result['forecast'];
        } catch (error) {
            this.handleError(error)
        }
    }

    async getHourlyForecast(zipcode)  {
        try {
            let body = {
                zipcode: zipcode
            }
            const result = await this.post('/forecast/hourly', body);
            return await result['forecast'];
        } catch (error) {
            this.handleError(error)
        }
    }

    async getDailyForecast(zipcode) {
        try {
            let body = { zipcode: zipcode };
            const result = await this.post('/forecast/single-day', body);
            console.log('Daily forecast result:', result);
            return result;
        } catch (error) {
            this.handleError(error);
        }
    }

    async getCurrentWeather(zipcode) {
        try {
            const result = await this.get(`/forecast/${zipcode}`);
            console.log('Current weather result:', result);
            return result;
        } catch (error) {
            this.handleError(error);
        }
    }

    
    async get7DayRatings(activity, forecasts) {
        try {
            
            let requests = []
            forecasts.forEach(async (day) => {
                let curr = {
                    activity: activity.toLowerCase(),
                    temp_max: day.max_temp,
                    precipitation: day.precip_sum,
					prob_precip: day.precip_prob,
                    temp_min: day.min_temp,
                    weather_code: this.getWeatherCode(day.weather)
                }
                requests.push(curr)
                
            })
            let body = {
                requests: requests
            }
            let ratings = await this.post(`/activity-suitability`, body);
            return await ratings
        } catch (error) {
            this.handleError(error);
        }
    }

    getWeatherCode(description) {
        let WEATHER_CODES = {
            "Clear sky": 0,
            "Mainly clear": 1,
            "Partly cloudy": 2,
            "Overcast": 3,
            "Fog": 45,
            "Depositing rime fog":48,
            "Light drizzle":51,
            "Moderate drizzle":53,
            "Dense drizzle":55,
            "Light freezing drizzle":56,
            "Dense freezing drizzle":57,
            "Slight rain":61,
            "Moderate rain":63,
            "Heavy rain":65,
            "Light freezing rain":66,
            "Heavy freezing rain":67,
            "Slight snow fall":67,
            "Moderate snow fall":73,
            "Heavy snow fall":75,
            "Snow grains":77,
            "Slight rain showers":80,
            "Moderate rain showers":81,
            "Violent rain showers":82,
            "Slight snow showers":85,
            "Heavy snow showers":86,
            "Thunderstorm":95,
            "Thunderstorm with slight hail":96,
            "Thunderstorm with heavy hail":99
        
        }   
        return WEATHER_CODES[description];
    }
}

export default ApiUtils;
