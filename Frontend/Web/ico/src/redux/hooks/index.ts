import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppThunkDispatch } from "../store";

export const useAppDispatch = useDispatch.withTypes<AppThunkDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
