import { Component, OnInit } from '@angular/core';
import {
  ToastController,
  Platform,
  LoadingController
} from '@ionic/angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation
} from '@ionic-native/google-maps';

import {WeatherServiceService} from '../services/weather-service.service';
import { Weather } from '../interfaces/weather';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  map: GoogleMap;
  loading: any;
  weather: Weather;

  constructor(
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private weatherService: WeatherServiceService,
    private platform: Platform) { }

  async ngOnInit() {
    // Since ngOnInit() is executed before `deviceready` event,
    // you have to wait the event.
    await this.platform.ready();
    await this.loadMap();
  }

  loadMap() {
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: 43.0741704,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    });

  }

  async getWeather() {
    this.map.clear();

    this.loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    await this.loading.present();


    // Get the location of you
    this.map.getMyLocation().then((location: MyLocation) => {
      this.loading.dismiss();
      this.weatherService.getWeather(location.latLng.lat, location.latLng.lng).subscribe( (res) => {
        if(res.Error) {
          this.showToast(res.Message);
        } else {
          this.weather = res.Data;
          this.map.animateCamera({
            target: location.latLng,
            zoom: 17,
            tilt: 30
          });

          let marker: Marker = this.map.addMarkerSync({
            title: `Weather information ${this.weather.CityName}`,
            position: location.latLng,
            animation: GoogleMapsAnimation.BOUNCE
          });

          marker.showInfoWindow();
        }
      });
    })
    .catch(err => {
      this.loading.dismiss();
      this.showToast(err.error_message);
    });
  }

  async showToast(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });

    toast.present();
  }
}