import {config} from "./config";

export const apiUrl = process.env.REACT_APP_API_URL ?? config.API_URL;
export const bggApiUrl = process.env.REACT_APP_BGG_API_URL ?? config.BGG_API_URL;
