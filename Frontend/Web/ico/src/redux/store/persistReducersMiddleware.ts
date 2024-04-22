import type { RootState } from "../store";
import { Middleware } from "redux";
import store from "../store";

// Define an array of reducer keys to whitelist
const whitelistReducers = ["reducer1", "reducer2"]; // Add the keys of the reducers you want to store

// Middleware to persist specific reducers' state in local storage
const persistReducersMiddleware: Middleware<{}, RootState> =
  () => (next) => (action) => {
    // Execute the action
    const result = next(action);

    // Get the current state from the store
    const state: any = store.getState();

    // Filter out the state of whitelisted reducers
    const whitelistedState = Object.keys(state)
      .filter((key) => whitelistReducers.includes(key))
      .reduce((acc, key) => {
        acc[key] = state[key];
        return acc;
      }, {} as Record<string, any>);

    // Store the whitelisted state in local storage
    localStorage.setItem("reduxState", JSON.stringify(whitelistedState));

    return result;
  };

export default persistReducersMiddleware;
