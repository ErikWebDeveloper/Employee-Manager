import { create } from "zustand";
import service from "../services/Service.js";

const useStore = create((set) => ({
  employees: [],
  history: [],
  onBoard: [],
  getEmployees: async () => {
    let employees = await service.getEmployees();
    set({ employees });
  },
  getOnBoard: async () => {
    let onBoard = await service.getOnBoard();
    set({ onBoard });
  },
  putOnBoard: async (data) => {
    let onBoard = await service.putOnBoard(data);
    set({ onBoard });
  },
  deleteOnBoard: async (data) => {
    let [onBoard, history] = await service.deleteOnBoard(data);
    console.log(onBoard);
    set({ onBoard });
    set({ history });
  },
  getHistory: async () => {
    let history = await service.getHistory();
    set({ history });
  },
}));

// Initialize data
useStore.getState().getEmployees();
useStore.getState().getOnBoard();
useStore.getState().getHistory();

export default useStore;
