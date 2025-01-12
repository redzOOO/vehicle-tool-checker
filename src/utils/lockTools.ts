export interface LockToolData {
  [make: string]: string[];
}

export const lockTools: LockToolData = {
  "Toyota Camry": ["TOY43AT"],
  "Toyota Reiz": ["TOY43AT"],
  "Toyota Corolla": ["TOY43AT"],
  "Toyota Crown": ["TOY43AT (1980–2000)", "TOY48 (2000–present)"],
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
  "Ford F150": ["FO38 (1980–2005)"],
  "Ford Raptor": ["FO38 (1980–2005)"],
  "Ford Lincoln": ["FO38 (1980–2005)"],
  "Ford Mustang": ["FO38 (1980–2005)"],
  "Ford Mocly": ["FO38 (1980–2005)"],
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
  "Toyota SUV": ["TOY2 (1995–present)"],
  "Lexus": ["TOY2 (1995–2015)", "TOY48 (2015–present)"],
  "Peugeot": ["VA2T (1995–present)"],
  "Citroen": ["VA2T (1995–present)"],
  "Korean K2": ["K5 (2010–present)"],
  "Korean K3": ["K5 (2010–present)"],
  "Korean K5": ["K5 (2010–present)"],
  "Toyota 2018": ["Toy2018 (2018–present)"],
  "New VW 2016": ["HU162T-9 (2016–present)"],
  "New Skoda": ["HU162T-9 (2016–present)"],
  "New Audi 2016": ["HU162-10 (2016–present)"],
  "New BMW 2016": ["HU162-10 (2016–present)"]
};

export const checkToolCompatibility = (make: string, year: string): { isCompatible: boolean; compatibleTools: string[] } => {
  // Convert year to number for comparison
  const vehicleYear = parseInt(year);
  
  // Find exact match or partial match for make
  const matchingMake = Object.keys(lockTools).find(key => 
    key.toLowerCase() === make.toLowerCase() || 
    make.toLowerCase().includes(key.toLowerCase()) ||
    key.toLowerCase().includes(make.toLowerCase())
  );

  if (!matchingMake) {
    return { isCompatible: false, compatibleTools: [] };
  }

  const tools = lockTools[matchingMake];
  const compatibleTools = tools.filter(tool => {
    const yearRange = tool.match(/\((\d{4})–(present|\d{4})\)/);
    if (!yearRange) return true; // If no year range specified, consider compatible
    
    const startYear = parseInt(yearRange[1]);
    const endYear = yearRange[2] === 'present' ? new Date().getFullYear() : parseInt(yearRange[2]);
    
    return vehicleYear >= startYear && vehicleYear <= endYear;
  });

  return {
    isCompatible: compatibleTools.length > 0,
    compatibleTools
  };
};