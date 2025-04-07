import { Injectable, resource } from "@angular/core";
import { transformWaterData } from "src/app/models/water-data.transformer";

@Injectable({ providedIn: 'root' })
export class WaterDataService {

    currentDate = new Date()
    fourteenDaysAgo = new Date(this.currentDate).setDate(this.currentDate.getDate() - 16)
    formattedDate = new Date(this.fourteenDaysAgo).toISOString().split('T')[0]

    dataResource = resource({
        loader: async() => {
            const url = `https://data.usbr.gov/rise/api/result?page=1&itemsPerPage=1000&locationId=393&parameterId=2,18,12,3&dateTime%5Bafter%5D=${this.formattedDate}`
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error("Error while gathering water data")
            }

            const rawData = await response.json()

            return transformWaterData(rawData);
        }
    })
}