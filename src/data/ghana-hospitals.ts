export interface Hospital {
  id: string
  name: string
  location: string
  region: string
  type: 'Teaching Hospital' | 'Regional Hospital' | 'District Hospital' | 'Polyclinic' | 'Health Centre' | 'Private Hospital' | 'Mission Hospital'
  established?: number
}

export const ghanaHospitals: Hospital[] = [
  // Teaching Hospitals
  {
    id: 'korle-bu',
    name: 'Korle-Bu Teaching Hospital',
    location: 'Accra',
    region: 'Greater Accra',
    type: 'Teaching Hospital',
    established: 1923
  },
  {
    id: 'komfo-anokye',
    name: 'Komfo Anokye Teaching Hospital',
    location: 'Kumasi',
    region: 'Ashanti',
    type: 'Teaching Hospital',
    established: 1954
  },
  {
    id: 'tamale-teaching',
    name: 'Tamale Teaching Hospital',
    location: 'Tamale',
    region: 'Northern',
    type: 'Teaching Hospital',
    established: 1974
  },
  {
    id: 'cape-coast-teaching',
    name: 'University of Cape Coast Hospital',
    location: 'Cape Coast',
    region: 'Central',
    type: 'Teaching Hospital',
    established: 2013
  },

  // Major Regional/Specialist Hospitals in Greater Accra
  {
    id: '37-military',
    name: '37 Military Hospital',
    location: 'Accra',
    region: 'Greater Accra',
    type: 'Teaching Hospital',
    established: 1941
  },
  {
    id: 'ridge-hospital',
    name: 'Ridge Hospital',
    location: 'Accra',
    region: 'Greater Accra',
    type: 'Regional Hospital',
    established: 1928
  },
  {
    id: 'police-hospital',
    name: 'Police Hospital',
    location: 'Accra',
    region: 'Greater Accra',
    type: 'Regional Hospital'
  },
  {
    id: 'lekma-hospital',
    name: 'Lekma Hospital',
    location: 'Accra',
    region: 'Greater Accra',
    type: 'District Hospital'
  },
  {
    id: 'ga-east',
    name: 'Ga East Municipal Hospital',
    location: 'Abokobi',
    region: 'Greater Accra',
    type: 'District Hospital'
  },
  {
    id: 'tema-general',
    name: 'Tema General Hospital',
    location: 'Tema',
    region: 'Greater Accra',
    type: 'Regional Hospital'
  },
  {
    id: 'madina-polyclinic',
    name: 'Madina Polyclinic',
    location: 'Madina',
    region: 'Greater Accra',
    type: 'Polyclinic'
  },

  // Ashanti Region
  {
    id: 'kumasi-south',
    name: 'Kumasi South Hospital',
    location: 'Kumasi',
    region: 'Ashanti',
    type: 'District Hospital'
  },
  {
    id: 'okomfo-anokye-polyclinic',
    name: 'Okomfo Anokye Polyclinic',
    location: 'Kumasi',
    region: 'Ashanti',
    type: 'Polyclinic'
  },
  {
    id: 'suntreso-hospital',
    name: 'Suntreso Government Hospital',
    location: 'Kumasi',
    region: 'Ashanti',
    type: 'District Hospital'
  },
  {
    id: 'manhyia-hospital',
    name: 'Manhyia District Hospital',
    location: 'Kumasi',
    region: 'Ashanti',
    type: 'District Hospital'
  },
  {
    id: 'st-patricks',
    name: 'St. Patrick\'s Hospital',
    location: 'Offinso',
    region: 'Ashanti',
    type: 'Mission Hospital'
  },

  // Northern Region
  {
    id: 'tamale-west',
    name: 'Tamale West Hospital',
    location: 'Tamale',
    region: 'Northern',
    type: 'District Hospital'
  },
  {
    id: 'yendi-hospital',
    name: 'Yendi Hospital',
    location: 'Yendi',
    region: 'Northern',
    type: 'District Hospital'
  },

  // Western Region
  {
    id: 'effia-nkwanta',
    name: 'Effia Nkwanta Regional Hospital',
    location: 'Sekondi-Takoradi',
    region: 'Western',
    type: 'Regional Hospital'
  },
  {
    id: 'tarkwa-hospital',
    name: 'Tarkwa Municipal Hospital',
    location: 'Tarkwa',
    region: 'Western',
    type: 'District Hospital'
  },

  // Eastern Region
  {
    id: 'eastern-regional',
    name: 'Eastern Regional Hospital',
    location: 'Koforidua',
    region: 'Eastern',
    type: 'Regional Hospital'
  },
  {
    id: 'st-josephs-koforidua',
    name: 'St. Joseph\'s Hospital',
    location: 'Koforidua',
    region: 'Eastern',
    type: 'Mission Hospital'
  },

  // Central Region
  {
    id: 'central-regional',
    name: 'Central Regional Hospital',
    location: 'Cape Coast',
    region: 'Central',
    type: 'Regional Hospital'
  },
  {
    id: 'winneba-hospital',
    name: 'Winneba Trauma and Specialist Hospital',
    location: 'Winneba',
    region: 'Central',
    type: 'District Hospital'
  },

  // Volta Region
  {
    id: 'volta-regional',
    name: 'Volta Regional Hospital',
    location: 'Ho',
    region: 'Volta',
    type: 'Regional Hospital'
  },
  {
    id: 'keta-hospital',
    name: 'Keta Municipal Hospital',
    location: 'Keta',
    region: 'Volta',
    type: 'District Hospital'
  },

  // Upper East Region
  {
    id: 'bolgatanga-regional',
    name: 'Bolgatanga Regional Hospital',
    location: 'Bolgatanga',
    region: 'Upper East',
    type: 'Regional Hospital'
  },

  // Upper West Region
  {
    id: 'wa-regional',
    name: 'Wa Regional Hospital',
    location: 'Wa',
    region: 'Upper West',
    type: 'Regional Hospital'
  },

  // Brong Ahafo Region
  {
    id: 'brong-ahafo-regional',
    name: 'Brong Ahafo Regional Hospital',
    location: 'Sunyani',
    region: 'Bono',
    type: 'Regional Hospital'
  },
  {
    id: 'techiman-hospital',
    name: 'Techiman Municipal Hospital',
    location: 'Techiman',
    region: 'Bono East',
    type: 'District Hospital'
  },

  // Notable Private Hospitals
  {
    id: 'nyaho-medical',
    name: 'Nyaho Medical Centre',
    location: 'Accra',
    region: 'Greater Accra',
    type: 'Private Hospital'
  },
  {
    id: 'trust-hospital',
    name: 'Trust Hospital',
    location: 'Accra',
    region: 'Greater Accra',
    type: 'Private Hospital'
  },
  {
    id: 'golden-gate',
    name: 'Golden Gate Private Hospital',
    location: 'Kumasi',
    region: 'Ashanti',
    type: 'Private Hospital'
  },
  {
    id: 'cocoa-clinic',
    name: 'Cocoa Clinic',
    location: 'Kumasi',
    region: 'Ashanti',
    type: 'Private Hospital'
  },

  // Mission/Catholic Hospitals
  {
    id: 'holy-family-techiman',
    name: 'Holy Family Hospital',
    location: 'Techiman',
    region: 'Bono East',
    type: 'Mission Hospital'
  },
  {
    id: 'st-theresa-nkoranza',
    name: 'St. Theresa\'s Hospital',
    location: 'Nkoranza',
    region: 'Bono East',
    type: 'Mission Hospital'
  },
  {
    id: 'st-john-of-god',
    name: 'St. John of God Hospital',
    location: 'Duayaw Nkwanta',
    region: 'Bono',
    type: 'Mission Hospital'
  },

  // Additional District Hospitals
  {
    id: 'kibi-hospital',
    name: 'Kibi Government Hospital',
    location: 'Kibi',
    region: 'Eastern',
    type: 'District Hospital'
  },
  {
    id: 'oda-hospital',
    name: 'Oda Government Hospital',
    location: 'Oda',
    region: 'Eastern',
    type: 'District Hospital'
  },
  {
    id: 'kasoa-polyclinic',
    name: 'Kasoa Polyclinic',
    location: 'Kasoa',
    region: 'Central',
    type: 'Polyclinic'
  },
  {
    id: 'nsawam-hospital',
    name: 'Nsawam Government Hospital',
    location: 'Nsawam',
    region: 'Eastern',
    type: 'District Hospital'
  }
]

// Helper functions
export const getHospitalsByRegion = (region: string): Hospital[] => {
  return ghanaHospitals.filter(hospital => hospital.region === region)
}

export const getHospitalsByType = (type: Hospital['type']): Hospital[] => {
  return ghanaHospitals.filter(hospital => hospital.type === type)
}

export const searchHospitals = (query: string): Hospital[] => {
  const lowercaseQuery = query.toLowerCase()
  return ghanaHospitals.filter(hospital => 
    hospital.name.toLowerCase().includes(lowercaseQuery) ||
    hospital.location.toLowerCase().includes(lowercaseQuery) ||
    hospital.region.toLowerCase().includes(lowercaseQuery)
  )
}

export const getRegions = (): string[] => {
  return [...new Set(ghanaHospitals.map(hospital => hospital.region))].sort()
}

export const getHospitalTypes = (): Hospital['type'][] => {
  return [...new Set(ghanaHospitals.map(hospital => hospital.type))]
}