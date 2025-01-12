import { lockTools } from './data/lockToolsData';
import { ToolCompatibilityResult } from './types/lockToolTypes';
import {
  parseToolYearRange,
  extractToolName,
  isYearInRange,
  findMatchingMake
} from './helpers/toolCompatibilityHelpers';

export const checkToolCompatibility = (make: string, year: string): ToolCompatibilityResult => {
  const vehicleYear = parseInt(year);
  if (isNaN(vehicleYear)) {
    return { isCompatible: false, compatibleTools: [] };
  }

  const matchingMake = findMatchingMake(make, Object.keys(lockTools));
  if (!matchingMake) {
    return { isCompatible: false, compatibleTools: [] };
  }

  const tools = lockTools[matchingMake];
  const compatibleTools = tools.filter(tool => {
    const yearRange = parseToolYearRange(tool);
    if (!yearRange) return true;
    
    return isYearInRange(vehicleYear, yearRange.startYear, yearRange.endYear);
  });

  const formattedTools = compatibleTools.map(extractToolName);

  return {
    isCompatible: compatibleTools.length > 0,
    compatibleTools: formattedTools
  };
};

// Re-export the data for backwards compatibility
export { lockTools } from './data/lockToolsData';
export type { LockToolData } from './types/lockToolTypes';