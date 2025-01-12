export const parseToolYearRange = (tool: string) => {
  const yearRange = tool.match(/\((\d{4})–(present|\d{4})\)/);
  if (!yearRange) return null;

  return {
    startYear: parseInt(yearRange[1]),
    endYear: yearRange[2] === 'present' ? new Date().getFullYear() : parseInt(yearRange[2])
  };
};

export const extractToolName = (tool: string): string => {
  return tool.split(' (')[0];
};

export const isYearInRange = (vehicleYear: number, startYear: number, endYear: number): boolean => {
  return vehicleYear >= startYear && vehicleYear <= endYear;
};

export const findMatchingMake = (make: string, makes: string[]): string | undefined => {
  // First try exact match
  const exactMatch = makes.find(key => key.toLowerCase() === make.toLowerCase());
  if (exactMatch) return exactMatch;

  // Then try generic match (e.g., "Toyota" for "Toyota Corolla")
  return makes.find(key => {
    const makeWords = make.toLowerCase().split(' ');
    const keyWords = key.toLowerCase().split(' ');
    return makeWords.some(word => keyWords.includes(word));
  });
};