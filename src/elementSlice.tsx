import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define the Element type
interface Element {
    id: number;
    name: string;
    role: string;
    userId: string;
    isAuthenticated: boolean;
    profilePicture?: string; // Add profilePicture property
}

// Correctly type the initial state as an array of Element
const initialState: Element = {
    id:0,
    name:"",
    role:"",
    userId:"",
    isAuthenticated: false,
    profilePicture: ""
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
            state.isAuthenticated = true
        },
        removeElement: (state) => {
            state.id = 0;
            state.name = "";
            state.role = "";
            state.userId = "";
            state.isAuthenticated = false;
        },
        updateUsername: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        updateProfilePicture: (state, action: PayloadAction<string>) => {
            state.profilePicture = action.payload;  // Update profile picture
        }
    },
});

// Export actions and reducer
export const {addElement, removeElement, updateUsername, updateProfilePicture} = elementsSlice.actions;
export default elementsSlice.reducer;
