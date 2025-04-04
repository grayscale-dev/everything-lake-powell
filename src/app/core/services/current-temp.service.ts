import { Injectable, resource } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class CurrentTempService {
    currentTemp = resource({
        loader: async (params) => {
            const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=36.9147&longitude=-111.4558&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum&hourly=temperature_2m,uv_index&current=temperature_2m&past_days=14&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch')
            if (!response.ok) {
                throw new Error('Failed to fetch the Current Temp')
            }
            return await response.json()
        }
    })
}