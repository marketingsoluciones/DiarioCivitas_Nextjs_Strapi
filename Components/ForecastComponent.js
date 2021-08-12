import { useEffect, useState } from "react"
import { api } from "../api"

const ForecastComponent = () => {
    const [forecast, setForecast] = useState()
    const FetchData = async (location) => {
        try {
            const {data} = await api.Forecast(location)
            const forecast = data?.forecast[0]
            setForecast(forecast)
        } catch (error) {
            console.log(error)            
        }
    }

    useEffect(() => {
        FetchData("Murcia")
    }, [])
    return (
        <div>
              <span className="flex gap-2 font-display items-center ">
                  <img src={forecast?.icon_url} className="W-8 h-8" />
                <p>Murcia</p>
                <p>{forecast?.avg_temp_c} °C</p>
              </span>
              <p className="text-xs text-gray-600 font-display">
                
              </p>
            </div>
    )
}

export default ForecastComponent
