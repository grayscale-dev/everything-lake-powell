import { Injectable, resource } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class CurrentTempService {
    currentTemp = resource({
        loader: async (params) => {
            const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=36.9147&longitude=-111.4558&current=temperature_2m&forecast_days=1&temperature_unit=fahrenheit')
            if (!response.ok) {
                throw new Error('Failed to fetch the Current Temp')
            }
            return await response.json()
        }
    })
}