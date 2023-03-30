import React, {useEffect, useState} from 'react';
import styles from './Header.module.css'
import { useAppDispatch, useAppSelector} from "../../app/store";
import {getAirportTC, getScheduleTC, setAirportCodeAC} from "../../app/appReducer";
import {Button, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";

export const Header = () => {

    const [input,setInput]=useState('')
    const dispatch=useAppDispatch()
    const airport=useAppSelector(state => state.app.airport)
    const navigator=useNavigate()

    const onClickHandler=()=>{
        dispatch(setAirportCodeAC((input)))
        dispatch(getAirportTC())
        setInput('')
       navigator('/')
    }
    useEffect(()=>{
        if(airport?.name){
            dispatch(getScheduleTC())
        }
    },[airport])

    return (
        <div className={styles.block}>
            <div className={styles.inputBlock}>
                <TextField type="text" value={input} size="small" placeholder="airport code"
                       onChange={(e)=>setInput(e.currentTarget.value)}
               />
                <Button onClick={onClickHandler} variant="outlined">Find Airport</Button>
            </div>
            {airport &&
                <div className={styles.airportName}>
                {airport.name}
            </div>
            }
        </div>
    );
};