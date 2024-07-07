import useStore from "../store/store";
import { formatTimestamp } from "../utils/dateUtils";

export default function HistoryComponent() {
  const { history, employees } = useStore();
  const getHistoriData = (employeeId, index) => {
    // Get name
    let employeData = employees.find((item) => item.id == employeeId);
    // Get checkIns/CheckOuts
    let checkIn = history[index].in.timestamp;
    let checkOut = history[index].out.timestamp;

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
            {history.map((employee, index) => (
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
