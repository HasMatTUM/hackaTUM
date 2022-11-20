import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSurveyRequest } from "../services/survey.service";

const SurveyReducer = createSlice({
  name: "SurveyReducer",

  initialState: {
    currentSurvey: null,
  },

  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getSurvey.fulfilled, (state, action) => {
        let fetchedSurvey = action.payload;
        state.currentSurvey = fetchedSurvey;
      })
      .addCase(getSurvey.rejected, (_, error) => {
        console.log(error.payload);
      });
  },
});

export const getSurvey = createAsyncThunk(
  "surveys/getSurvey",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getSurveyRequest();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const SurveyActions = SurveyReducer.actions;

export default SurveyReducer.reducer;
