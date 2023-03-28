import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {airLabAPI} from "../api/airLab-api";
import {errorAsString} from "../utils/errorAsString";

type AirCraftType = {
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
type InitialStateType={
    scheduleData:AirCraftType[]
    errorMessage:string
    flightData:FlightData | null
}

const initialState:InitialStateType={
    scheduleData:[],
    flightData:null,
    errorMessage:''
};

const slice=createSlice({
    name:'app',
    initialState,
    reducers:{},
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
    }
})

export const appReducer=slice.reducer

export const getSchedule= createAsyncThunk<AirCraftType[],undefined,{rejectValue:{error:string}}>
('app/getSchedule',async (arg,{dispatch,rejectWithValue})=>{
    try {
        const res = await airLabAPI.getSchedule()
        return res.data.response
    }catch (err){
        const error= errorAsString(err)
        return rejectWithValue({error})
    }
})

export const getFlight=createAsyncThunk<FlightData,string,{rejectValue:{error:string}}>
('app/getFlight', async (flight,{dispatch,rejectWithValue})=>{
    try {
        const res= await airLabAPI.getFlight(flight)
        return res.data.response[0]
    }catch (err){
        const error= errorAsString(err)
        return rejectWithValue({error})
    }
})