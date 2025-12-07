import { create } from "zustand";
import { api } from "../api/api";

export const useItemStore = create((set) => ({
    items: [],
    getItem: async () => {
        try {
            const res = await api.getItem()
            set({items: res})
        } catch (error) {
            console.error(error)
        }
    },
    myBids: [],
    fetchMyBids: async () => {
        try {
        const myBids = await api.getBids()
        set({ myBids:myBids.data })
        } catch (error) {
        set({ error: error.message })
        }
    },
    bids: [],
    fetchBids: async (itemId) => {
        try {
            const res = await api.getBidsDetails(itemId)
            set({ bids: res.data })
            return res.data
        } catch (error) {
            console.error(error)
            return []
        }
    },
    createBid: async (itemId, amount) => {
        try {
            const res = await api.createBid(itemId, amount)
            await api.getItem().then(items => set({items: items}))
            await api.getBidsDetails(itemId).then(res => set({ bids: res.data }))
            return res
        } catch (error) {
            throw error
        }
    },
    
}))