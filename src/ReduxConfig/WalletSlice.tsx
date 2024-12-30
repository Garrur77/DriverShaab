// src/redux/slices/walletSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WalletState {
  totalEarnings: number;
  adminCommission: number;
  completedRides: number;
  netProfit: number;
  commissionPaid: number;
  commissionBalance: number;
}

const initialState: WalletState = {
  totalEarnings: 0,
  adminCommission: 0,
  completedRides: 0,
  netProfit: 0,
  commissionPaid: 0,
  commissionBalance: 0,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setTotalEarnings: (state, action: PayloadAction<number>) => {
      state.totalEarnings = action.payload;
    },
    setAdminCommission: (state, action: PayloadAction<number>) => {
      state.adminCommission = action.payload;
    },
    setCompletedRides: (state, action: PayloadAction<number>) => {
      state.completedRides = action.payload;
    },
    setNetProfit: (state, action: PayloadAction<number>) => {
      state.netProfit = action.payload;
    },
    setCommissionPaid: (state, action: PayloadAction<number>) => {
      state.commissionPaid = action.payload;
    },
    setCommissionBalance: (state, action: PayloadAction<number>) => {
      state.commissionBalance = action.payload;
    },
  },
});

export const {
  setTotalEarnings,
  setAdminCommission,
  setCompletedRides,
  setNetProfit,
  setCommissionPaid,
  setCommissionBalance,
} = walletSlice.actions;

export default walletSlice.reducer;
