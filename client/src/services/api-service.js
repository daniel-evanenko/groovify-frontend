import axios from "axios";
import { LOCALHOST_PATH, PRODUCTION } from "../utils/constants";

const isProd = process.env.NODE_ENV === PRODUCTION;
const BASE_URL = isProd ? '' : LOCALHOST_PATH;

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: isProd
})

export default axiosInstance;
