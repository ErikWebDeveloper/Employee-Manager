import { useState, useEffect } from "react";
import service from "../services/Service";

import SignUpForm from "../components/SignUpForm";

export default function SignUpPage() {
  // 🗽 States
  const [employees, setEmployees] = useState([]);

  // ⚙️ Consts
  const formId = "signUpEmployeeForm";
  const dataOptions = ["id", "employeeAction"];

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

    fetchEmployee();
  }, []);

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

    // Handle checkIn/checkOut
    if (data.employeeAction === "in" || data.employeeAction === "out") {
      switch (data.employeeAction) {
        case "in":
          await service.putOnBoard(data);
          break;
        case "out":
          await service.deleteOnBoard(data);
          break;
      }
      resetForm();
    }
  };

  // 📚 Libs
  const getFormData = (id) => {
    // Get data from form
    let data = Object.fromEntries(
      new FormData(document.getElementById(id)).entries()
    );
    return data;
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

  const renderErrors = (errors) => {
    for (const index in errors) {
      let field = document.querySelector(`[name="${errors[index]}"]`);
      field.classList.add("is-invalid");
    }
  };

  // 🎥 Render
  return (
    <SignUpForm
      handleSubmit={handleSubmit}
      dataOptions={dataOptions}
      employees={employees}
    />
  );
}
