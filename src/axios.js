import axios from 'axios'

const instance = axios.create({
    baseURL : 'http://localhost:3000/api'
})

axios.interceptors.request.use((config)=>{
    let token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config 
})

export default instance