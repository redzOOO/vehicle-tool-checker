export interface LockToolData {
  [make: string]: string[];
}

export interface ToolCompatibilityResult {
  isCompatible: boolean;
  compatibleTools: string[];
  canRecode: boolean;
}

export interface VehicleServiceability {
  canService: boolean;
  canRecode: boolean;
}