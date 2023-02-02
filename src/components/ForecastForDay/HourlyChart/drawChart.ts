import { ChartPurpose } from './HourlyChart'

export const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

export const drawChart = (values: number[], chartPurpose: ChartPurpose, isMetricSystem: boolean) => {
  let addToRange: number
  switch (chartPurpose) {
    case 'Temperature':
      addToRange = isMetricSystem ? 5 : 10
      break
    case 'Wind speed':
      addToRange = isMetricSystem ? 5 : 3
      break
    case 'Pressure':
      addToRange = isMetricSystem ? 10 : 1
      break
    default:
      addToRange = 5
  }
  const rangeOfValues = {
    minRange: Math.floor(Math.min(...values) - addToRange),
    maxRange: Math.floor(Math.max(...values) + addToRange),
  }
  const fullRange = rangeOfValues.maxRange - rangeOfValues.minRange

  const hoursLeftPosition = hours.map((hour) => {
    return `${hour * (100 / hours.length) + 2.7}%`
  })
  const pointBottomPosition = values.map((value) => {
    return `${((value - rangeOfValues.minRange) / fullRange) * 100}%`
  })
  const heightVerticalLine = pointBottomPosition.map((value) => {
    return `${(+value.split('%')[0] / 100) * 300}px`
  })
  return { rangeOfValues, hoursLeftPosition, pointBottomPosition, heightVerticalLine }
}
