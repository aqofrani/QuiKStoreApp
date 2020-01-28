export interface GetWeatherResponse {
    Status: number;
    Error: boolean;
    Message: string;
    Data: {
      Style: string;
      Description: string;
      CityName: string;
      Temperature: number;
      Pressure: number;
      Humidity: number;
      MinimumTemperature: number;
      MaximumTemperature: number;
    }
  }
