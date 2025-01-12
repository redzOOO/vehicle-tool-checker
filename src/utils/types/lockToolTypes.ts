export interface LockToolData {
  [make: string]: string[];
}

export interface ToolCompatibilityResult {
  isCompatible: boolean;
  compatibleTools: string[];
}