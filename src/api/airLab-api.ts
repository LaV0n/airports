import axios from "axios";

const apiKey=process.env.REACT_APP_API_KEY_AIRLAB

const instance=axios.create({
    baseURL:'https://airlabs.co/api/v9/',
})

export const airLabAPI={
    getSchedule(){
        return instance.get(`schedules?dep_iata=EVN&api_key=${apiKey}`)
    },
    getFlight(flight:string){
        return instance.get(`flights?api_key=${apiKey}&flight_icao=${flight}`)
    }
}