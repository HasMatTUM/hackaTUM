import { VOTE_ENDPOINT_API } from "../constants";
import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_API_URL;

const instance = axios.create({
  withCredentials: false,
  baseURL: baseURL,
});

export const postVoteRequest = async (option) => {
  const response = await instance.post(VOTE_ENDPOINT_API, option);
  console.log(response);
  return response.data;
};
