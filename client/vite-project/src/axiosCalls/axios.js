import axios from "axios";
//address , coockies comunication and json data transfer protocol  is important  
// Base address and axios instance
const api = axios.create({
  baseURL: "http://localhost:2430",
  withCredentials: true, // Enables cookie sending & receiving
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;