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
    value: 'status_text',
  },
]

export const supplyPointStatusMap = {
  0: {
    text: 'Firmado',
    value: 0,
    color: 'green',
  },
  1: {
    text: 'Fidelizable',
    value: 1,
    color: 'green',
  },
  2: {
    text: 'Proceso aceptacion',
    value: 2,
    color: 'blue',
  },
  3: {
    text: 'Pendiente factura',
    value: 3,
    color: 'blue',
  },
  4: {
    text: 'Estudio realizado',
    value: 4,
    color: 'blue',
  },
  5: {
    text: 'Estudio enviado',
    value: 5,
    color: 'blue',
  },
  6: {
    text: 'Factura recibida',
    value: 6,
    color: 'blue',
  },
  7: {
    text: 'No interesa',
    value: 7,
    color: 'red',
  },
  8: {
    text: 'Futuras ofertas',
    value: 8,
    color: 'blue',
  },
  9: {
    text: 'No lo tiene',
    value: 9,
    color: 'red',
  },
  10: {
    text: 'No firmado',
    value: 10,
    color: 'red',
  },
  11: {
    text: 'Sin estado',
    value: null,
    color: 'grey',
  },
}
