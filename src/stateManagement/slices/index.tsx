import {combineReducers} from '@reduxjs/toolkit'
import {
  reducerPath as apiSlicePath,
  reducer as apiSliceReducer,
} from '../apiSlices/apiSlice'

const reducer = combineReducers({
  [apiSlicePath]: apiSliceReducer,
})

// Destroy redux state
const rootReducer = (state: any, action: any) => {
  return reducer(state, action)
}

// Exports
export default rootReducer
