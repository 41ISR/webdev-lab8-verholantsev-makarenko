import { create } from "zustand";
import { api } from "../api/api";

export const useItemStore = create((set) => ({
    items: [],
    myBids: [],
    getItem: async () => {
        try {
            const res = await api.getItem()
            set({items: res})
        } catch (error) {
            console.error(error)
        }
    },
    fetchMyBids: async () => {
        try {
        const myBids = await api.getMyBids()
        set({ myBids })
        } catch (error) {
        set({ error: error.message })
        }
    },
    
}))