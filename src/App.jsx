import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import service from "./services/Service";
import { formatTimestamp } from "./utils/dateUtils";

import Navbar from "./components/Navbar";
import SignUpForm from "./components/SignUpForm";

export default function App() {
  // 🗽 States
  const [employees, setEmployees] = useState([]);
  const [onBoard, setOnBoard] = useState([]);
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

    const fetchOnBoard = async () => {
      try {
        let onBoard = await service.getOnBoard();
        setOnBoard(onBoard);
      } catch (error) {
        console.error("Error fetching onboard:", error);
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
    fetchOnBoard();
    fetchHistory();
  }, []);

  // ⚙️ Consts
  const formId = "signUpEmployeeForm";
  const dataOptions = ["id", "employeeAction"];

  // 🧩 Functions
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Get data from form
    let data = getFormData(formId);
    // Validate data
    let isValid = validateData(data, dataOptions);
    // Handle Errors (null = NoErrors)
    if (isValid !== null) {
      renderErrors(isValid);
      return null;
    }
    // Get timestamp
    let timestamp = new Date().getTime();

    // Handle checkIn/checkOut
    if (data.employeeAction === "in" || data.employeeAction === "out") {
      switch (data.employeeAction) {
        case "in":
          let updatedPutOnBoard = await service.putOnBoard(data);
          setOnBoard(updatedPutOnBoard);
          break;
        case "out":
          let [board, history] = await service.deleteOnBoard(data);
          setOnBoard(board);
          setHistory(history);
          break;
      }
      resetForm();
    }
  };

  // 📚 Libs
  const renderErrors = (errors) => {
    for (const index in errors) {
      let field = document.querySelector(`[name="${errors[index]}"]`);
      field.classList.add("is-invalid");
    }
  };

  const resetForm = () => {
    let employeeSelect = document.getElementById("employeSelect");
    let radioBtns = document.getElementsByName("employeeAction");

    employeeSelect.value = "";
    radioBtns[0].checked = false;
    radioBtns[1].checked = false;
  };

  const validateData = (data, options) => {
    let errors = [];
    for (const index in options) {
      let key = options[index];
      if (!data[key]) errors.push(key);
    }
    return errors.length > 0 ? errors : null;
  };

  const getFormData = (id) => {
    // Get data from form
    let data = Object.fromEntries(
      new FormData(document.getElementById(id)).entries()
    );

    return data;
  };

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
        {/*}
        <OnBoardComponent listOnBoard={onBoard} listEmployee={employees} />
        <HistoryComponent listEmployee={employees} listHistory={history} />
      {*/}
      </main>
    </>
  );
}

const OnBoardComponent = ({ listOnBoard, listEmployee }) => {
  const getNameEmployee = (employeeId) => {
    let employeData = listEmployee.find((item) => item.id == employeeId);
    return employeData.name;
  };
  return (
    <>
      <h1>On board</h1>
      <div className="p-3">
        <ul className="list-group w-25">
          {listOnBoard.map((employee) => (
            <li key={employee.id} className="list-group-item">
              {getNameEmployee(employee.id)}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const HistoryComponent = ({ listHistory, listEmployee }) => {
  const getHistoriData = (employeeId, index) => {
    // Get name
    let employeData = listEmployee.find((item) => item.id == employeeId);
    // Get checkIns/CheckOuts
    let checkIn = listHistory[index].in.timestamp;
    let checkOut = listHistory[index].out.timestamp;

    let checkInDate = formatTimestamp(checkIn);
    let checkOutDate = formatTimestamp(checkOut);

    return [employeData.name, checkInDate, checkOutDate];
  };

  return (
    <>
      <h1>History</h1>
      <div className="p-3">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">CheckIn</th>
              <th scope="col">CheckOut</th>
            </tr>
          </thead>
          <tbody>
            {listHistory.map((employee, index) => (
              <tr key={`${employee.in.id}-history-${index}`}>
                <th scope="row">{getHistoriData(employee.in.id, index)[0]}</th>
                <td>{getHistoriData(employee.in.id, index)[1]}</td>
                <td>{getHistoriData(employee.in.id, index)[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
