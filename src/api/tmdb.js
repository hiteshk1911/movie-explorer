import axios from "axios";

const API_KEY = "883bde9be13a9d69bbeb7a5063df2575"; // Replace with your key
const BASE_URL = "https://api.themoviedb.org/3";

export const tmdb = axios.create({
  baseURL: BASE_URL,
  params: { api_key: API_KEY },
});
