import React from 'react';
import {useAppDispatch, useAppSelector} from "../../app/store";
import { getFlight} from "../../app/appReducer";
import { useNavigate} from "react-router-dom";
import styles from './Schedule.module.css'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';

export const Schedule =  () => {

    const dispatch=useAppDispatch()
    const schedules=useAppSelector(state => state.app.scheduleData)
    const navigator=useNavigate()

    const getFlightHandler =(flight:string)=>{
        dispatch(getFlight(flight))
       navigator('/aircraft')
    }

    return (
        <div className={styles.block}>
            {schedules &&
                <TableContainer className={styles.table} sx={{maxWidth:650}} >
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Time</TableCell>
                                <TableCell align="right">Flight</TableCell>
                                <TableCell align="right">Destination</TableCell>
                                <TableCell align="right">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {schedules.map((s,index) => (
                                <TableRow
                                    key={index}
                                    onClick={()=>{getFlightHandler(s.flight_icao)}}
                                    className={styles.tableRow}
                                >
                                    <TableCell >
                                        {s.dep_time.slice(-5)}
                                    </TableCell>
                                    <TableCell align="right">{s.flight_iata}</TableCell>
                                    <TableCell align="right">
                                        {s.arr_iata}
                                    </TableCell>
                                    <TableCell align="right">{s.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </div>
    );
};

