export interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: SupplyPoint[];
}

export interface SupplyPoint {
    punto_luz?: SupplyPointEnergy;
    punto_gas?: SupplyPointEnergy;
    id: number;
    full_address: string;
    state: string;
    create_at: string;
    direction: string;
    locality: string;
    postalcode: string;
    card: string;
    create_by: string;
}
export interface SupplyPointEnergy {
    id: number;
    files: string;
    cups: string;
    company: string;
    tarif: string;
    consumo: number;
    p1: number;
    p2: number;
    p3: number;
    p4: number;
    p5: number;
    p6: number;
    fecha_cambio: string;
    fecha_firma: string;
    status_text: string;
    status: string;
    firma: string;
}


export const supplyPointHeaders = [
    {
        text: "CUPS",
        value: "cups",
    },
    {
        text: "Comerc",
        value: "company",
    },
    {
        text: "Consumo",
        value: "consumo",
    },
    {
        text: "Tarifa",
        value: "tarif",
    },
    ...Array.from({ length: 6 }, (_, i) => ({
        text: `P${i + 1}`,
        value: `p${i + 1}`,
    })),
    {
        text: "Estado",
        value: "status",
    }
]