import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileSpreadsheet, RefreshCw } from 'lucide-react';
import { DataTable, DriverData } from './DataTable';
import { exportToExcel } from '../utils/excelUtils';
import { processPdfData } from '../utils/pdfUtils';

export const MainContent = () => {
  const [data, setData] = useState<DriverData[]>([]);
  const [weekNumber, setWeekNumber] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const processedData = await processPdfData(file);
      setData(processedData);
    } catch (error) {
      console.error('Klaida apdorojant failą:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    if (data.length === 0) {
      alert('Nėra duomenų eksportavimui');
      return;
    }
    exportToExcel(data, weekNumber);
  };

  return (
    <div className="container mx-auto px-4 pb-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm bg-opacity-90"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">PDF Failas</label>
            <div className="relative">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="block w-full text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all duration-200"
              />
            </div>
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-700">Savaitės numeris</label>
            <input
              type="number"
              min={1}
              max={52}
              value={weekNumber}
              onChange={(e) => setWeekNumber(Number(e.target.value))}
              className="block w-full rounded-lg border-slate-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
              placeholder="Įveskite savaitės numerį"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={handleExport}
            className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
          >
            <FileSpreadsheet className="mr-2 h-5 w-5" />
            Eksportuoti į Excel
          </button>
          <button className="inline-flex items-center px-6 py-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors duration-200">
            <RefreshCw className="mr-2 h-5 w-5" />
            Atnaujinti Excel duomenis
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-slate-600">Apdorojami duomenys...</p>
          </div>
        ) : (
          <DataTable data={data} />
        )}
      </motion.div>
    </div>
  );
};