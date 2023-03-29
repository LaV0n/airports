import React from 'react';
import {useAppSelector} from "../../app/store";
import {useNavigate} from "react-router-dom";
import styles from './Aircraft.module.css'
import {Button} from "@mui/material";
import {dateFormat} from "../../utils/formatData";

export const Aircraft = () => {

    const flight=useAppSelector(state => state.app.flightData)
    const navigator=useNavigate()

    const backHandler=()=>{
        navigator('/')
    }

    const place=`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_API_KEY_MAP}&q=${flight?.lat},${flight?.lng}`

    return (
        <div className={styles.block}>
            <Button onClick={backHandler} className={styles.backButton}>back to schedule</Button>
            {flight
                ? <div className={styles.dataBlock}>
                    <div className={styles.infoBlock}>
                        <p>Arrival Airport IATA code <span>{flight.arr_iata}</span></p>
                        <p>Arrival Airport ICAO code <span>{flight.arr_icao}</span></p>
                        <p>Departure Airport ICAO code <span>{flight.dep_icao}</span></p>
                        <p>Departure Airport IATA code <span>{flight.dep_iata}</span></p>
                        <p>Aircraft Registration Number <span>{flight.reg_number}</span></p>
                        <p>Country <span>{flight.flag}</span></p>
                        <p>Aircraft elevation <span>{flight.alt} meters</span></p>
                        <p>Aircraft head direction <span>{flight.dir}</span></p>
                            <p>Aircraft horizontal speed <span>{flight.speed} km/h</span></p>
                            <p>Aircraft squawk signal code <span>{flight.squawk}</span></p>
                            <p>Airline ICAO code <span>{flight.airline_icao}</span></p>
                            <p>Airline IATA code <span>{flight.airline_iata}</span></p>
                            <p>Aircraft ICAO type <span>{flight.aircraft_icao}</span></p>
                            <p>Flight ICAO code-number <span>{flight.flight_icao}</span></p>
                            <p>Flight IATA code-number <span>{flight.flight_iata}</span></p>
                            <p>Updated <span>{dateFormat(flight.updated)} </span></p>
                            <p>Status <span>{flight.status}</span></p>

                    </div>
                    <iframe
                       className={styles.frame}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src={place}/>
                    </div>
                : <div className={styles.emptyData}> no flight data</div>
            }
        </div>
    );
};
