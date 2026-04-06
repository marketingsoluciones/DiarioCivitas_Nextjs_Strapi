import dayjs from "dayjs"
import es from "dayjs/locale/es"
import { useEffect, useState } from "react"
import { api } from "../api.js"

// WMO weather codes → emoji (Open-Meteo standard)
const weatherEmoji = (code) => {
    if (code === 0) return "☀️"
    if (code <= 2) return "🌤️"
    if (code <= 3) return "☁️"
    if (code <= 48) return "🌫️"
    if (code <= 57) return "🌧️"
    if (code <= 67) return "🌧️"
    if (code <= 77) return "❄️"
    if (code <= 82) return "🌦️"
    if (code <= 86) return "🌨️"
    if (code <= 99) return "⛈️"
    return "🌡️"
}

const ForecastComponent = () => {
    const [forecast, setForecast] = useState()

    useEffect(() => {
        const FetchData = async () => {
            try {
                const { data } = await api.Forecast()
                setForecast(data?.current_weather)
            } catch (error) {
                console.log(1001, error)
            }
        }
        FetchData()
    }, [])

    return (
        <div className="md:block w-max col-span-1 flex flex-col items-center justify-center gap-2">
            <span className="flex gap-2 font-display items-center">
                <span style={{ fontSize: 28, lineHeight: 1 }}>
                    {forecast ? weatherEmoji(forecast.weathercode) : "🌡️"}
                </span>
                <p className="border-r pr-3">Murcia</p>
                <p className="font-semibold">
                    {forecast ? `${Math.round(forecast.temperature)} °C` : "—"}
                </p>
            </span>
            <p className="font-body text-xs tracking-wider text-gray-700 w-full text-center">
                {dayjs().locale(es).format("DD MMMM YYYY")}
            </p>
        </div>
    )
}

export default ForecastComponent
