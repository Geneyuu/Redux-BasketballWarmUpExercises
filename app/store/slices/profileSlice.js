import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	name: "Gene",
};

const profileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
		updateName: (state, action) => {
			state.name = action.payload;
		},
	},
});

export const { updateName } = profileSlice.actions;
export default profileSlice.reducer;
