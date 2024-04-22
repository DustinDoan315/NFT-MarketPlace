import { configureStore, ThunkDispatch, Action, Store } from "@reduxjs/toolkit";
import rootReducer from "../reducers";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

export type RootState = ReturnType<typeof store.getState>;
export type AppThunkDispatch = ThunkDispatch<RootState, any, Action>;

export type AppStore = Omit<Store<RootState, Action>, "dispatch"> & {
  dispatch: AppThunkDispatch;
};

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
  safelist: ["account"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store: any = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
