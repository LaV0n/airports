import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/store";
import {getFlight, getSchedule} from "../../app/appReducer";
import { useNavigate} from "react-router-dom";

export const Schedule =  () => {

    const dispatch=useAppDispatch()
    const schedules=useAppSelector(state => state.app.scheduleData)
    const errorMessage=useAppSelector(state => state.app.errorMessage)
    const navigator=useNavigate()

    const getFlightHandler =(flight:string)=>{
        dispatch(getFlight(flight))
       navigator('/aircraft')
    }

    useEffect(()=>{
        dispatch(getSchedule())
    },[])

    return (
        <div>
            {schedules.map((s,index)=>
                <div key = {index} onClick={()=>getFlightHandler(s.flight_icao)}>
                    arrive - {s.arr_iata}, flight - {s.flight_iata}, time - {s.arr_time}
                </div>
            )}
            {errorMessage &&
                <div>
                    {errorMessage}
                </div>}
        </div>
    );
};

