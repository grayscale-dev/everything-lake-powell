import { Component, inject, OnInit } from '@angular/core';
import { CurrentTempService } from './core/services/current-temp.service';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot, faWater, faSun, faDroplet, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule } from '@angular/forms';
import { PopoverModule } from 'primeng/popover';
import { CardComponent } from './shared/components/card.component';
import { IonHeader, IonContent } from "@ionic/angular/standalone";
import { Platform } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  imports: [IonContent, IonHeader, CommonModule, SkeletonModule, TableModule, FontAwesomeModule, ListboxModule, FormsModule, PopoverModule, CardComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  isIos: boolean;
  math = Math;
  faLocationDot = faLocationDot;
  faWater = faWater;
  faSun = faSun;
  faDroplet = faDroplet;
  faChevronUp = faChevronUp
  faChevronDown = faChevronDown
  currentTempService = inject(CurrentTempService)
  locations = [
    { name: "Wahweap Marina", coordinates: { lat: 37.010, lng: -111.480 } },
    { name: "Lone Rock Beach", coordinates: { lat: 37.055, lng: -111.493 } },
    { name: "Antelope Point", coordinates: { lat: 37.070, lng: -111.620 } },
    { name: "Warm Creek Bay", coordinates: { lat: 37.025, lng: -111.550 } },
    { name: "Padre Bay", coordinates: { lat: 37.000, lng: -111.530 } },
    { name: "Twinhorn Point", coordinates: { lat: 37.080, lng: -111.600 } },
    { name: "Rainbow Bridge", coordinates: { lat: 37.160, lng: -110.960 } },
    { name: "Buckshot Bend", coordinates: { lat: 37.090, lng: -111.650 } },
    { name: "Canyon Point", coordinates: { lat: 37.040, lng: -111.520 } },
    { name: "Sunset Point", coordinates: { lat: 37.085, lng: -111.560 } }
  ];
  location? = this.locations[0]

  updateWeatherLocation() {
    if (this.location) {
      localStorage.setItem("selectedLocation", this.location.name)
      const { lat, lng } = this.location.coordinates;
      this.currentTempService.updateCoordinates({ latitude: lat, longitude: lng });
    }
  }

  constructor(private platform: Platform) {
    let selectedLocation = localStorage.getItem("selectedLocation")
    if (selectedLocation) {
      this.location = this.locations.find(loc => loc.name === selectedLocation) || this.locations[0];
    }
    this.isIos = this.platform.is("ios")
  }
}
