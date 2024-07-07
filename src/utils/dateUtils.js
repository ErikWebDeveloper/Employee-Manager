export function formatTimestamp(timestamp) {
  const date = new Date(timestamp);

  // Obtener horas y minutos
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Obtener día, mes y año
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Los meses comienzan en 0
  const year = date.getFullYear();

  // Formatear la fecha como hh:mm dd/mm/yyyy
  return `${hours}:${minutes} ${day}/${month}/${year}`;
}

