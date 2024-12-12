import React from 'react';

export interface DriverData {
  name: string;
  startTime: string;
  endTime: string;
  country: string;
  hours: number;
}

interface DataTableProps {
  data: DriverData[];
}

export const DataTable = ({ data }: DataTableProps) => {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Vairuotojo vardas
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Poilsio pradžia
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Poilsio pabaiga
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Šalis
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Valandos
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-200">
          {data.map((row, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{row.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{row.startTime}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{row.endTime}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{row.country}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{row.hours}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};