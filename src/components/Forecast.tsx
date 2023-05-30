import { useState, useEffect } from 'react'

import './Forecast.css'

import Oneday from './mini-components/OneDay'

const apiKey:string = 'e44379e893dd4085bb683919233005'
const days:string = '7'
let latitude: string, longitude: string

let arrayDays: string[] = ['Neděle','Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota']

const date: Date = new Date()

const Forecast: React.FC = () => {
    let [arrayForecast, setArrayForecast] = useState<string[]>([])
    let today: number = date.getDay()

    const geoPosition = async (position: any) => {
        latitude = position.coords.latitude
        longitude =  position.coords.longitude

        let api: string = `https://api.weatherapi.com/v1/forecast.json?key=${ apiKey }&q=${ latitude },${ longitude }&days=${ days }`

        const response = await fetch(api)
        let data: any = await response.json()

        setArrayForecast(data.forecast.forecastday)
    }

    useEffect( (): void => {
        navigator.geolocation.getCurrentPosition(geoPosition)
    }, [])

    return <div className='conatiner-forcast'>
        {
            arrayForecast.map( (oneDay: any, index: number) => {
                const { date, day } = oneDay
                index = index + today

                if(index >= arrayDays.length - 1){
                    today = today - 7
                }
                
                return  <div className='one-day' key={ index }>
                    <Oneday pushDay={ arrayDays[index] } pushDate={ date } pushMaxTemp={ Math.round(day.maxtemp_c) } pushMinTemp={ Math.round(day.mintemp_c)} />
                </div>
            })
        }
    </div>
}

export default Forecast