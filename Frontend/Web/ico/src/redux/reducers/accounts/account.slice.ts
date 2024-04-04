import { IWalletInfo } from "@/_types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ethers } from "ethers";

export interface AccountState {
  wallet?: IWalletInfo;
  web3Provider?: ethers.BrowserProvider;
}

const initialState: AccountState = {};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setWeb3Provider: (
      state,
      actions: PayloadAction<ethers.BrowserProvider>
    ) => {
      state.web3Provider = actions.payload;
    },
    setWalletInfo: (state, actions: PayloadAction<IWalletInfo>) => {
      state.wallet = actions.payload;
    },
  },
});

export const { setWeb3Provider, setWalletInfo } = accountSlice.actions;
export default accountSlice.reducer;
