export function formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); 
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; 
    return `${day}/${month}/${year} ${formattedHours}:${minutes} ${period}`;
}
  
//   const timestamp = 1582729505000; 
//   console.log(formatTimestamp(timestamp));
  