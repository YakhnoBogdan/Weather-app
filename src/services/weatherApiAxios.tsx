/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios'

const commonHeaders = {
  'X-RapidAPI-Key': 'ee1fc9c5c1msh0694808cea81769p1d7903jsn95a267eef144',
  'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
  'Content-Type': 'application/json',
}

interface EndpoitModel {
  endpoint: string
  method?: 'GET'
  headers?: { [index: string]: string }
  q?: string
  days?: '1' | '2' | '3'
  dt?: string
  end_dt?: string
}

export interface ResultModel<ResponseType> {
  error?: Error
  success: boolean
  response?: ResponseType
}

export const callGetApiRequest = async <ResultType,>({
  endpoint,
  method,
  headers,
  q,
  days,
  dt,
  end_dt,
}: EndpoitModel): Promise<ResultModel<ResultType>> => {
  const options = {
    method,
    params: { q, days, dt, end_dt },
    headers: commonHeaders,
  }
  try {
    const { data, status } = await axios.get<ResultType>(endpoint, options)
    if (status === 200) {
      return { success: true, response: data }
    }
    return {
      success: false,
      error: new Error('Something went wrong'),
    }
  } catch (error) {
    return { success: false, error: new Error('Something went wrong') }
  }
}
