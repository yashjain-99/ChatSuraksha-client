import axios from "axios";
import { config } from "../constants";

const BASE_URL = `${config.url}/api`;

export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
