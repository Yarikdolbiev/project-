import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMenuData = createAsyncThunk("menu/fetchMenuData", async () => {
  try {
    const response = await fetch("https://react-fast-pizza-api.onrender.com/api/menu");
    if (!response.ok) {
      throw new Error("Ошибка");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
});

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menuData: [],
    error: null,
    status: "idle", 
  },
  reducers: {
    fetchSuccess: (state, action) => {
      state.menuData = action.payload;
      state.error = null;
      state.status = "succeeded";
    },
    fetchError: (state, action) => {
      state.menuData = [];
      state.error = action.payload;
      state.status = "failed";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMenuData.fulfilled, (state, action) => {
        state.menuData = action.payload;
        state.error = null;
        state.status = "succeeded";
      })
      .addCase(fetchMenuData.rejected, (state, action) => {
        state.menuData = [];
        state.error = action.error.message;
        state.status = "failed";
      });
  },
});

export const { fetchSuccess, fetchError } = menuSlice.actions;
export default menuSlice.reducer;