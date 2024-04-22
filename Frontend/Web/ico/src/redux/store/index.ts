import { configureStore, ThunkDispatch, Action, Store } from "@reduxjs/toolkit";
import rootReducer from "../reducers";
import persistReducersMiddleware from "./persistReducersMiddleware";

export type RootState = ReturnType<typeof store.getState>;
export type AppThunkDispatch = ThunkDispatch<RootState, any, Action>;

export type AppStore = Omit<Store<RootState, Action>, "dispatch"> & {
  dispatch: AppThunkDispatch;
};

const store: any = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      persistReducersMiddleware
    ),
});

export default store;
