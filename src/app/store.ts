import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import EmployeeReducer from '../features/employee/employee-slice';
import createSalaryPlanReducer from '../features/create-salary-plan/create-salary-plan-slice';

export const store = configureStore({
  reducer: {
    employee: EmployeeReducer,
    createSalaryPlan: createSalaryPlanReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
