import ServiceInterface from "../serviceInterface";

import EmployeesData from "../../assets/placeholders/employees.json";
import OnBoard from "../../assets/placeholders/onBoard.json";
import History from "../../assets/placeholders/history.json";

export default class MemoryInterface extends ServiceInterface {
  constructor() {
    super();
    this.employeesData = EmployeesData;
    this.onBoard = OnBoard;
    this.history = History;
  }
  async getEmployees() {
    return this.employeesData;
  }
  async getOnBoard() {
    return this.onBoard;
  }
  async getHistory() {
    return this.history;
  }
  async putOnBoard(employeeData) {
    // Get data
    let onBoard = await this.getOnBoard();

    // Get timestamp
    let timestamp = this.getTimestamp();

    // Save data
    if (!onBoard.find((item) => item.id === employeeData.id)) {
      this.onBoard = [...this.onBoard, { ...employeeData, timestamp }];
    }

    return this.getOnBoard();
  }

  async deleteOnBoard(employeeData) {
    // Check if employee is checkIn
    let employeeOffBoard = this.onBoard.find(
      (item) => item.id === employeeData.id
    );
    // Update onBoard
    if (employeeOffBoard) {
      this.onBoard = this.onBoard.filter((item) => item.id !== employeeData.id);
      this.putHistory(employeeData, employeeOffBoard);
    }
    return [this.onBoard, this.history];
  }

  async putHistory(employeeData, employeeOffBoard) {
    let timestamp = this.getTimestamp();
    this.history = [
      ...this.history,
      { in: employeeOffBoard, out: { ...employeeData, timestamp } },
    ];
  }
}
