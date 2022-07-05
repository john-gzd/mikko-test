import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { SalaryPlanConfiguration } from './salary-plan';
// import { RootState } from '../../app/store';

export interface createSalaryPlanSlice {
  value: SalaryPlanConfiguration[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: createSalaryPlanSlice = {
  value: [],
  status: 'idle'
};

// eslint-disable-next-line no-redeclare
export const createSalaryPlanSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // createSalaryPlan: (state) => {
    createSalaryPlan: () => {
      alert('save plan');
    }
  }
});

export const selectEmployee = (state: RootState) => state.createSalaryPlan.value;

export const { createSalaryPlan } = createSalaryPlanSlice.actions;

export default createSalaryPlanSlice.reducer;
