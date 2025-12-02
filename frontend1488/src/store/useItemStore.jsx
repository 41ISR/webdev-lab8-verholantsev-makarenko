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
    
}))