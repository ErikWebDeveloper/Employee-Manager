export default function SignUpForm({ handleSubmit, dataOptions, employees }) {
  const restartErrors = (fields) => {
    for (const index in fields) {
      let field = document.querySelector(`[name="${fields[index]}"]`);
      field.classList.remove("is-invalid");
    }
  };

  return (
    <>
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
    </>
  );
};
