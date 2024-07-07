export default function OnBoardComponent({ listOnBoard, listEmployee }) {
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
}
