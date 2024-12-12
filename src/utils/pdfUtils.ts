import { DriverData } from '../components/DataTable';

declare const pdfjsLib: any;

// Country code mappings
const countries: { [key: string]: string } = {
  'B': 'BE',    // Belgija 
  'F': 'FR',    // Prancūzija
  'D': 'DE',    // Vokietija
  'NL': 'NL',   // Nyderlandai
  'L': 'LU',    // Liuksemburgas
  'E': 'ES',    // Ispanija
  'I': 'IT',    // Italija
  'A': 'AT',    // Austrija
  'CH': 'CH',   // Šveicarija
  'P': 'PT',    // Portugalija
  'PL': 'PL',   // Lenkija
  'FR': 'FR',   // Prancūzija (alternatyvus kodas)
  'LV': 'LV',   // Latvija
  'LT': 'LT',   // Lietuva
  'EE': 'EE'    // Estija
};

const parseTimeString = (dateStr: string): Date => {
  const [datePart, timePart] = dateStr.split(' ');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hour, minute, second] = timePart.split(':').map(Number);
  return new Date(year, month - 1, day, hour, minute, second);
};

const calculateRestPeriod = (startTime: string, endTime: string): number => {
  const start = parseTimeString(startTime);
  const end = parseTimeString(endTime);
  const diffHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
  return Math.round(diffHours * 100) / 100;
};

const formatDateTime = (dateStr: string): string => {
  const date = parseTimeString(dateStr);
  return date.toLocaleString('lt-LT');
};

const processDriverData = (fullText: string): DriverData[] => {
  const driverMatches: { name: string; index: number }[] = [];
  const driverRegex = /(?:\d+\/\d+)?.*?Vairuotojas\s*:\s*([^\n]+?)(?=\s*Periodas\s*:|$)/g;
  let dm;

  while ((dm = driverRegex.exec(fullText)) !== null) {
    const driverName = dm[1].trim()
      .replace(/\s+/g, ' ')
      .replace(/\b([A-Z']+)\s+\1\b/g, '$1');

    driverMatches.push({
      name: driverName,
      index: dm.index
    });
  }

  if (driverMatches.length === 0) {
    return [];
  }

  const result: DriverData[] = [];

  for (let i = 0; i < driverMatches.length; i++) {
    const current = driverMatches[i];
    const nextIndex = (i < driverMatches.length - 1) ? driverMatches[i + 1].index : fullText.length;
    const sectionText = fullText.substring(current.index, nextIndex);

    const dateLines = sectionText.match(/\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}\s+[A-Z]{1,2}(?:\s*-\s*[A-Z_]+)?\s+\d+/g) || [];

    for (let j = 0; j < dateLines.length - 1; j++) {
      const currentLine = dateLines[j];
      const nextLine = dateLines[j + 1];

      const currentMatch = currentLine.match(/(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2})\s+([A-Z]{1,2}(?:\s*-\s*[A-Z_]+)?)/);
      const nextMatch = nextLine.match(/(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2})\s+([A-Z]{1,2}(?:\s*-\s*[A-Z_]+)?)/);

      if (!currentMatch || !nextMatch) continue;

      const [_, currentDateTime, currentCountryFull] = currentMatch;
      const [__, nextDateTime, nextCountryFull] = nextMatch;

      const currentCountry = currentCountryFull.split('-')[0].trim();
      const nextCountry = nextCountryFull.split('-')[0].trim();

      const hours = calculateRestPeriod(currentDateTime, nextDateTime);

      if (hours >= 24 && hours < 200) {
        const countryCode = countries[nextCountry] || nextCountry;
        
        result.push({
          name: current.name,
          startTime: formatDateTime(currentDateTime),
          endTime: formatDateTime(nextDateTime),
          country: countryCode,
          hours: hours
        });
      }
    }
  }

  return result;
};

export const processPdfData = async (file: File): Promise<DriverData[]> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(' ');
      fullText += pageText + '\n';
    }

    return processDriverData(fullText);
  } catch (error) {
    console.error('Klaida apdorojant PDF:', error);
    throw new Error('Nepavyko apdoroti PDF failo');
  }
};