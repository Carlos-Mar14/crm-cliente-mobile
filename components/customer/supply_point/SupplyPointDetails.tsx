import { DataTable, Text, Icon } from 'react-native-paper'
import { SupplyPoint, supplyPointHeaders } from './types'
import { View } from 'react-native'

export const SupplyPointDetails = ({ point }: { point: SupplyPoint }) => {
  return (
    <DataTable>
      {point.full_address && (
        <DataTable.Row>
          <DataTable.Cell>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon source="google-maps" size={15} color="#FF0000" />
              <Text style={{ marginLeft: 5 }}>{point.full_address}</Text>
            </View>
          </DataTable.Cell>
        </DataTable.Row>
      )}

      <DataTable.Header>
        {supplyPointHeaders.map((header) => (
          <DataTable.Title key={header.value}>{header.text}</DataTable.Title>
        ))}
      </DataTable.Header>

      {point.punto_luz && (
        <DataTable.Row>
          {supplyPointHeaders.map((header) => (
            <DataTable.Cell key={header.value}>
              {header.value === 'cups' && (
                <Icon source="lightning-bolt" size={20} color="#FFD700" />
              )}
              {point.punto_luz?.[header.value]}
            </DataTable.Cell>
          ))}
        </DataTable.Row>
      )}

      {point.punto_gas && (
        <DataTable.Row>
          {supplyPointHeaders.map((header) => (
            <DataTable.Cell key={header.value}>
              {header.value === 'cups' && <Icon source="fire" size={20} color="#FF0000" />}
              {point.punto_gas?.[header.value]}
            </DataTable.Cell>
          ))}
        </DataTable.Row>
      )}
    </DataTable>
  )
}
