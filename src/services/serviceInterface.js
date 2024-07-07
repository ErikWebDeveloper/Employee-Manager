export default class ServiceInterface {
  async getEmployees() {
    throw new Error("Method not implemented!");
  }
  async getOnBoard() {
    throw new Error("Method not implemented!");
  }
  async getHistory() {
    throw new Error("Method not implemented!");
  }
  async putOnBoard() {
    throw new Error("Method not implemented!");
  }
  async deleteOnBoard() {
    throw new Error("Method not implemented!");
  }
  async putHistory() {
    throw new Error("Method not implemented!");
  }
  getTimestamp() {
    return new Date().getTime();
  }
}
