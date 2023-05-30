import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud, faWind, faUser, faTemperatureHalf, faXmark } from '@fortawesome/free-solid-svg-icons'

import './WeatherBox.css'

import Loader from "../assets/Loader"
import Forecast from './Forecast'

import data from '../data'
import clouds from '../images/clouds.jpg'

const apiKey: string = 'ba4473042f3320c23c2b1d1af3160422'

const WeatherBox:React.FC = () => {
    ///////////////////
    // Definování Hodnot
    let latitude: string, longitude:string
    
    let [loading, setLoading] = useState<boolean>(true)
    
    let [backgroundImage, setbackgroundImage] = useState<string>(clouds)

    let [country, setCountry] = useState<string>('')
    let [weather, setWeather] = useState<string>('')
    let [temp, setTemp] = useState<number>(0)
    let [nameCity, setNameCity] = useState<string>('')
    let [icon, setIcon] = useState<string>('01d')

    let [feelsLike, setFeelsLike] = useState<number>(0)
    let [pressure, setPressure] = useState<number>(0)
    let [humidity, setHumidity] = useState<number>(0)
    let [wind, setWind] = useState<number>(0)

    /////////////////////////////////////////////////
    // Funkce pro zjištení polohy a aktuálního počasí
    let getGeoPosition = async (position: any) => {
        latitude = position.coords.latitude
        longitude =  position.coords.longitude

        const apiLatLon: string = `https://api.openweathermap.org/data/2.5/weather?lat=${ latitude }&lon=${ longitude }&appid=${ apiKey }&lang=cz&units=metric`

        const response = await fetch(apiLatLon)
        let data: any = await response.json()

        setLoading(false)

        setbackgroundImage(clouds)

        setCountry(data.sys.country)
        setWeather(data.weather[0].description)
        setTemp(Math.round(data.main.temp))
        setNameCity(data.name)
        setIcon(data.weather[0].icon)

        setFeelsLike(Math.round(data.main.feels_like))
        setPressure(data.main.pressure)
        setHumidity(data.main.humidity)
        setWind(data.wind.speed)
    }

    useEffect(() => {
        setTimeout((): void => {
            navigator.geolocation.getCurrentPosition(getGeoPosition)
        }, 1000)
    }, [])

    const currentPosition = ():void => {
        navigator.geolocation.getCurrentPosition(getGeoPosition)
    }
    
    //////////////////////////////////////
    // Funkce pro počasí jednotlivých měst
    const [city, setCity] = useState<any>(data)

    const cityHandler = async (nameCity: string) => {
        const filteredCity = data.filter((oneCity) => {
            return oneCity.nameCity === nameCity
        })

        setbackgroundImage(filteredCity[0].image)
        setNameCity(filteredCity[0].nameCity)

        const apiCity: string = `https://api.openweathermap.org/data/2.5/weather?q=${ filteredCity[0].nameCity }&appid=${ apiKey }&lang=cz&units=metric`

        const response = await fetch(apiCity)
        let dataCity: any = await response.json()

        setCountry(dataCity.sys.country)
        setWeather(dataCity.weather[0].description)
        setTemp(Math.round(dataCity.main.temp))
        setNameCity(dataCity.name)
        setIcon(dataCity.weather[0].icon)

        setFeelsLike(Math.round(dataCity.main.feels_like))
        setPressure(dataCity.main.pressure)
        setHumidity(dataCity.main.humidity)
        setWind(dataCity.wind.speed)
    }

    const deleteCityHandler = (id: number): void => {
        const filteredCity = city.filter((oneCity: any) => {
            return oneCity.id !== id
        })

        setCity(filteredCity)
    }

    const deleteAllHandler = (): void => {
        setCity([])
    }

    const repeatAllHandler = (): void => {
        setCity(data)
    }

    return (
        <>
            { loading ?  <Loader />: 
                <>
                    <div className="container-app" style={{ backgroundImage: `linear-gradient(#0000002f, #DDE6ED), url(${ backgroundImage })`}}>
                    <div className='container-weatherBox'>
                    <div className='weatherBox'>
                        <div className="boxs">
                            <div className="mini-boxs">
                                <h1>{ nameCity }</h1>
                                <h2>{ country }</h2>
                                <span>{ temp } °C</span>
                                <span>{ weather }</span>
                            </div>
                            <div className="mini-boxs-img">
                                <img src={`https://openweathermap.org/img/wn/${ icon }@2x.png`} alt="Weather-Icon" />  
                            </div>
                        </div>
                        <div className="boxs">
                            <div className='asset-box'>
                                <div className="asset-mini-box">
                                    <FontAwesomeIcon icon={faUser} />
                                    <span>Pocitová teplota</span>
                                    <span>{ feelsLike } °C</span>
                                </div>
                                <div className="asset-mini-box">
                                    <FontAwesomeIcon icon={faCloud} />
                                    <span>Vhlkost</span>
                                    <span>{ humidity } %</span>
                                </div>
                            </div>
                            <div className='asset-box'>
                                <div className="asset-mini-box">
                                    <FontAwesomeIcon icon={faWind} />
                                    <span>Rychlost</span>
                                    <span>{ wind } m/s</span>
                                </div>
                                <div className="asset-mini-box">
                                    <FontAwesomeIcon icon={faTemperatureHalf} />
                                    <span>Tlak</span>
                                    <span>{ pressure } hPa</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container-WeatherCity'>
                    <div className="WeatherCity">
                        <div className="all-city">
                            {
                                city.map((oneCity: any) => {
                                    const {id, nameCity} = oneCity
                                
                                    return <div className='one-city' key={id}>
                                        <div className="btnClick-one-city" onClick={ () => cityHandler(nameCity) }>
                                            <h4 >{nameCity}</h4>
                                        </div>
                                        <div className="btnClick-icon">
                                            <FontAwesomeIcon icon={faXmark} onClick={ () => deleteCityHandler(id) } />
                                        </div>
                                    </div> 
                                })
                            }
                        </div>
                        <div className="reset-btn">
                            <a href="#btn" onClick={ deleteAllHandler }>Vymazat</a>
                            <a href="#btn" onClick={ repeatAllHandler }>Načíst</a>
                        </div>
                        <div className='current-btn'>
                            <a href="#btn" onClick={ currentPosition }>Aktuální poloha</a>
                        </div>
                    </div>
                </div>
            </div>
            <Forecast />
                </>
            }
        </>
    )
}

export default WeatherBox