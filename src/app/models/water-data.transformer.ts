import { parse } from "@fortawesome/fontawesome-svg-core";
import { DailyWaterData } from "./water-data.model";

export function transformWaterData(rawData: any): DailyWaterData[] {

    const groups: { [date: string]: { [paramId: number]: number } } = {};
    rawData.data.forEach((item: any) => {
        let date = new Date(item.attributes.createDate)
            .toLocaleDateString('en-US', {
                timeZone: 'America/Denver',
                weekday: 'short',
                month: 'short',
                day: '2-digit'
            });

        if (!groups[date]) {
            groups[date] = {}
        }

        const parameterId = item.attributes.parameterId
        groups[date][parameterId] = item.attributes.result
    })

    let days: DailyWaterData[] = Object.keys(groups).map(dateStr => {
        const dayData = groups[dateStr]
        return {
            date: dateStr,
            elevation: dayData[2],  // Elevation (values around 3559.x).
            content: dayData[3],  // Content (values in the millions).
            inflow: dayData[12],  // Inflow (cfs).
            outflow: dayData[18]  // Outflow (cfs).
        }
    })

    days.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    for (let i = 0; i < days.length - 1; i++) {
        if (days[i].elevation != null && days[i + 1].elevation != null) {
          days[i].change = parseFloat((days[i].elevation - days[i + 1].elevation).toFixed(2));
        }
      }
      
      if (days.length > 0) {
        days[days.length - 1].change = 0;
      }

    days.pop()
    return days
}