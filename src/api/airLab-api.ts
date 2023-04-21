import axios from "axios";

const apiKey='e6d3bb25-9609-4727-afbb-5b57fb8d832f'

export const instance=axios.create({
    baseURL:'https://airlabs.co/api/v9/',
})

export const airLabAPI={
    getSchedule(airport:string){
        return instance.get(`schedules?dep_iata=${airport}&api_key=${apiKey}`)
    },
    getFlight(flight:string){
        return instance.get(`flights?api_key=${apiKey}&flight_icao=${flight}`)
    },
    getAirport(airport:string){
        return instance.get(`airports?iata_code=${airport}&api_key=${apiKey}`)
    }
}