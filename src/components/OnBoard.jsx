import { formatTimestamp } from "../utils/dateUtils";

export default function OnBoardComponent({ listOnBoard, listEmployee }) {
  const getNameEmployee = (employeeId) => {
    let employeData = listEmployee.find((item) => item.id == employeeId);
    // Get checkIn
    let checkIn = listOnBoard.find((item) => item.id == employeeId);
    let checkInDate = formatTimestamp(checkIn.timestamp);

    return [employeData.name, checkInDate];
    //return employeData.name;
  };
  return (
    <>
      <h1>On board</h1>
      <div className="p-3">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">On board at</th>
            </tr>
          </thead>
          <tbody>
            {listOnBoard.map((employee) => (
              <tr key={employee.id}>
                <th scope="row">{getNameEmployee(employee.id)[0]}</th>
                <td>{getNameEmployee(employee.id)[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
