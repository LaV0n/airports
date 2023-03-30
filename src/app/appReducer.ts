import {airLabAPI} from "../api/airLab-api";
import {errorAsString} from "../utils/errorAsString";
import {AppDispatchType, AppRootStateType} from "./store";

export type AirCraftType = {
    airline_iata: string
    airline_icao: string
    flight_iata: string
    flight_icao: string
    flight_number: string
    dep_iata: string
    dep_icao: string
    dep_terminal: null | number
    dep_gate:null | number
    dep_time: string
    dep_time_utc: string
    dep_estimated: string
    dep_estimated_utc: string
    dep_actual: string
    dep_actual_utc: string
    arr_iata:string
    arr_icao: string
    arr_terminal: null | number
    arr_gate:null | number
    arr_baggage: null | number
    arr_time: string
    arr_time_utc: string
    cs_airline_iata: null | number
    cs_flight_number: null | number
    cs_flight_iata: null | number
    status: string
    duration: null | number
    delayed: null | number
    dep_delayed: null | number
    arr_delayed: null | number
    aircraft_icao: string
    arr_time_ts: null | number
    dep_time_ts: null | number
    dep_estimated_ts:null | number
    dep_actual_ts: null | number
}
type FlightData={
    hex: string
    reg_number: string
    flag: string
    lat:number
    lng: number
    alt: number
    dir: number
    speed: number
    squawk: string
    flight_number: string
    flight_icao: string
    flight_iata: string
    dep_icao: string
    dep_iata: string
    arr_icao: string
    arr_iata: string
    airline_icao: string
    airline_iata: string
    aircraft_icao: string
    updated: number
    status: string
}
type AirportType={
    name:string
    iata_code:string
}
type InitialStateType={
    scheduleData:AirCraftType[] | null
    errorMessage:string
    flightData:FlightData | null
    airport:AirportType | null
}

const initialState:InitialStateType={
    scheduleData:[],
    flightData:null,
    errorMessage:'',
    airport:null,
};

type SetErrorMessageActionType=ReturnType<typeof setErrorMessageAC>
type SetAirportCodeActionType=ReturnType<typeof setAirportCodeAC>
type SetAirportActionType=ReturnType<typeof setAirportAC>
type SetScheduleActionType=ReturnType<typeof setScheduleAC>
type SetFlightActionType=ReturnType<typeof setFlightAC>

export type ActionType =SetErrorMessageActionType | SetAirportActionType | SetAirportCodeActionType | SetScheduleActionType | SetFlightActionType

export const appReducer=(state:InitialStateType=initialState, action:ActionType):InitialStateType=>{
    switch (action.type) {
        case "SET_ERROR_MESSAGE":{
            return {...state,errorMessage: action.message}
        }
        case "SET_AIRPORT_CODE":{
            return  {...state, airport:{ name:'', iata_code:action.airportCode} }
        }
        case "SET_AIRPORT":{
            return  {...state,airport:action.airport}
        }
        case "SET_SCHEDULE":{
            return  {...state,scheduleData:action.schedule}
        }
        case "SET_FLIGHT":{
            return  {...state,flightData:action.flightData}
        }
        default:
            return {...state}
    }
}

export const setErrorMessageAC =(message:string)=>({type:'SET_ERROR_MESSAGE',message} as const)
export const setAirportCodeAC =(airportCode:string)=>({type:'SET_AIRPORT_CODE',airportCode} as const)
export const setAirportAC =(airport:AirportType)=>({type:'SET_AIRPORT',airport} as const)
export const setScheduleAC =(schedule:AirCraftType[])=>({type:'SET_SCHEDULE',schedule} as const)
export const setFlightAC =(flightData:FlightData)=>({type:'SET_FLIGHT',flightData} as const)

export const getAirportTC=()=>{
    return async (dispatch:AppDispatchType, getState:()=>AppRootStateType)=>{
        const airport= getState().app.airport?.iata_code
        try {
            const res =await airLabAPI.getAirport(airport!)
            if(res.data.response.length!==0){
                dispatch(setAirportAC(res.data.response[0]))
            }else {
                dispatch(setErrorMessageAC('wrong airport code'))
            }
        }catch (err) {
            const error = errorAsString(err)
            dispatch(setErrorMessageAC(error))
        }
    }
}

export const getScheduleTC=()=>{
    return async (dispatch:AppDispatchType, getState:()=>AppRootStateType)=>{
        const airport= getState().app.airport?.iata_code
        try {
            const res =await airLabAPI.getSchedule(airport!)
            dispatch(setScheduleAC(res.data.response))
        }catch (err) {
            const error = errorAsString(err)
            dispatch(setErrorMessageAC(error))
        }
    }
}

export const getFlightTC=(flight:string)=>{
    return async (dispatch:AppDispatchType)=>{
        try {
            const res =await airLabAPI.getFlight(flight)
            dispatch(setFlightAC(res.data.response[0]))
        }catch (err) {
            const error = errorAsString(err)
            dispatch(setErrorMessageAC(error))
        }
    }
}