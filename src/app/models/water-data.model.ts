export interface DailyWaterData {
    date: string;
    elevation: number;
    content: number;
    inflow: number;
    outflow: number;
    change?: number;
}