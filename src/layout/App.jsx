import React, { useState, useEffect } from "react";
import Employees from "./assets/placeholders/employees.json";

import { formatTimestamp } from "./utils/dateUtils";

export default function App() {
  // 🗽 States
  const [employees, setEmployees] = useState(Employees);
  const [onBoard, setOnBoard] = useState([]);
  const [history, setHistory] = useState([]);

  // ⚙️ Consts
  const formId = "signUpEmployeeForm";
  const dataOptions = ["id", "employeeAction"];

  // 🌐 Data Fetchs
  useEffect(() => {
    
  }, []);

  // 🧩 Functions
  const handleSubmit = (event) => {
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
          if (!onBoard.find((item) => item.id === data.id)) {
            setOnBoard([...onBoard, { ...data, timestamp }]);
            resetForm();
          }
          break;
        case "out":
          let employeeOffBoard = onBoard.find((item) => item.id === data.id);
          if (employeeOffBoard) {
            let updateBoard = onBoard.filter((item) => item.id !== data.id);
            setOnBoard(updateBoard);
            setHistory([
              ...history,
              { in: employeeOffBoard, out: { ...data, timestamp } },
            ]);
            resetForm();
          }
          break;
      }
    }
    //return console.log({ ...data, timestamp });
  };

  // 📚 Libs
  const renderErrors = (errors) => {
    for (const index in errors) {
      let field = document.querySelector(`[name="${errors[index]}"]`);
      field.classList.add("is-invalid");
    }
  };

  const restartErrors = (fields) => {
    for (const index in fields) {
      let field = document.querySelector(`[name="${fields[index]}"]`);
      field.classList.remove("is-invalid");
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

  const serializeData = () => {};

  return (
    <main className="p-3">
      <h1>Sign Up Employe</h1>
      <form
        onSubmit={handleSubmit}
        onChange={() => restartErrors(dataOptions)}
        id="signUpEmployeeForm"
        className="p-3 row g-3 m-auto"
      >
        <div className="col-md-6">
          <div className="form-floating">
            <select
              className="form-select"
              id="employeSelect"
              aria-label="Floating label select example"
              name="id"
            >
              <option value={""}>Select one...</option>
              {employees.map((employee) => (
                <option key={`${employee.id}-key`} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
            <label htmlFor="employeSelect">Select employee</label>
            <div className="invalid-feedback">Please choose a employee.</div>
          </div>
        </div>

        <div className="col-md-1">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="employeeAction"
              id="employeStartRadio"
              value="in"
            />
            <label className="form-check-label" htmlFor="employeStartRadio">
              Check In
            </label>
            <div className="invalid-feedback">Please choose an action.</div>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="employeeAction"
              id="employeEndRadio"
              value="out"
            />
            <label className="form-check-label" htmlFor="employeEndRadio">
              Check Out
            </label>
          </div>
        </div>

        <div className="col-md-12">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>

      <OnBoardComponent listOnBoard={onBoard} listEmployee={employees} />
      <HistoryComponent listEmployee={employees} listHistory={history} />
    </main>
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
