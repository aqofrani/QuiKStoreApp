import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import {GetWeatherResponse} from '../interfaces/get-weather-response';
import {Settings} from '../setting';
 
@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {

  constructor(private httpClient: HttpClient) { }

  public getWeather(lat, lng) {
    return this.httpClient.get<GetWeatherResponse>(
      `${Settings.API_ADDRESS}/public/weather?lat=${lat}&lng=${lng}`);
  }
}
