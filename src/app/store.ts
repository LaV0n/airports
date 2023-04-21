import { combineReducers, configureStore } from "@reduxjs/toolkit"
import {TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { appReducer } from "./appReducer"
import {AppDispatch} from "../utils/test-utils";

export const rootReducer = combineReducers({
    app:appReducer,
})

export const store = configureStore({ reducer: rootReducer })
export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatchType = typeof store.dispatch

//export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppDispatch: () => AppDispatch = useDispatch

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store;