//api.js connects your frontend to the backend.
import axios from "axios"; //Axios is a JavaScript library used to send HTTP requests.

const API = axios.create({
    baseURL: "http://127.0.0.1:8000" //baseURL defines the common starting URL for all API request
});

export default API;