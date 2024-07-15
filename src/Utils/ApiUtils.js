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

    getRatings(activity, forecasts) {
        let newArray = [...forecasts]
        newArray.forEach(element => {
            let min = 1
            let max = 10
            let value = Math.floor(Math.random() * (max - min + 1)) + min
            element.ratings = value
            element.activity = activity
        });
        return newArray
    }
}

export default ApiUtils;
