export interface LocationModel {
  country: string
  lat: number
  localtime: string
  localtime_epoch: number
  lon: number
  name: string
  region: string
  tz_id: string
  id?: string
}

export interface WeatherModel {
  cloud: number
  condition: conditionMedia
  feelslike_c: number
  feelslike_f: number
  gust_kph: number
  gust_mph: number
  humidity: number
  is_day: number
  last_updated: string
  last_updated_epoch: number
  precip_in: number
  precip_mm: number
  pressure_in: number
  pressure_mb: number
  temp_c: number
  temp_f: number
  uv: number
  vis_km: number
  vis_miles: number
  wind_degree: number
  wind_dir: string
  wind_kph: number
  wind_mph: number
}

export interface ForecastCertainDayModel {
  maxtemp_c: number
  maxtemp_f: number
  mintemp_c: number
  mintemp_f: number
  avgtemp_c: number
  avgtemp_f: number
  maxwind_mph: number
  maxwind_kph: number
  totalprecip_mm: number
  totalprecip_in: number
  totalsnow_cm: number
  avgvis_km: number
  avgvis_miles: number
  avghumidity: number
  daily_will_it_rain: number
  daily_chance_of_rain: number
  daily_will_it_snow: number
  daily_chance_of_snow: number
  condition: conditionMedia
  uv: number
}

export interface AstroForecastModel {
  sunrise: string
  sunset: string
  moonrise: string
  moonset: string
  moon_phase: string
  moon_illumination: string
}

export interface HourForecastModel extends Omit<WeatherModel, 'last_updated' | 'last_updated_epoch'> {
  time_epoch: number
  time: string
  is_day: number
  windchill_c: number
  windchill_f: number
  heatindex_c: number
  heatindex_f: number
  dewpoint_c: number
  dewpoint_f: number
  will_it_rain: number
  chance_of_rain: number
  will_it_snow: number
  chance_of_snow: number
}

export interface conditionMedia {
  text: string
  icon: string
  code: number
}

export interface CurrentWeatherModel {
  location: LocationModel
  current: WeatherModel
}

export interface ForecastDayModel {
  forecastday: DayForecastModel[]
}
export interface DayForecastModel {
  date: string
  date_epoch: number
  day: ForecastCertainDayModel
  astro: AstroForecastModel
  hour: HourForecastModel[]
}

export interface ForecastModel extends CurrentWeatherModel {
  forecast: ForecastDayModel
}
export interface FoundCity {
  id: number
  name: string
  region: string
  country: string
  lat: number
  lon: number
  url: string
}

export type WeatherHistoryModel = Omit<ForecastModel, 'current'>
