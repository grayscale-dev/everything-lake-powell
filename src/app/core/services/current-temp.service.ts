import { Injectable, resource } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class CurrentTempService {
  private coordinates = { latitude: 36.9147, longitude: -111.4558 };
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

      const dailyData = data.daily
      const dailyObjects = dailyData.time.map((time: string, index: number) => {
        const sunriseUtc = new Date(dailyData.sunrise[index] + "Z")
        const sunsetUtc = new Date(dailyData.sunset[index] + "Z")
        return {
          date: new Date(time),
          weekday: new Date(time).toLocaleDateString('en-US', { weekday: 'short' }),
          temp_high: Math.round(dailyData.temperature_2m_max[index]),
          temp_low: Math.round(dailyData.temperature_2m_min[index]),
          sunrise: sunriseUtc.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }),
          sunset: sunsetUtc.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }),
          uv_index_max: dailyData.uv_index_max[index],
          precipitation_sum: dailyData.precipitation_sum[index],
          weather_code: dailyData.weather_code[index] 
        }
      })

      const now = new Date();
      const today = now.getDate()
      const endTime = new Date(now);
      endTime.setHours(now.getHours() + 24);

      const todayObject = dailyObjects.filter((element: any) => {
        return element.date.getDate() === today
      })[0];

      const dailyNext7Days = dailyObjects.filter((element: any) => {
        return element.date >= now
      })
      
      const hourlyNext24Hours = hourlyObjects.filter((element: any) => {
        return element.datetime >= now && element.datetime < endTime;
      });

      data.daily_next_7_days = dailyNext7Days;
      data.today_object = todayObject;
      data.daily_objects = dailyObjects;
      data.hourly_next_24 = hourlyNext24Hours;
      console.log(data)
      return data;
    }
  });

  updateCoordinates(newCoords: { latitude: number; longitude: number }) {
    this.coordinates = newCoords;
    this.currentTemp.reload();
  }
}