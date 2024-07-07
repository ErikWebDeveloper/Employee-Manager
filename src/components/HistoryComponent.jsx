import { formatTimestamp } from "../utils/dateUtils";

export default function HistoryComponent({ listHistory, listEmployee }) {
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
}
