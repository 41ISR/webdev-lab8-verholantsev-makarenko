import axios from "axios"
import { useUserStore } from "../store/useUserStore"

const apiInstance = axios.create({
    //baseURL:"https://kitek.ktkv.dev/feedback/api/",
    baseURL:"https://solid-dollop-pjpvw4jgvxv93r4x6-3001.app.github.dev/api/",
    headers:{
        "content-Type": "application/json"
    }
})

apiInstance.interceptors.request.use((config) => {
    const {session} = useUserStore.getState()
    if (session?.token){
        config.headers.Authorization = `Bearer ${session.token}`
    }
    return config

})

const getItem = async () => {
    const data = await apiInstance.get("/items")
    return data.data
}

const sendItem = async (item) => {
    const res = await apiInstance.post("/items", item)
    return res
}

const registerUser = async (user) =>{
    const res = await apiInstance.post("/auth/register", user)
    return res
}

const loginUser = async (user) =>{
    const res = await apiInstance.post("/auth/login", user)
    return res
}

const deleteMessage = async (id) =>{
    const res = await apiInstance.delete(`/messages/${id}`)
    return res
}

const likeMessage = async (id) =>{
    const res = await apiInstance.post(`/messages/${id}/like`)
    return res
}

const reportMesage = async (id) => {
    const res = await apiInstance.post(`/messages/${id}/report`)
    return res
}


export const api ={
    getItem,
    registerUser,
    loginUser,
    sendItem,
    deleteMessage,
    likeMessage,
    reportMesage
}