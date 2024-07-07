import useStore from "../store/store";

import { formatTimestamp } from "../utils/dateUtils";

export default function OnBoardComponent() {
  const { onBoard, employees } = useStore();

  const getNameEmployee = (employeeId) => {
    let employeData = employees.find((item) => item.id == employeeId);
    // Get checkIn
    let checkIn = onBoard.find((item) => item.id == employeeId);
    let checkInDate = formatTimestamp(checkIn.timestamp);

    return [employeData.name, checkInDate];
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
            {onBoard.map((employee) => (
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
