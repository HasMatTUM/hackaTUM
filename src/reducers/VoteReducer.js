import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { postVoteRequest } from "../services/vote.service";

const VoteReducer = createSlice({
  name: "VoteReducer",

  initialState: {
    voteResultLink: null,
  },

  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postVote.fulfilled, (state, action) => {
        let fetchedResult = action.payload;
        state.voteResultLink = fetchedResult;
      })
      .addCase(postVote.rejected, (_, error) => {
        console.log(error.payload);
      });
  },
});

export const postVote = createAsyncThunk(
  "votes/voteYes",
  async (values, { rejectWithValue }) => {
    try {
      const response = postVoteRequest(values["option"]);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const VoteActions = VoteReducer.actions;

export default VoteReducer.reducer;
