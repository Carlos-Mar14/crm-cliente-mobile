import { DataTable } from "react-native-paper";
import { SupplyPoint, supplyPointHeaders } from "./types";

export const SupplyPointDetails = ({ point }: { point: SupplyPoint }) => {
    return (
        <DataTable>
            <DataTable.Header>
                {supplyPointHeaders.map((header) => (
                    <DataTable.Title key={header.value}>{header.text}</DataTable.Title>
                ))}
            </DataTable.Header>

            {point.punto_luz && (
                <DataTable.Row>
                    {supplyPointHeaders.map((header) => (
                        <DataTable.Cell key={header.value}>
                            {point.punto_luz[header.value]}
                        </DataTable.Cell>
                    ))}
                </DataTable.Row>
            )}

            {point.punto_gas && (
                <DataTable.Row>
                    {supplyPointHeaders.map((header) => (
                        <DataTable.Cell key={header.value}>
                            {point.punto_gas[header.value]}
                        </DataTable.Cell>
                    ))}
                </DataTable.Row>
            )}
        </DataTable>
    );
};
