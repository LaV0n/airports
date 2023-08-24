import React, { useEffect, useState } from 'react'
import styles from './Header.module.css'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { getAirport, getSchedule } from '../../app/appReducer'
import { Button, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const Header = () => {
  const [input, setInput] = useState('')
  const dispatch = useAppDispatch()
  const airport = useAppSelector((state) => state.app.airport)
  const navigator = useNavigate()

  const onClickHandler = () => {
    dispatch(getAirport(input))
    setInput('')
    navigator('/')
  }
  useEffect(() => {
    if (airport?.name) {
      dispatch(getSchedule())
    }
  }, [airport])

  return (
    <div className={styles.block}>
      <div className={styles.mainTitle}>Airport schedule</div>
      <div className={styles.inputBlock}>
        <TextField
          type="text"
          value={input}
          size="small"
          placeholder="airport code"
          onChange={(e) => setInput(e.currentTarget.value)}
        />
        <Button
          onClick={onClickHandler}
          variant="outlined"
        >
          Find Airport
        </Button>
      </div>
      <div className={styles.airportName}>{airport?.name}</div>
    </div>
  )
}
