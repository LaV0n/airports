import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {airLabAPI} from "../api/airLab-api";
import {errorAsString} from "../utils/errorAsString";
import {AppRootStateType} from "./store";

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
    airport:AirportType  | null
}

const initialState:InitialStateType={
    scheduleData:[],
    flightData:null,
    errorMessage:'',
    airport:null,
};

const slice=createSlice({
    name:'app',
    initialState,
    reducers:{
        setErrorMessage:(state,action:PayloadAction<string>) =>{
            state.errorMessage=action.payload
        }
    },
    extraReducers:builder => {
        builder.addCase(getSchedule.fulfilled,(state, action)=>{
            state.scheduleData=action.payload
        })
        builder.addCase(getSchedule.rejected, (state, action)=>{
           state.errorMessage = action.payload? action.payload.error : 'unknown error'
        })
        builder.addCase(getFlight.fulfilled,(state, action)=>{
            state.flightData=action.payload
        })
        builder.addCase(getFlight.rejected, (state, action)=>{
            state.errorMessage = action.payload? action.payload.error : 'unknown error'
        })
        builder.addCase(getAirport.fulfilled,(state, action)=>{
            if(action.payload){
                state.airport=action.payload
            }else {
                state.errorMessage='wrong airport code'
                state.airport=null
                state.scheduleData=null
            }
        })
        builder.addCase(getAirport.rejected,(state, action)=>{
            state.errorMessage=action.payload? action.payload.error : 'unknown error'
        })
    }
})

export const appReducer=slice.reducer
export const {setErrorMessage}=slice.actions

export const getSchedule= createAsyncThunk<AirCraftType[],undefined,{rejectValue:{error:string}}>
('app/getSchedule',async (arg,{getState, rejectWithValue})=>{
    const code =(getState() as AppRootStateType).app.airport!.iata_code
    try {
        const res = await airLabAPI.getSchedule(code)
        return res.data.response
    }catch (err){
        const error= errorAsString(err)
        return rejectWithValue({error})
    }
})

export const getFlight=createAsyncThunk<FlightData,string,{rejectValue:{error:string}}>
('app/getFlight', async (flight,{rejectWithValue})=>{
    try {
        const res= await airLabAPI.getFlight(flight)
        return res.data.response[0]
    }catch (err){
        const error= errorAsString(err)
        return rejectWithValue({error})
    }
})

export const getAirport=createAsyncThunk<AirportType,string,{rejectValue:{error:string}}>
('app/getAirport',async (airport,{dispatch,rejectWithValue})=>{
   try {
       const res =await airLabAPI.getAirport(airport)
       return res.data.error?dispatch(setErrorMessage(res.data.error.message)): res.data.response[0]
   }catch (err) {
       const error = errorAsString(err)
       return rejectWithValue({error})
   }
})