import { useState, useEffect } from "react";
import service from "../services/Service";

import OnBoardComponent from "../components/OnBoard";

export default function OnBoardPage(){
  // 🗽 States
  const [onBoard, setOnBoard] = useState([]);
  const [employees, setEmployees] = useState([]);

  //🌐 Get initial data
  useEffect(() => {
    const fetchOnBoard = async () => {
      try {
        let onBoard = await service.getOnBoard();
        setOnBoard(onBoard);
      } catch (error) {
        console.error("Error fetching onboard:", error);
      }
    };

    const fetchEmployee = async () => {
      try {
        let employees = await service.getEmployees();
        setEmployees(employees);
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };

    fetchEmployee();
    fetchOnBoard();
  }, []);

  return <OnBoardComponent listOnBoard={onBoard} listEmployee={employees} />;
}