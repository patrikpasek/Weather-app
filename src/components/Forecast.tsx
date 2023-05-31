import './Forecast.css'

import Oneday from './mini-components/OneDay'

type Props = {
    pushForecast: string []
}

let arrayDays: string[] = ['Neděle','Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota']

const date: Date = new Date()

const Forecast: React.FC <Props>= (props) => {
    let today: number = date.getDay()

    return <div className='conatiner-forcast'>
        {
            props.pushForecast.map( (oneDay: any, index: number) => {
                const { date, day } = oneDay
                index = index + today

                if(index >= arrayDays.length - 1){
                    today = today - 7
                }
                
                return  <div className='one-day' key={ index }>
                    <Oneday pushDay={ arrayDays[index] } pushDate={ date } pushMaxTemp={ Math.round(day.maxtemp_c) } pushMinTemp={ Math.round(day.mintemp_c) } />
                </div>
            })
        }
    </div>
}

export default Forecast