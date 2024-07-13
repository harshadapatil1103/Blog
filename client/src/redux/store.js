import { configureStore } from '@reduxjs/toolkit';
import  useReducer  from './user/user.Slice.js';

export const store = configureStore({
  reducer: {
    user:useReducer,

 
  },
})

