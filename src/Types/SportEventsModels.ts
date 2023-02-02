export interface SportEventModel {
  stadium: string
  country: string
  region: string
  tournament: string
  start: string
  match: string
  id?: string
}
export type kindOfSportModel = 'football' | 'golf' | 'cricket'

export type AllSportEventsModel = {
  [kindOfSport in kindOfSportModel]: SportEventModel[]
}
