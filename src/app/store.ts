import {applyMiddleware, createStore, combineReducers, ThunkDispatch} from "@reduxjs/toolkit"
import {TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import thunkMiddleware from "redux-thunk"
import {ActionType, appReducer} from "./appReducer"

const rootReducer = combineReducers({
    app:appReducer,
})

export const store = createStore(  rootReducer,applyMiddleware(thunkMiddleware) )
export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, ActionType>

export const useAppDispatch = () => useDispatch<AppDispatchType>()

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store;