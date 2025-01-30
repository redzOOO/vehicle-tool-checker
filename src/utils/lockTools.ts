import { lockTools } from './data/lockToolsData';
import { ToolCompatibilityResult, VehicleServiceability } from './types/lockToolTypes';
import {
  parseToolYearRange,
  extractToolName,
  isYearInRange,
  findMatchingMake,
  canVehicleBeRecoded
} from './helpers/toolCompatibilityHelpers';

export const checkToolCompatibility = (make: string, year: string): VehicleServiceability => {
  const vehicleYear = parseInt(year);
  if (isNaN(vehicleYear)) {
    return { canService: false, canRecode: false };
  }

  const matchingMake = findMatchingMake(make, Object.keys(lockTools));
  if (!matchingMake) {
    return { canService: false, canRecode: false };
  }

  const tools = lockTools[matchingMake];
  const compatibleTools = tools.filter(tool => {
    const yearRange = parseToolYearRange(tool);
    if (!yearRange) return true;
    return isYearInRange(vehicleYear, yearRange.startYear, yearRange.endYear);
  });

  return {
    canService: compatibleTools.length > 0,
    canRecode: canVehicleBeRecoded(year)
  };
};

export { lockTools } from './data/lockToolsData';
export type { LockToolData } from './types/lockToolTypes';