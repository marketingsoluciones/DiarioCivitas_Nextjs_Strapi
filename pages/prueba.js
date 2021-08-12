import { useEffect } from "react"
import { api } from "../api"

const prueba = () => {
    useEffect(() => {
        console.log(api.Forecast())
    }, [])
    return (
        <div>
            
        </div>
    )
}

export default prueba
