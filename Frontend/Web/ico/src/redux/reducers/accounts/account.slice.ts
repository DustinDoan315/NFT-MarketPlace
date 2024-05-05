import { IWalletInfo } from "@/_types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ethers } from "ethers";

export interface AccountState {
  wallet?: IWalletInfo;
  listNft?: number[];
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
    setListNft: (state, actions: PayloadAction<number[]>) => {
      state.listNft = actions.payload;
    },
  },
});

export const { setWeb3Provider, setWalletInfo, setListNft } =
  accountSlice.actions;
export default accountSlice.reducer;
