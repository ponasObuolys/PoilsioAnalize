import * as XLSX from 'xlsx';
import { DriverData } from '../components/DataTable';

export const exportToExcel = (data: DriverData[], weekNumber: number) => {
  const formattedData = data.map(row => ({
    'Vairuotojo vardas': row.name,
    'Poilsio pradžia': row.startTime,
    'Poilsio pabaiga': row.endTime,
    'Šalis': row.country,
    'Valandos': row.hours
  }));

  const ws = XLSX.utils.json_to_sheet(formattedData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, `${weekNumber} savaitė`);
  XLSX.writeFile(wb, `vairuotoju_poilsis_${weekNumber}sav.xlsx`);
};