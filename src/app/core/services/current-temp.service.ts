import { Injectable, resource } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class CurrentTempService {
  private coordinates = { latitude: 36.9147, longitude: -111.4558 };

  currentTemp = resource({
    loader: async () => {
      const { latitude, longitude } = this.coordinates;
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum&hourly=temperature_2m,uv_index&current=temperature_2m&past_days=14&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch the Current Temp');
      }
      return await response.json();
    }
  });

  updateCoordinates(newCoords: { latitude: number; longitude: number }) {
    this.coordinates = newCoords;
    this.currentTemp.reload();
  }
}