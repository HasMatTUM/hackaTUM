import { SURVEY_ENDPOINT_API } from "../constants";
import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_API_URL;

const instance = axios.create({
  withCredentials: false,
  baseURL: baseURL,
});

export const getSurveyRequest = async () => {
  const response = await instance.get(SURVEY_ENDPOINT_API);
  console.log(response);
  return response.data;
};
