import ServiceInterface from "../serviceInterface";

import Employees from "../../assets/placeholders/employees.json";
import OnBoard from "../../assets/placeholders/onBoard.json";
import History from "../../assets/placeholders/history.json";

const STORAGE_KEYS = {
  employee: "employee",
  onBoard: "onBoard",
  history: "history",
};

export default class LocalStorageInterface extends ServiceInterface {
  constructor() {
    super();
    this.loadData();
  }
  loadData() {
    if (!localStorage.getItem(STORAGE_KEYS.employee)) {
      localStorage.setItem(STORAGE_KEYS.employee, JSON.stringify(Employees));
    }

    if (!localStorage.getItem(STORAGE_KEYS.onBoard)) {
      localStorage.setItem(STORAGE_KEYS.onBoard, JSON.stringify(OnBoard));
    }

    if (!localStorage.getItem(STORAGE_KEYS.history)) {
      localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(History));
    }
  }
  async getEmployees() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.employee));
  }
  async getOnBoard() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.onBoard));
  }
  async getHistory() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.history));
  }
  async putOnBoard(employeeData) {
    // Get data
    let onBoard = await this.getOnBoard();

    // Get timestamp
    let timestamp = new Date().getTime();

    // Save data
    if (!onBoard.find((item) => item.id === employeeData.id)) {
      await localStorage.setItem(
        STORAGE_KEYS.onBoard,
        JSON.stringify([...onBoard, { ...employeeData, timestamp }])
      );
    }

    return this.getOnBoard();
  }
  async deleteOnBoard(employeeData) {
    // Get data
    let onBoard = JSON.parse(localStorage.getItem(STORAGE_KEYS.onBoard));
    // Check if employee is checkIn
    let employeeOffBoard = onBoard.find(
      (item) => item.id === employeeData.id
    );
    // Update onBoard
    if (employeeOffBoard) {
      // Updated list
      let updateBoard = onBoard.filter((item) => item.id !== employeeData.id);
      localStorage.setItem(STORAGE_KEYS.onBoard, JSON.stringify(updateBoard))
      this.putHistory(employeeData, employeeOffBoard);
    }

    onBoard = await this.getOnBoard();
    let history = await this.getHistory();

    return [onBoard, history];
  }
  async putHistory(employeeData, employeeOffBoard) {
    // Get timestamp
    let timestamp = this.getTimestamp();

    // Get data
    let history = await this.getHistory();

    // Update history
    let historyUpdated = [
      ...history,
      { in: employeeOffBoard, out: { ...employeeData, timestamp } },
    ];
    
    localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(historyUpdated));
  }
}
