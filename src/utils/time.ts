export const formatISO: (iso:string) => {date: string, time: string}  = (iso: string) => {
  // iso example -> 0001-03-04T04:05

  const date = iso.split("T")[0].split('-');
  const year = date[0];
  const month = date[1];
  const day = date[2]; 

  const time = iso.split("T")[1];
  
  return {
    date: `${day}/${month}/${year}`, 
    time
  }
}

export const getFinalTimeOfCurrentlyISO = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Meses começam em 0
  const day = String(today.getDate()).padStart(2, '0');
  
  // 3. Monta a string com o horário desejado
  const iso = `${year}-${month}-${day}T23:59`;
  return iso;
}

