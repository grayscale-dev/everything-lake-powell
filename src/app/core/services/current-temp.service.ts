import { Injectable, resource } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class CurrentTempService {
  private coordinates = { latitude: 36.9147, longitude: -111.4558 };
  loaded = false;
  currentTemp = resource({
    loader: async () => {
      const { latitude, longitude } = this.coordinates;
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,weather_code&hourly=temperature_2m,weather_code,uv_index&models=best_match&current=uv_index,temperature_2m,weather_code&past_days=14&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch the Current Temp');
      }

      const data = await response.json();
      const hourlyData = data.hourly;
      const hourlyObjects = hourlyData.time.map((time: string, index: number) => {
        const utcTime = new Date(time + "Z");
        return {
          datetime: utcTime,
          formatted_date: utcTime.toLocaleTimeString('en-US', { hour: 'numeric' }),
          temperature_2m: hourlyData.temperature_2m[index],
          uv_index: hourlyData.uv_index[index],
          weather_code: hourlyData.weather_code[index]
        };
      });

      console.log(hourlyObjects)

      const now = new Date();
      const endTime = new Date(now);
      endTime.setHours(now.getHours() + 24);
      
      const hourlyNext24Hours = hourlyObjects.filter((element: any) => {
        return element.datetime >= now && element.datetime < endTime;
      });

      data.hourly_next_24 = hourlyNext24Hours;
      console.log(data)
      this.loaded = true;
      return data;
    }
  });

  updateCoordinates(newCoords: { latitude: number; longitude: number }) {
    this.coordinates = newCoords;
    this.currentTemp.reload();
  }
}