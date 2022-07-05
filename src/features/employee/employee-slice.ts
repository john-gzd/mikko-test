import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface EmployeesState {
  employees: any;
  status: 'idle' | 'loading' | 'failed';
}

const initialState = {
  employees: [],
  status: 'idle'
} as EmployeesState;

// eslint-disable-next-line space-before-function-paren
export const getEmployees = createAsyncThunk('employees/getList', async () => {
  const employees = await fetch('https://randomuser.me/api/?results=25&nat=NL')
    .then((response) => response.json())
    .then((data) => {
      return data.results;
    });

  return employees;
});

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    create(state) {
      console.log(state.employees);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployees.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.status = 'idle';
        state.employees = action.payload;
      })
      .addCase(getEmployees.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export const selectEmployeeList = (state: RootState) => state.employee.employees;

export const { create } = employeeSlice.actions;
export default employeeSlice.reducer;
