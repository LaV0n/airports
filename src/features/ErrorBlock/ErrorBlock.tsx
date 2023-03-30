import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/store";
import styles from './ErrorBlock.module.css'
import {Button} from "@mui/material";
import {setErrorMessageAC} from "../../app/appReducer";

export const ErrorBlock = () => {

    const errorMessage=useAppSelector(state => state.app.errorMessage)
    const [hidden,setHidden]=useState(true)
    const dispatch=useAppDispatch()

    const closeButtonHandler=()=>{
        dispatch(setErrorMessageAC(''))
    }

    useEffect(()=>{
        if (errorMessage){
            setHidden(false)
        }else {
            setHidden(true)
        }
    },[errorMessage])

    return (
        <div style={{visibility:hidden?"hidden":'visible'}} className={styles.block}>
            {errorMessage}
            <Button onClick={closeButtonHandler} color="inherit">x</Button>
        </div>
    );
};