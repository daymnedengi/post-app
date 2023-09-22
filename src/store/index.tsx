import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { postSlice } from "./postSlice";

const rootReducer = combineReducers({
    postReducer: postSlice.reducer
});

export const store = configureStore({
    reducer: rootReducer
});

export type TAppState = ReturnType<typeof rootReducer>;
export type TAppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<TAppState> = useSelector;
export const useAppDispatch: () => TAppDispatch = useDispatch;