import axios from "axios"
import { useUserStore } from "../store/useUserStore"

const apiInstance = axios.create({
    baseURL:"https://kitek.ktkv.dev/marketplace/api/",
    //baseURL:"https://solid-dollop-pjpvw4jgvxv93r4x6-3001.app.github.dev/api/",
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

const deleteItem = async (id) =>{
    const res = await apiInstance.delete(`/items/${id}`)
    return res
}

 const getStats = async () => {
    const res = await apiInstance.get("/stats")
    return res
 }

  const getBids = async () => {
    const res = await apiInstance.get("/bids/my")
    return res
 }

 const getBidsDetails = async (id) => {
    const res = await apiInstance.get(`/items/${id}/bids`)    
    return res
 }

 const createBid = async (id, amount) => {
    const res = await apiInstance.post(`/items/${id}/bids`, { amount })
    return res
 }


export const api ={
    getItem,
    registerUser,
    loginUser,
    sendItem,
    getStats,
    getBids,
    getBidsDetails,
    createBid,
    deleteItem
}