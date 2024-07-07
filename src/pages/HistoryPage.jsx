import { useState, useEffect } from "react";
import service from "../services/Service";

import HistoryComponent from "../components/HistoryComponent";

export default function HistoryPage() {
  // 🗽 States
  const [employees, setEmployees] = useState([]);
  const [history, setHistory] = useState([]);

  //🌐 Get initial data
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        let employees = await service.getEmployees();
        setEmployees(employees);
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };

    const fetchHistory = async () => {
      try {
        let history = await service.getHistory();
        setHistory(history);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchEmployee();
    fetchHistory();
  }, []);

  return <HistoryComponent listEmployee={employees} listHistory={history} />;
}
