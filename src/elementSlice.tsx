import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the Element type
interface Element {
    id: number;
    name: string;
    role: string;
    userId: string;
    // Add other properties if needed
}

// Correctly type the initial state as an array of Element
const initialState: Element = {
    id:0,
    name:"",
    role:"",
    userId:"",
};

const elementsSlice = createSlice({
    name: 'element',
    initialState,
    reducers: {
        // Adds a new element to the state array
        addElement: (state, action: PayloadAction<Element>) => {
                state.name = action.payload.name;
                state.role = action.payload.role;
                state.userId = action.payload.userId;
        },
    },
});

// Export actions and reducer
export const { addElement } = elementsSlice.actions;
export default elementsSlice.reducer;
