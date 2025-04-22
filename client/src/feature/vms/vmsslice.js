import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    vms: [],
};

const vmsSlice = createSlice({
    name: 'vms',
    initialState,
    reducers: {
        addVm: (state, action) => {
            const newVm = {
                id: nanoid(),
                ...action.payload
            };
            state.vms.push(newVm);
        },
        removeVm: (state, action) => {
            state.vms = state.vms.filter(vm => vm.id !== action.payload);
        },
        updateVm: (state, action) => {
            const { id, data } = action.payload;
            const index = state.vms.findIndex(vm => vm.id === id);
            if (index !== -1) {
                state.vms[index] = { ...state.vms[index], ...data };
            }
        }
    }
});

export const { addVm, removeVm, updateVm } = vmsSlice.actions;
export default vmsSlice.reducer;
