export interface LockToolData {
  [make: string]: string[];
}

export interface ToolCompatibilityResult {
  isCompatible: boolean;
  compatibleTools: string[];
}

export const lockTools: LockToolData = {
  "Toyota": ["TOY43AT (1980–present)"],
  "Toyota Camry": ["TOY43AT (1980–present)"],
  "Toyota Reiz": ["TOY43AT (1980–present)"],
  "Toyota Corolla": ["TOY43AT (1980–present)"],
  "Toyota Crown": ["TOY43AT (1980–2000)", "TOY48 (2000–present)"],
  "Toyota SUV": ["TOY2 (1995–present)"],
  "Lexus": ["TOY2 (1995–2015)", "TOY48 (2015–present)"],
  "Suzuki": ["HU87 (1990–present)"],
  "Hyundai": ["HYN11 (1995–2010)", "HYN7R (2010–present)", "HY15 (2000–present)", "HY16 (2005–present)", "HY22 (2015–present)"],
  "Kia": ["HYN11 (1995–2010)", "HYN7R (2010–present)", "HY15 (2000–present)", "HY16 (2005–present)", "HY22 (2015–present)"],
  "Mitsubishi": ["MIT8 (1990–2005)", "MIT11 (2005–present)"],
  "Chrysler": ["MIT11 (2005–present)", "CY24 (1980–2005)", "HU64 (2000–present)"],
  "Dodge": ["MIT11 (2005–present)", "CY24 (1980–2005)"],
  "Nissan": ["NSN14 (1995–present)"],
  "Infinity": ["NSN14 (1995–present)"],
  "Subaru": ["NSN14 (1995–2010)", "TOY48 (2010–present)"],
  "Mazda": ["MAZ24 (1990–2015)", "MAD2014 (2015–present)"],
  "Ford": ["FO38 (1980–2005)", "HU101 (2005–present)"],
  "Ford F150": ["FO38 (1980–2005)", "HU101 (2005–present)"],
  "Ford Raptor": ["FO38 (1980–2005)", "HU101 (2005–present)"],
  "Ford Lincoln": ["FO38 (1980–2005)", "HU101 (2005–present)"],
  "Ford Mustang": ["FO38 (1980–2005)", "HU101 (2005–present)"],
  "Ford Mocly": ["FO38 (1980–2005)", "HU101 (2005–present)"],
  "Buick": ["DWO4R (1985–2005)", "HU100 (2005–present)"],
  "Chevrolet": ["DWO4R (1985–2005)"],
  "Wuling Series": ["Dashuang Zuo (1990–present)", "Dashuang You (1990–present)"],
  "Mercedes Benz": ["HU64 (1995–present)"],
  "Chrysler 2": ["HU64 (2000–present)"],
  "Maybach Laurence": ["HU64 (2005–present)"],
  "Carlson": ["HU64 (2005–present)"],
  "Bugatti": ["HU66 (2000–present)"],
  "Lamborghini": ["HU66 (2000–present)"],
  "Porsche": ["HU66 (2000–present)"],
  "Bentley": ["HU66 (2000–present)"],
  "Volkswagen": ["HU66 (1995–2015)", "HU162T-9 (2016–present)"],
  "Audi": ["HU66 (1995–2015)", "HU162-10 (2016–present)"],
  "Skoda": ["HU66 (1995–2015)", "HU162T-9 (2016–present)"],
  "Seat": ["HU66 (1995–present)"],
  "Peugeot 307": ["HU83 (1995–2008)"],
  "Peugeot 508": ["HU83 (2008–2015)"],
  "BMW": ["HU92 (1995–2015)", "HU100R (2016–present)", "HU162-10 (2016–present)"],
  "Land Rover": ["HU92 (1995–2015)", "HU101 (2016–present)"],
  "Mini": ["HU92 (2001–2015)"],
  "GM": ["HU92 (1995–2015)"],
  "Rolls Royce": ["HU92 (1995–2015)", "HU100R (2016–present)"],
  "Cadillac": ["HU100 (2000–present)"],
  "Opel": ["HU100 (2000–present)"],
  "Vectra Yate": ["HU100 (2000–present)"],
  "New GL8": ["HU100 (2005–present)"],
  "New Regal": ["HU100 (2005–present)"],
  "Cruz": ["HU100 (2005–present)"],
  "Jaguar": ["HU101 (2005–present)"],
  "Volvo": ["HU101 (2005–present)"],
  "New Mondeo": ["HU101 (2005–present)"],
  "Max": ["HU101 (2005–present)"],
  "Saab": ["HU101 (2005–present)"],
  "Honda": ["HON66 (1990–present)", "TOY48 (2010–present)"],
  "Acura": ["HON66 (1990–present)"],
  "BYD": ["HON66 (2005–present)", "TOY2 (2010–present)"],
  "Great Wall": ["HON66 (2005–present)"],
  "Korean K2": ["K5 (2010–present)"],
  "Korean K3": ["K5 (2010–present)"],
  "Korean K5": ["K5 (2010–present)"],
  "Toyota 2018": ["Toy2018 (2018–present)"],
  "New VW 2016": ["HU162T-9 (2016–present)"],
  "New Skoda": ["HU162T-9 (2016–present)"],
  "New Audi 2016": ["HU162-10 (2016–present)"],
  "New BMW 2016": ["HU162-10 (2016–present)"]
};

const parseToolYearRange = (tool: string) => {
  const yearRange = tool.match(/\((\d{4})–(present|\d{4})\)/);
  if (!yearRange) return null;

  return {
    startYear: parseInt(yearRange[1]),
    endYear: yearRange[2] === 'present' ? new Date().getFullYear() : parseInt(yearRange[2])
  };
};

const extractToolName = (tool: string): string => {
  return tool.split(' (')[0];
};

const isYearInRange = (vehicleYear: number, startYear: number, endYear: number): boolean => {
  return vehicleYear >= startYear && vehicleYear <= endYear;
};

const findMatchingMake = (make: string, makes: string[]): string | undefined => {
  const exactMatch = makes.find(key => key.toLowerCase() === make.toLowerCase());
  if (exactMatch) return exactMatch;

  const makeWords = make.toLowerCase().split(' ');
  return makes.find(key => {
    const keyWords = key.toLowerCase().split(' ');
    return makeWords.some(word => keyWords.includes(word)) ||
           keyWords.some(word => makeWords.includes(word));
  });
};

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
