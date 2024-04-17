export interface ApiResponse {
  [key: string]: string | number | SupplyPoint[] | null

  count: number
  next: string | null
  previous: string | null
  results: SupplyPoint[]
}

export interface SupplyPoint {
  [key: string]: string | number | SupplyPointEnergy | null | boolean

  id: number
  full_address: string | null
  punto_luz: SupplyPointEnergy | null
  punto_gas: SupplyPointEnergy | null
  state: number | null
  created_at: string | null
  direction: string | null
  locality: string | null
  postalcode: string | null
  is_default: boolean
  card: number
  created_by: number | null
}
export interface SupplyPointEnergy {
  [key: string]: string | number | null | string[]

  id: number
  files: string[]
  fecha_firma: string | null
  fecha_cambio: string | null
  cups: string
  status_text: string | null
  status: number | null
  company: string
  tarif: string
  p1: number
  p2: number
  p3: number
  p4: number
  p5: number
  p6: number
  consumo: number | null
}

export const supplyPointHeaders = [
  {
    text: 'CUPS',
    value: 'cups',
  },
  {
    text: 'Comerc',
    value: 'company',
  },
  {
    text: 'Consumo',
    value: 'consumo',
  },
  {
    text: 'Tarifa',
    value: 'tarif',
  },
  ...Array.from({ length: 6 }, (_, i) => ({
    text: `P${i + 1}`,
    value: `p${i + 1}`,
  })),
  {
    text: 'Estado',
    value: 'status',
  },
]
