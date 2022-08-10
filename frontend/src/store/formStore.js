import { createSlice } from '@reduxjs/toolkit'

export const formSlice = createSlice({
    name:'formId',
    initialState: {value:''},
    reducers: {
        setFormId: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setFormId } = formSlice.actions

export default formSlice.reducer