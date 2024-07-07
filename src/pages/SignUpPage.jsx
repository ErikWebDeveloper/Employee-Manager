import SignUpForm from "../components/SignUpForm";

import useStore from "../store/store";

export default function SignUpPage() {
  // 🗽 States
  const { employees, putOnBoard, deleteOnBoard } = useStore();

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

    // Handle checkIn/checkOut
    if (data.employeeAction === "in" || data.employeeAction === "out") {
      switch (data.employeeAction) {
        case "in":
          await putOnBoard(data);
          break;
        case "out":
          await deleteOnBoard(data);
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
