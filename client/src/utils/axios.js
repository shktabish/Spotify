import axios from "axios"

const api = axios.create({
    withCredentials: true,
    baseURL: "https://spotify-server-gamma.vercel.app/api/v1"
})

export default api
